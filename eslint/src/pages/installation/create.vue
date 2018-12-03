<template>
  <div>
    <h2 class="bread-crumb">{{title}} Master Installation Part</h2>
    <div class="formbox w50 mg0">
      <el-form :model="form" size="small" onsubmit="return false;" label-width="80px">
          <el-form-item label="Installation:">
            <el-input class="industry-inp" type="textarea" v-model="form.InstallationName" placeholder="" ></el-input>
            <!--<el-select v-model="value" placeholder="Select..." style="width: 100%">-->
              <!--<el-tooltip v-for="item in installation" :key="item.value" class="item" effect="light" :content="item.label" placement="right">-->
                <!--<el-option-->
                  <!--:label="item.label"-->
                  <!--:value="item.value"-->
                  <!--style="width: 450px"-->
                <!--&gt;-->
                <!--</el-option>-->
              <!--</el-tooltip>-->
            <!--</el-select>-->
          </el-form-item>
          <el-form-item label="Description:">
            <el-input class="industry-inp" type="textarea" v-model="form.Description" placeholder="" :rows="5"></el-input>
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
  import {ERR_OK} from '@/axios/common/common'
  import {installationAdd, installationEdit} from '@/axios/installation'

  export default {
    data () {
      return {
        title:'',
        form: {
          InstallationName: '',
          Description: ''
        },
        saveFlag: false,
        queryIndex:''//判断新增或编辑
      }
    },
    mounted(){
      this.queryIndex=this.$route.query.index;
      if(this.queryIndex==1){
        this.form = this.$route.query.data;
        this.title="Edit"
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
          installationEdit(this.form).then((res) => {
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
          installationAdd(this.form).then((res) => {
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


