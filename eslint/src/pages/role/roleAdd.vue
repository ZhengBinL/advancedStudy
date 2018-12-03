<template>
  <div>
    <h2 class="bread-crumb">{{title}} Role</h2>
    <div class="formbox w50 mg0">
      <el-form :model="form" ref="form" onsubmit="return false;" label-width="150px" size="small">
        <el-form-item label="Role Name：">
          <el-input v-model="form.RoleName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handelCancel">Cancel</el-button>
          <el-button type="primary" :disabled="saveFlag" @click="handelSave">Save</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { ERR_OK, formatDateTime } from '@/axios/common/common'
  import {roleAdd, roleUpdate} from '@/axios/role';

  export default {
    data () {
      return {
        title:'',
        form: {
          CreateTime: ''
        },
        queryIndex:'',  //判断新增或编辑
        saveFlag: false,
      }
    },
    mounted(){
      this.queryIndex=this.$route.query.index;
      if(this.queryIndex==1){
        this.title="Edit"
        this.form = this.$route.query.data;
      }else{
        this.title="Create New"
      }
    },
    methods: {
      /*================== Cancel ==================*/
      handelCancel(){
        window.history.back(-1)
      },
      /*================== Save ==================*/
      handelSave(){
        this.saveFlag = true;
        // 编辑时的保存
        if (this.queryIndex == 1){
          roleUpdate(this.form).then((res) => {
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
        }else {
          this.form.CreateTime = formatDateTime()
          //console.log(this.form, 'form data')
          roleAdd(this.form).then((res) => {
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
        }
      },
    }
  }
</script>
