import getData from '../api/get-data';

export default async function({store, redirect, $axios}) {
  if (!store.state.rooms.roomsData) {
    try {
      const response = await getData($axios);
      if (response) {
        store.commit('rooms/SET_DATA', response);
        const storageCollection = JSON.parse(window.localStorage.getItem('collection'));
        if(storageCollection) {
          storageCollection.forEach(prod => {
            if(prod) {
              store.commit('collection/ADD_PRODUCT_TO_COLLECTION', prod);
            }
          });
        }
      }
    } catch (e) {
      // on check error go to login page
      console.error(e);
    }
  }
}
