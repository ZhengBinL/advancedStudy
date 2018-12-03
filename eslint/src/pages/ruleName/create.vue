<template>
  <div>
    <h2 class="bread-crumb">{{title}} Rule Name</h2>
    <div class="formbox w50 mg0">
      <el-form :model="form" size="small" onsubmit="return false;" label-width="150px">
        <el-form-item label="Rule Name:">
          <el-input class="industry-inp" v-model="form.RuleName" placeholder="" ></el-input>
          <!--<el-select v-model="value" placeholder="Select..." style="width: 100%">-->
            <!--<el-option-->
              <!--v-for="item in ruleNames"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value"-->
              <!--style="width: 350px"-->
            <!--&gt;-->
            <!--</el-option>-->
          <!--</el-select>-->
        </el-form-item>
        <el-form-item label="Rule Level:">
          <el-input class="industry-inp" v-model="form.Level" placeholder="" ></el-input>
        </el-form-item>
        <el-form-item label="For:">
          <el-select v-model="form.Spec" placeholder="For" @change="changeValue" style="width: 100%">
            <el-option label="HS Rule" value="1"></el-option>
            <el-option label="Part Knowledge Rule" value="2"></el-option>
          </el-select>
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
import { ERR_OK } from "@/axios/common/common";
import {
  ruleNameAdd,
  ruleNameUpdate
} from "@/axios/ruleName.js";
export default {
  data() {
    return {
      title: "",
      form: {},
      item: "", //传过来的数据
      queryIndex: "" ,//判断新增或编辑
      saveFlag: false//防止重复提交
    };
  },
  mounted() {
    this.queryIndex = this.$route.query.index;
    this.item = this.$route.query.item;
    if (this.queryIndex === 1) {
      this.title = "Edit";
      this.form = this.item;
      this.form.Spec = this.form.Spec + ''
    } else {
      this.title = "Create New";
    }
  },
  methods: {
    /*================== Cancel ==================*/
    handelCancel() {
      window.history.back(-1);
    },
    /*================== Save ==================*/
    handelSave() {
      this.saveFlag = true;
      if (this.queryIndex === 1) {
        ruleNameUpdate(this.form).then(res => {
          if (res.data[0].MessageCode == ERR_OK) {
            this.$message({
              type: "success",
              message: "Successfully saved"
            });
            window.history.back(-1);
          } else {
            this.saveFlag = false;
            this.$message({
              type: "error",
              message: res.data[0].Message
            });
          }
        });
      } else {
        ruleNameAdd(this.form).then(res => {
          if (res.data[0].MessageCode == ERR_OK) {
            this.$message({
              type: "success",
              message: "Successfully saved"
            });
            window.history.back(-1);
          } else {
            this.saveFlag = false;
            this.$message({
              type: "error",
              message: res.data[0].Message
            });
          }
        });
      }
    },
    /*================== changeValue ==================*/
    changeValue(a) {//a是value
      if(a==1){
        this.form.SpecName = 'HS Rule'
      }else{
        this.form.SpecName = 'Part Knowledge Rule'
      }
    }
  }
};
</script>


