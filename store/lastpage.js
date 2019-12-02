export const state = () => ({
  name: 'Home Page',
  link: '/'
});

export const mutations = {
  SET_NAME(state, payload) {
    state.name = payload;
    state.link = $nuxt.$route.path;
  },
};

export const getters = {
  getLastPage(state) {
    return state;
  },
};
