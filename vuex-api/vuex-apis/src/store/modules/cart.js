import * as shop from '@/api/shop'

const state = {
    // 购物车数据
    // { id : 商品ID , quantity: 购物车商品数量 }
    items: [],
    checkoutStatus:null
}

const getters = {
    cartProducts(state, getters, rootState) {
        return state.items.map(((product) => {
            const prod = rootState.products.all.find(item => item.id === product.id)
            return {
                id: prod.id,
                title: prod.title,
                price: prod.price,
                quantity: product.quantity
            }
        }))
    },
    totalPrice(state, getters) {
        return getters.cartProducts.reduce((total, prod) => {
            return total * 1 + prod.price * prod.quantity
        }, 0)
    }
}

const mutations = {
    pushProductToCart(state, payload) {
        state.items.push({
            id: payload.id,
            quantity: 1
        })
    },
    incrementItemQuantity(state, payload) {
        const cartItem = state.items.find(item => item.id === payload.id)
        cartItem.quantity++
    },
    setCheckoutStatus(state,payload){
        state.checkoutStatus = payload
    },
    setItems(state,payload){
        state.items = payload
    }
}

const actions = {
    checkout({state,commit},product){
        // console.log('checkout')

        //备份购物车数据
        const savedCartProducts = [...product]

        //清楚支付状态
        commit('setCheckoutStatus',null)

        //清楚购物车
        commit('setItems',[])
        //发起结账请求
        shop.buyProduct(product,
        ()=>{
            commit('setCheckoutStatus','successful')
        },
        ()=>{
            commit('setCheckoutStatus','failed')
            commit('setItems',savedCartProducts)
        }
        )
        //    成功，设置成功状态
        //    失败，设置失败状态，回滚购物车数据
    },
    addProductToCart({
        state,
        commit
    }, product) {
        // console.log(state)
        // commit({
        //     type:'',
        //     product
        // })
        if (product.inventory) {
            const cartItem = state.items.find(item => item.id === product.id)
            if (cartItem) {
                commit({
                    type: 'incrementItemQuantity',
                    id: product.id
                })
            } else {
                commit({
                    type: 'pushProductToCart',
                    id: product.id
                })
            }
            commit('products/decrementProductInventity', {
                id: product.id
            }, {
                root: true
            })
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
}