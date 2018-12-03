<template>
  <div class="login-wrap">
    <div class="login-box">
        <div class="login-title">HS DETERMINATION</div>
        <div class="login-btn">
          <el-button size="" type="primary" @click="submitForm">Login using TAM passport</el-button>
        </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {ERR_OK, arrIndex} from '@/axios/common/common'
  import {getUser} from '@/axios/role';

  export default {
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
      //*=====================   登录提交   ======================*/
      submitForm() {
        this.$router.push({
          name: 'home'
        })
        this.getUserInfo();
      },
      getUserInfo(){
        getUser().then((res) => {
          //console.log(res)
          if (res.data[0].MessageCode == ERR_OK){
//            localStorage.setItem('userId', res.data[arrIndex].userId);
            localStorage.setItem('userInfo', res.data[arrIndex].UserName);
            localStorage.setItem('accessInfo', res.data[arrIndex].AccessToken);
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  .login-wrap{
    height: 100%;
    background: #e4e8ef;
    padding: 15% 0;
    box-sizing: border-box;
  }
  .login-box {
    position: relative;
    width: 320px;
    margin: 0 auto;
    height: auto;
    padding: 30px;
    border-radius: 5px;
    text-align: center;
    .login-title{
      padding:10px 0;
      font-size: 24px;
      background: #023c5a;
      color: #ffffff;
      margin-bottom: 20px;
      border-radius: 3px;
    }
    .login-btn {
      .el-button{
        font-size: 16px;
      }
    }
  }
</style>
