export const state = () => ({
  productsState: [],
  basketState: []
})

export const mutations = {
  SET_PRODUCTS_TO_STATE(state, products) {
    state.productsState = products
  },
  ADD_PRODUCT_TO_BASKET_STATE(state, product) {
    const productInCart = state.basketState.find(item => item.article === product.article)

    if (!productInCart) {
      state.basketState.push(product)
      localStorage.setItem("localBasket", JSON.stringify(state.basketState))
    }
  },
  SET_BASKET_STATE_FROM_LOCALSTORAGE(state, products) {
    state.basketState = products
  },
  DELETE_PRODUCT_FROM_BASKET_STATE(state, product) {
    const productInCart = state.basketState.find(item => item.article === product.article)

    if (productInCart) {
      state.basketState = state.basketState.filter(item => item.article !== productInCart.article)
      localStorage.setItem("localBasket", JSON.stringify(state.basketState))
    }
  },
  CLEAR_BASKET_STATE(state) {
    state.basketState = []
    localStorage.clear()
  }
}

export const actions = {
  nuxtServerInit({commit}, context) {}
}

export const getters = {
  basketGet: ({basketState}) => basketState,
  basketLengthGet: ({basketState}) => basketState.length,
  basketTotalPriceGet: ({basketState}) => basketState.reduce((prev, current) => prev + current.price, 0)
}
