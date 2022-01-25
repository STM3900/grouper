export const state = () => ({
  status: null,

  apiResponse: null,

  user: "",
  allUsers: [],
  allUsersFront: [],
  myGroup: "",
  isLogged: false,
  isAdmin: false,
  groupList: [],
  adminConfig: {},
  inviteLink: "",
});

export const getters = {
  getStatus: (state) => {
    return state.status;
  },
  getUser: (state) => {
    return state.user;
  },
  getApiResponse: (state) => {
    return state.apiResponse;
  },
  getAllUsers: (state) => {
    return state.allUsers;
  },
  getAllUsersFront: (state) => {
    return state.allUsersFront;
  },
  getMyGroup: (state) => {
    return state.myGroup;
  },
  getIsLogged: (state) => {
    return state.isLogged;
  },
  getGroupList: (state) => {
    return state.groupList;
  },
  getAvailableGroups: (state) => {
    return state.groupList.filter((e) => e.usersInGroup.length > 1);
  },
  getCreatedGroups: (state) => {
    return state.groupList.filter((e) => e.nbUserCurrent > 0);
  },
  getAdminConfig: (state) => {
    return state.adminConfig;
  },
  getIfAdminConfig: (state) => {
    return !!state.adminConfig.nbUsers;
  },
  getIsAdmin: (state) => {
    return state.isAdmin;
  },
  getInviteLink: (state) => {
    return state.inviteLink;
  },
};

export const mutations = {
  SET_STATUS(state, status) {
    state.status = status;
  },
  SET_API_RESPONSE(state, apiResponse) {
    state.apiResponse = apiResponse;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  SET_ALL_USERS(state, allUsers) {
    state.allUsers = allUsers;
  },
  SET_ALL_USERS_FRONT(state, allUsersFront) {
    state.allUsersFront = allUsersFront;
  },
  ADD_USER_FRONT(state, user) {
    state.allUsersFront.push(user);
  },
  SET_MY_GROUP(state, myGroup) {
    state.myGroup = myGroup;
  },
  SET_IS_LOGGED(state, isLogged) {
    state.isLogged = isLogged;
  },
  SET_GROUP_LIST(state, groupList) {
    state.groupList = groupList;
  },
  SET_ADMIN_CONFIG(state, adminConfig) {
    state.adminConfig = adminConfig;
  },
  SET_IS_ADMIN(state, isAdmin) {
    state.isAdmin = isAdmin;
  },
  SET_INVITE_LINK(state, inviteLink) {
    state.inviteLink = inviteLink;
  },
};

export const actions = {
  changeStatus(context, status) {
    context.commit("SET_STATUS", status);
  },

  authUser(context, username) {
    context.commit("SET_INVITE_LINK", "");
    try {
      context.dispatch("register", username);
    } catch (e) {
      context.dispatch("login", username);
    }
  },

  /* api calls */

  // register an user and set variable accordingly
  register(context, username) {
    this.$axios
      .post(`http://localhost:5000/v1/grouper/register/${username}`)
      .then((response) => {
        console.log(response);
        context.commit("SET_IS_LOGGED", true);
        context.commit("SET_IS_ADMIN", false);
        context.commit("SET_USER", username);
        context.commit("ADD_USER_FRONT", username);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // get info of my group
  getMyGroup(context, username) {
    this.$axios
      .post("http://localhost:5000/v1/grouper/users/getmygroup", {
        username: username,
      })
      .then((response) => {
        context.commit("SET_MY_GROUP", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // quit the group
  quitMyGroup(context, payload) {
    this.$axios
      .post(
        `http://localhost:5000/v1/grouper/group/quitmygroup/${payload.name}`,
        {
          username: payload.username,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        console.log("you have left the group");
        context.dispatch("getAllUsers");
        context.dispatch("getGroupListApi");
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // Login
  login(context, username) {
    this.$axios
      .post(`http://localhost:5000/v1/grouper/login/${username}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        console.log(response);

        if (username == "admin") {
          context.commit("SET_IS_LOGGED", true);
          context.commit("SET_IS_ADMIN", true);
          context.commit("SET_USER", "admin");
          this.$router.push("/admin");
        } else {
          context.commit("SET_IS_LOGGED", true);
          context.commit("SET_IS_ADMIN", false);
          context.commit("SET_USER", username);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // Create admin config
  createConfig(context, payload) {
    this.$axios
      .post(
        "http://localhost:5000/v1/grouper/groups/admin",
        { nbUsers: +payload.nbUsers, nbGroups: +payload.nbGroups },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        console.log(response);

        context.commit("SET_ADMIN_CONFIG", {
          nbUsers: payload.nbUsers,
          nbGroups: payload.nbGroups,
        });
        context.dispatch("getGroupListApi");

        this.$router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // Create a group
  createGroup(context, username) {
    this.$axios
      .post(
        "http://localhost:5000/v1/grouper/group/create",
        {
          username: username,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        console.log(response);
        context.dispatch("getAllUsers");
        context.commit("SET_INVITE_LINK", response.data);
        context.dispatch("getGroupListApi");
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // Join group with a link
  joinGroupLink(context, payload) {
    this.$axios
      .post(
        `http://localhost:5000/v1${payload.url}`,
        {
          username: payload.username,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        console.log(response);
        context.dispatch("getAllUsers");
        context.dispatch("getGroupListApi");
      })
      .catch((error) => {
        console.log(error);
      });
  },

  //* Get requests

  // Return list of all groups
  getGroupListApi(context) {
    this.$axios
      .get("http://localhost:5000/v1/grouper/group/list", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        context.commit("SET_GROUP_LIST", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // Get admin config
  getAdminConfigApi(context) {
    this.$axios
      .get("http://localhost:5000/v1/grouper/admin/getconfig", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        context.commit("SET_ADMIN_CONFIG", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // Get current user
  getUserApi(context) {
    this.$axios
      .get("http://localhost:5000/v1/grouper/getUser", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        const name = response.data;
        if (name) {
          context.commit("SET_IS_LOGGED", true);
          context.commit("SET_USER", name);
          if (response.data == "admin") {
            context.commit("SET_IS_ADMIN", true);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // get all users that are not in group
  getAllUsers(context) {
    this.$axios
      .get("http://localhost:5000/v1/grouper/users/getall", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        context.commit("SET_ALL_USERS", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // logOut user and reset user state
  logOut(context) {
    this.$axios
      .get("http://localhost:5000/v1/grouper/logout", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        context.commit("SET_USER", "");
        context.commit("SET_IS_LOGGED", false);
        context.commit("SET_IS_ADMIN", false);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
