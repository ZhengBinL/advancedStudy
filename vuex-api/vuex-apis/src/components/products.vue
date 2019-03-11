<template>
  <div>
      <h1>Products</h1>
      <ul>
        <li v-for="item in products" v-bind:key="item.id">
          <span>{{ item.title }}</span> - <span>${{item.price}}</span>
          <br>
          <button @click="addProductToCart(item)">Add to Cart</button>
        </li>
      </ul>
  </div>
</template>

<script >
import { mapState, mapActions } from 'vuex'
export default {
  computed:{
    ...mapState('products',{
      products:'all'
    })
  },
  methods:{
    ...mapActions('cart',['addProductToCart'])
  },
  created(){
    this.$store.dispatch('products/getAllProducts')
  }
}
</script>

<style>

</style>

