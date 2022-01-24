export const state = () => ({
  status: null,
  username: "",
  apiResponse: null,
  allUsers: [],
  myGroup: "",
  isLogged: false,
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
    state.myGroup = isLogged;
  },
};

export const actions = {
  changeStatus(context, status) {
    context.commit("SET_STATUS", status);
  },

  register(context, username) {
    this.$axios
      .post(`http://localhost:5000/v1/grouper/register/${username}`)
      .then((response) => {
        context.commit("SET_API_RESPONSE", response);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getAllUsers(context) {
    this.$axios
      .get("http://localhost:5000/v1/grouper/users/getall")
      .then((response) => {
        // TODO do verification if save state is equal to api response
        context.commit("SET_ALL_USERS", response);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getMyGroup(context, username) {
    this.$axios
      .post("http://localhost:5000/v1/grouper/users/getmygroup", {
        username: username,
      })
      .then((response) => {
        context.commit("SET_MY_GROUP", response);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  quitMyGroup(context, username) {
    this.$axios
      .post(`http://localhost:5000/v1/grouper/group/quitmygroup/${username}`)
      .then((response) => {
        console.log("you have left the group");
      })
      .catch((error) => {
        console.log(error);
      });
  },

  login(context, username) {
    this.$axios
      .post(`http://localhost:5000/v1/grouper/login/${username}`)
      .then((response) => {
        // TODO : Gérer les erreurs
        console.log(response);

        context.commit("SET_IS_LOGGED", true);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  createConfig(context, payload) {
    this.$axios
      .post("http://localhost:5000/v1/grouper/groups/admin", {
        nbUsers: payload.nbUsers,
        nbGroups: payload.nbGroups,
      })
      .then((response) => {
        // TODO : Gérer les erreurs et la réponse
      })
      .catch((error) => {
        console.log(error);
      });
  },

  createGroup(context, username) {
    this.$axios
      .post("http://localhost:5000/v1/grouper/group/create", {
        username: username,
      })
      .then((response) => {
        // TODO : Gérer les erreurs et la réponse
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  joinGroupLink(context, payload) {
    this.$axios
      .post(
        `http://localhost:5000/v1/grouper/group/${payload.groupName}/${payload.peopleWhoInvit}/join`
      )
      .then((response) => {
        // TODO : Gérer les erreurs et la réponse
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
