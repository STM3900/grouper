export const state = () => ({
  status: null,
  username: "",

  apiResponse: null,

  allUsers: [],
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
  getUsername: (state) => {
    return state.username;
  },
  getApiResponse: (state) => {
    return state.apiResponse;
  },
  getAllUsers: (state) => {
    return state.allUsers;
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
  SET_USERNAME(state, username) {
    state.username = username;
  },
  SET_API_RESPONSE(state, apiResponse) {
    state.apiResponse = apiResponse;
  },
  SET_ALL_USERS(state, allUsers) {
    state.allUsers = allUsers;
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

  // register an user and set variable accordingly
  register(context, username) {
    this.$axios
      .post(`http://localhost:5000/v1/grouper/register/${username}`)
      .then((response) => {
        context.commit("SET_IS_LOGGED", true);
        context.commit("SET_IS_ADMIN", false);
        context.commit("SET_USERNAME", username);
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
  quitMyGroup(context, username) {
    this.$axios
      .post(`http://localhost:5000/v1/grouper/group/quitmygroup/${username}`)
      .then((response) => {
        // TODO : inform user left group
        console.log("you have left the group");
        context.dispatch("getAllUsers");
        context.dispatch("getGroupListApi");
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // Login as admin only
  login(context) {
    this.$axios
      .post(`http://localhost:5000/v1/grouper/login/admin`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        console.log(response);

        context.commit("SET_IS_LOGGED", true);
        context.commit("SET_IS_ADMIN", true);
        this.$router.push("/admin");
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
      .post("http://localhost:5000/v1/grouper/group/create", {
        username: username,
      })
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
        `http://localhost:5000/v1/grouper/group/${payload.groupName}/${payload.peopleWhoInvit}/join`
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

  // get all users that are not in group
  getAllUsers(context) {
    this.$axios
      .get("http://localhost:5000/v1/grouper/users/getall")
      .then((response) => {
        context.commit("SET_ALL_USERS", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
