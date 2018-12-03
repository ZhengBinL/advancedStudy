<template>
  <aside class="aside">
    <el-menu
      text-color="#fff"
      background-color="#545c64"
      active-text-color="#ffd04b"

    >
      <el-menu-item :index="item.PID.toString()" v-for="item in nav" :key="item.PID">
        <router-link class='nav-aside' :to="{name: item.Path}">{{item.FunctionName}}</router-link>
      </el-menu-item>

      <!--<el-menu-item index="1">-->
        <!--<router-link class='nav-aside' :to="{name: 'uploadMonitor'}">SPLD Upload Request</router-link>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="13">-->
        <!--<router-link class='nav-aside' :to="{name: 'uploadApproval'}">Approval Request</router-link>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="2">-->
        <!--<router-link class='nav-aside' :to="{name: 'part'}">Part Master Management</router-link>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="3">-->
        <!--<router-link class='nav-aside' :to="{name: 'incompletePart'}">Incomplete Part</router-link>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="7">-->
        <!--<router-link class='nav-aside' :to="{name: 'hs'}">HS Number Master Management</router-link>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="4">-->
        <!--<router-link class='nav-aside' :to="{name: 'material'}">Material Master Management</router-link>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="5">-->
        <!--<router-link class='nav-aside' :to="{name: 'functionList'}">Function Master Management</router-link>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="6">-->
        <!--<router-link class='nav-aside' :to="{name: 'installation'}">Installation Master Management</router-link>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="8">-->
        <!--<router-link class='nav-aside' :to="{name: 'media'}">Media Master Management</router-link>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="9">-->
        <!--<router-link class='nav-aside' :to="{name: 'ruleName'}">Rule Name Master Management</router-link>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="10">-->
        <!--<router-link class='nav-aside' :to="{name: 'partRule'}">Part Rule Master Management</router-link>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="11">-->
        <!--<router-link class='nav-aside' :to="{name: 'hsRule'}">HS Rule Master Management</router-link>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="12">-->
        <!--<router-link class='nav-aside' :to="{name: 'role'}">Role Master Management</router-link>-->
      <!--</el-menu-item>-->
    </el-menu>
  </aside>
</template>
<script>
  import { ERR_OK, arrIndex } from '@/axios/common/common'
  import {rolePrivilege, getUser} from '@/axios/role'

  export default {
    data() {
      return {
        nav: []
      }
    },
    mounted() {
      this.getUserInfo()
    },
    methods: {
      getUserInfo(){
        getUser().then((res) => {
          if (res.data[0].MessageCode == ERR_OK){
            let userId = res.data[arrIndex].RoleID
            localStorage.setItem('userId', userId);
            localStorage.setItem('userInfo', res.data[arrIndex].UserName);
            localStorage.setItem('accessInfo', res.data[arrIndex].AccessToken);
            rolePrivilege(userId).then((res) => {
              if (res.data[0].MessageCode == ERR_OK){
                this.nav = res.data[arrIndex]
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  aside {
    position: absolute;
    top: 60px;
    width: 240px;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
    background-color:#545c64;
  }

  .el-menu{
    border-right:none;
    .el-menu-item{
      padding:0 10px 0 15px!important;
      line-height: 44px;
      height: 44px;
      border-bottom:1px solid #64676b;
      .nav-aside {
        display: block;
        text-decoration: none;
        color: #fff;
      }
    }
  }

  li a.router-link-active{
    color: #8c794c;
    font-weight: 600;
  }
</style>
