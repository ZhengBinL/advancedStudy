<template>
  <div>
    <h2 class="bread-crumb">{{title}} Master Material Part</h2>
    <div class="formbox w50 mg0">
      <el-form :model="form" size="small" onsubmit="return false;" label-width="80px">
          <el-form-item label="Material:">
            <el-input class="industry-inp" type="textarea" v-model="form.MaterialName" placeholder="" ></el-input>
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
import { ERR_OK } from "@/axios/common/common";
import {
  materialAdd,
  materialUpdate
} from "@/axios/material.js";
export default {
  data() {
    return {
      title: "",
      form: {},
      queryIndex: "", //判断新增或编辑
      item:'',//传过来的数据
      saveFlag: false
    };
  },
  mounted() {
    this.queryIndex = this.$route.query.index;
    this.item = this.$route.query.item;
    if (this.queryIndex === 1) {
      this.title = "Edit";
      this.form = this.item
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
        materialUpdate(this.form).then(res => {
          if (res.data[0].MessageCode == ERR_OK) {
            this.$message({
              type: 'success',
              message: 'Successfully saved'
            });
            window.history.back(-1);
          }else{
            this.saveFlag = false;
            this.$message({
              type: 'error',
              message: res.data[0].Message
            });
          }
        });
      } else {
        materialAdd(this.form).then(res => {
          if (res.data[0].MessageCode == ERR_OK) {
            this.$message({
              type: 'success',
              message: 'Successfully saved',
            })
             window.history.back(-1)
          }else{
            this.saveFlag = false;
            this.$message({
              type: 'error',
              message: res.data[0].Message
            });
          }
        });
      }
    }
  }
};
</script>


