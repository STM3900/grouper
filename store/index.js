export const state = () => ({
  status: null,
});

export const getters = {
  getStatus: (state) => {
    return state.status;
  },
};

export const mutations = {
  setStatus(state, status) {
    state.status = status;
  },
};

export const actions = {
  changeStatus(context, status) {
    context.commit("setStatus", status);
  },
};
