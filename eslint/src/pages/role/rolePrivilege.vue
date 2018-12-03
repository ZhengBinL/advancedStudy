<template>
  <div class="table-box">
    <h2 class="bread-crumb">Role Privilege</h2>
    <div class="table-set nopadt">
      <el-table :data="tableData" ref="table" border stripe size="small" @selection-change="handleSelectionChange" style="width: 400px;margin: 0 auto;">
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column prop="FunctionName" label="Privilege"></el-table-column>
      </el-table>
      <div class="btn-wrapper">
        <el-button @click="handelCancel" size="mini">Cancel</el-button>
        <el-button type="primary" :disabled="saveFlag" @click="handelSave" size="mini">Save</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { ERR_OK, arrIndex } from '@/axios/common/common'
  import { rolePrivilege, savePrivilege } from '@/axios/role';

  export default {
    data () {
      return {
        id: '',
        saveFlag: false,
        authIds: [], //勾选的id
        multipleSelection: [],
        // 列表数据
        tableData: [],

      }
    },
    created(){
      this.id = this.$route.query.id;
      this.list();
    },
    methods: {
      /*================== 获取列表数据 ==================*/
      list(){
        rolePrivilege(this.id).then((res) => {
          if (res.data[0].MessageCode == ERR_OK) {
            this.tableData = res.data[arrIndex];
            this.$nextTick(() => {
              this.tableData.forEach((item, index) => {
                if (item.IsCheck == 'check'){
                  this.$refs.table.toggleRowSelection(item,true);
                }
              })
            })
          }
        })
      },

      /*================== 保存 ==================*/
      handelSave(){
        this.saveFlag = true;
        let authStr = this.authIds.join(',');
        savePrivilege(this.id, authStr).then((res) => {
          if (res.data[0].MessageCode == ERR_OK){
            this.handelCancel();
            this.$message({
              type: 'success',
              message: 'Successfully saved'
            })
          }else {
            this.saveFlag = false;
            this.$message({
              type: 'error',
              message: res.data[0].Message
            })
          }
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.authIds = this.multipleSelection.map(item => item.PID)
//        console.log(this.authIds)
      },
      /*================== cancel ==================*/
      handelCancel(){
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .btn-wrapper{
    padding:20px 0;
    text-align: center;
  }
</style>
