import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutation'
import getters from './getter'
import actions from './action'

import products from './modules/product'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        products,
        cart
    }
})