<template>
  <div id="app">
    <products></products>
    <hr>
    <cart></cart>
  </div>
</template>

<script>
import Products from './components/products'
import Cart from './components/cart'
export default {
  name: 'app',
  components: {
    Products,
    Cart
  }
}
</script>

<style>

</style>
