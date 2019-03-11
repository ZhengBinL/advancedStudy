import * as shop from '@/api/shop'

const state = {
    all:[]
}

const getters = {}

const mutations = {
    //mutation 修改state 
    setProducts(state,payload){
        state.all = payload.products
    },
    //减少库存数量
    decrementProductInventity(state,payload){
       const productItem =  state.all.find(item=>item.id===payload.id)
       productItem.inventory-- 
    }
}

const actions = {
    async getAllProducts({ commit }){
      const products =  await shop.getAllProducts()
    //   console.log(products)
    // 异步操作成功 提交数据到mutation
      commit({
          type:'setProducts',
          products
      })
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    getters,
    actions,
}