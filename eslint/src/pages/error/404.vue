<template>
  <div class="notfound">
    <div class="tips">
      <span class="caption">{{message}}</span>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data(){
      return {
        message:'对不起，该页面不存在'
      }
    }
  }
</script>
<style scoped>
  @import "../../assets/scss/error.css";
  .notfound{
    background: url(../../assets/img/404.png) no-repeat center top;
    width: 100%;
    height: 100%;
    background-size: cover;
  }
</style>
