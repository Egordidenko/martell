import {rooms} from '../store/rooms'

export const state = () => ({
  selectedProducts: [],
  lastProduct: null
});

export const mutations = {
  ADD_PRODUCT_TO_COLLECTION(state, product) {
    state.selectedProducts.push(product);
  },
  DELETE_PRODUCT(state, index) {
    state.selectedProducts.splice(index, 1);
  },
  SET_LAST_PRODUCT(state, product) {
    state.lastProduct = product;
  }
};

export const actions = {
  addProductToCollection(store, product) {
    const hasProduct = store.state.selectedProducts.some(item => {
      return item === product;
    });
    if(!hasProduct) {
      store.commit('ADD_PRODUCT_TO_COLLECTION', product);

      const prosuctsJSON = JSON.stringify(store.state.selectedProducts);
      window.localStorage.setItem('collection', prosuctsJSON);
      store.commit('SET_LAST_PRODUCT', product);
    }
  },

  deleteProduct(store, index) {
    store.commit('DELETE_PRODUCT', index);
    const prosuctsJSON = JSON.stringify(store.state.selectedProducts);
    window.localStorage.setItem('collection', prosuctsJSON);
  },
};

export const getters = {
  getProducts(state, getters, rootState) {
    let products = [];
    let i = 0;
    state.selectedProducts.forEach(item => {
      let data = getProductById(item, rootState.rooms);
      if(data) {
        products[i] = {};
        products[i].id = item;
        products[i].data = data;
        i++;
      }
    });
    return products;
  },
  isProductSaved(state) {
    return props => state.selectedProducts.some(item => {
      return item === props;
    });
  },
  getLastProduct(state) {
    return state.lastProduct;
  }
};

export function getProductById(id, rooms) { //Getting product data
  if (typeof id === 'string') {
    const idSplit = id.split("/");
    return rooms['roomsData'][idSplit[0]]['products'][idSplit[1]];
  }
}
