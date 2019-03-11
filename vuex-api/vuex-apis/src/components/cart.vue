<template>
  <div>
      <h1>Cart</h1>
      <p v-show="!cartProducts.length">Please add some products to cart</p>
      <ul>
        <li v-for="item in cartProducts" :key="item.id">
          <span>{{ item.title }}</span> - <span>${{item.price}}</span> x <span>{{item.quantity}}</span>
        </li>
      </ul>
      <p>Total: <span>{{totalPrice}}</span></p>
      <button :disabled="!cartProducts.length" @click="checkout(cartProducts)">Checkout</button>
      <p v-show="checkoutStatus">Checkout {{checkoutStatus}}</p>
  </div>
</template>

<script lang="ts">
import { mapState,mapGetters,mapActions } from 'vuex'
export default {
  computed:{
    ...mapState('cart',['checkoutStatus']),
    ...mapGetters('cart',['cartProducts','totalPrice'])
  },
  created(){

  },
  methods:{
    ...mapActions('cart',['checkout'])
  }

}
</script>

<style>

</style>

