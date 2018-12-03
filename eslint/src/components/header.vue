<template>
  <header class="header clearfix">
    <div class="header-left">
      HS DETERMINATION
    </div>
    <div class="header-user">
      <span class="username">{{username}}</span>
      <span title="exit" class="exit" @click="exit"><a href="javascript:;" class="el-icon-circle-close-outline"></a></span>
    </div>
  </header>
</template>
<script>
  import { ERR_OK, arrIndex } from '@/axios/common/common'
  import { getUser } from '@/axios/role';

  export default {
    data() {
      return {
        userName: null,
        accessToken: null
      }
    },
    computed: {
      username() {
        let username = '';
        return username ? username : this.userName;
      }
    },
    mounted() {
      this.getUserInfo();
    },
    watch: {
      $route( to , from ){
        this.getUserInfo();
      }
    },
    methods: {
      /*========================== 退出登录 ===========================*/
      exit() {
        this.$confirm('确认退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/login');
          localStorage.setItem('userInfo', '');
          localStorage.setItem('accessInfo', '');
        }).catch(() => {});
      },
      getUserInfo(){
        getUser().then((res) => {
          if (res.data[0].MessageCode == ERR_OK){
            this.userName = res.data[arrIndex].UserName;
            this.accessToken = res.data[arrIndex].AccessToken;
            localStorage.setItem('userInfo', this.userName);
            localStorage.setItem('accessInfo', this.accessToken);
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    height: 60px;
    background: #2e9cf7;
    color: $fsff;
  }
  .header-left{
    float: left;
    padding:0 20px;
    line-height: 60px;
    height: 60px;
    width: 200px;
    text-align: center;
    font-size: 20px;
    background: #007dbf;
    font-family: sans-serif;
    white-space: nowrap;
  }
  .header-user{
    float: right;
    line-height: 60px;
    height: 60px;
    box-sizing:border-box;
    font-size: 18px;
  }
  .exit{
    padding: 0 10px;
    a{
      color: #007cc0;
      &:hover{
        color: $fsff;
      }
    }
  }

</style>
