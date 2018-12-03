<template>
  <div class="wrapper">
    <vHead></vHead>
    <vSidebar></vSidebar>
    <vMain></vMain>
  </div>
</template>

<script>
  import vHead from './header.vue';
  import vSidebar from './aside.vue';
  import vMain from './main.vue';
  export default {
    components: {
      vHead,
      vSidebar,
      vMain
    }
  }
</script>
