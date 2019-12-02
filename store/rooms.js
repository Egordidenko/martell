export const state = () => ({
  roomsData: null,
});

export const mutations = {
  SET_DATA(state, payload) {
    state.roomsData = payload;
  },
};

export const getters = {
  getRoomsData(state) {
    return state.roomsData;
  },
};
