<template>
  <div class="main">
    <div class="wrap">
      <div class="welcome-wrapper" v-if="$route.name=='home'">
        <p class="welcome">Welcome<span> {{username}} </span> to use <span> the system HS DETERMINATION</span></p>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return{
        name:''
      }
    },
    computed: {
      username() {
        let username = '';
//        let username = localStorage.getItem('ms_username');
        return username ? username : this.name;
      }
    },
  }
</script>
<style scoped lang="scss">
  .welcome-wrapper {
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size:500px auto;
    .welcome{
      padding: 10% 0;
      text-align: center;
    }
  }
  .main {
    position: absolute;
    top: 70px;
    left: 250px;
    right: 0;
    bottom: 0;
    padding: 10px;
    overflow-y:auto;
    .wrap {
      position: relative;
      padding:10px 15px;
      min-height: 100%;
      height: auto !important;
      box-shadow: 0 0 8px rgba(222,222,222,.5);
      overflow-x: hidden;
    }
  }

</style>
