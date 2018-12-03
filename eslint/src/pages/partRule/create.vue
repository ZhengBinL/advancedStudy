<template>
  <div>
    <h2 class="bread-crumb">{{title}} Part Knowledge Rule</h2>
    <div class="formbox w50 mg0">
      <el-form :model="form" size="small" onsubmit="return false;" label-width="150px">
        <el-form-item label="Part No.Pattern:">
          <el-input class="industry-inp" v-model="form.PartPattern" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="Rule Name:">
          <el-select v-model="form.RuleID" placeholder="Rule Name" class="w100">
            <el-option
              v-for="item in ruleNames"
              :key="item.RuleID"
              :label="item.RuleName"
              :value="item.RuleID">
            </el-option>
          </el-select>
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
  import {ERR_OK, arrIndex} from '@/axios/common/common'
  import {partRuleAdd, partRuleEdit} from '@/axios/partRule'
  import {ruleNameList} from '@/axios/ruleName'

  export default {
    data () {
      return {
        title:'',
        form: {},
        queryIndex:'',  //判断新增或编辑
        saveFlag: false,
        //下拉框
        ruleNames: [],
      }
    },
    mounted(){
      this.getRuleName();
      this.queryIndex=this.$route.query.index;
      if(this.queryIndex==1){
        this.title="Edit"
        this.form = this.$route.query.data;
      }else{
        this.title="Create New"
      }
    },
    methods: {
      /*================== 获取下拉 ==================*/
      getRuleName(){
        ruleNameList().then((res) => {
          if(res.data[0].MessageCode == ERR_OK){
            this.ruleNames = res.data[arrIndex];
          }
        })
      },
      /*================== Cancel ==================*/
      handelCancel(){
        window.history.back(-1)
      },
      /*================== Save ==================*/
      handelSave(){
        this.saveFlag = true;
        // 编辑时的保存
        if (this.queryIndex == 1){
          partRuleEdit(this.form).then((res) => {
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
          partRuleAdd(this.form).then((res) => {
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


