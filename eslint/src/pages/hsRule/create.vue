<template>
  <div>
    <h2 class="bread-crumb">{{title}} HS Rule</h2>
    <div class="formbox">
      <el-form :model="form" size="small" onsubmit="return false;" >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Rule Name:">
              <el-select v-model="form.RuleID" placeholder="" class="w100">
                <el-option v-for="item in ruleNameArr"
                           :key="item.RuleID"
                           :label="item.RuleName"
                           :value="item.RuleID"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Part No. Patern:">
              <el-input class="industry-inp" v-model="form.PartPattern" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Material:">
              <el-select v-model="form.MaterialID" clearable class="w100" placeholder="">
                <el-option v-for="item in materialArr"
                           :key="item.MaterialID"
                           :label="item.MaterialName"
                           :value="item.MaterialID"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Function:">
              <el-select v-model="form.FunctionID" clearable class="w100" placeholder="">
                <el-option v-for="item in partFunctionArr"
                           :key="item.FunctionID"
                           :label="item.FunctionName"
                           :value="item.FunctionID"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Installation:">
              <el-select v-model="form.InstallationID" clearable class="w100" placeholder="">
                <el-option v-for="item in installationArr"
                           :key="item.InstallationID"
                           :label="item.InstallationName"
                           :value="item.InstallationID"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="Description:">
              <el-input class="industry-inp" type="textarea" v-model="form.Description" placeholder="" :rows="5"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--List Master HS-->
        <div class="table-box">
          <h2 class="form-title">List Master HS</h2>
          <div class="formbox no-bdb no-marb">
            <el-form :model="knowledge" :inline="true" size="small" onsubmit="return false;">
              <el-row :gutter="0">
                <el-col class="inpbox">
                  <el-form-item>
                    <el-input class="industry-inp" v-model="knowledge.HSNo" placeholder="HS No."></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="inpbox">
                  <el-form-item>
                    <el-input class="industry-inp" v-model="knowledge.Kumhs" placeholder="KUMHS"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="searchbox">
                  <el-form-item>
                    <button class="el-button el-button--small el-button--primary btn-search" type="button" @click="search"><i class="el-icon-search"></i><span>search</span></button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="table-set">
            <el-table :data="tableData" ref="hsnotable" border stripe size="small" style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" label=" "></el-table-column>
              <el-table-column type="index" width="50" align="center" label="NO."></el-table-column>
              <el-table-column prop="HSNo" label="HS No." min-width="40" show-overflow-tooltip></el-table-column>
              <el-table-column prop="Description" label="Description" min-width="50" show-overflow-tooltip></el-table-column>
              <el-table-column prop="Kumhs" label="KUMHS" min-width="50" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
          <div class="table-page clearfix">
            <el-pagination background
                           @current-change="handleCurrentChange"
                           :current-page.sync="resData.currentPage"
                           :page-size="resData.pageSize"
                           layout="total, prev, pager, next"
                           :total="totalCount">
            </el-pagination>
          </div>
        </div>
        <el-col :span="6">
          <el-form-item>
            <el-button @click="handelCancel">Cancel</el-button>
            <el-button type="primary" :disabled="saveFlag" @click="handelSave">Save</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ERR_OK, arrIndex } from "@/axios/common/common";
import { materialList } from "@/axios/material.js";
import { ruleNameList } from "@/axios/ruleName.js";
import { installationList } from "@/axios/installation.js";
import { functionList } from "@/axios/function.js";
import { hsRuleAdd, hsRuleUpdate } from "@/axios/hsRule.js";
import { hsNoList } from "@/axios/hsNo.js";
export default {
  data() {
    return {
      title: "",
      form: {
        RuleID: "",
        MaterialID: "",
        FunctionID: "",
        InstallationID: ""
      }, // 提交对象
      queryIndex: "", //判断新增或编辑
      // select下拉框数组
      ruleNameArr: [],
      materialArr: [],
      partFunctionArr: [],
      installationArr: [],
      knowledge: {}, // knowledge rule查询条件
      query: {}, // partNo.查询条件
      // HS List列表数据
      tableData: [],
      resData: this.metaData(),
      totalCount: 0, // 总条数
      item: "", //传过来的数据
      selectionNo: [], //多选的数据
      saveFlag: false
    };
  },
  mounted() {
    this.queryIndex = this.$route.query.index;
    this.item = this.$route.query.item;
    if (this.queryIndex == 1) {
      this.title = "Edit";
      this.form = this.item;
    } else {
      this.title = "Create New";
    }
    this.list();
  },
  methods: {
    /*================== 分页数据 ==================*/
    metaData() {
      return {
        currentPage: 1,
        pageSize: 25
      };
    },
    /*================== 获取列表数据 ==================*/
    list() {
      //各个下拉数据获取
      materialList(this.form).then(res => {
        if (res.data[0].MessageCode == ERR_OK) {
          this.materialArr = res.data[arrIndex];
        }
      });
      ruleNameList(this.form).then(res => {
        if (res.data[0].MessageCode == ERR_OK) {
          this.ruleNameArr = res.data[arrIndex];
        }
      });
      installationList(this.form).then(res => {
        if (res.data[0].MessageCode == ERR_OK) {
          this.installationArr = res.data[arrIndex];
        }
      });
      functionList(this.form).then(res => {
        if (res.data[0].MessageCode == ERR_OK) {
          this.partFunctionArr = res.data[arrIndex];
        }
      });
      //hsNo列表数据
      hsNoList(this.knowledge, this.resData).then(res => {
        if (res.data[0].MessageCode == ERR_OK) {
          this.tableData = res.data[arrIndex];
          this.totalCount = res.data[0].TotalCount;
          // if (rows) {
          //   rows.forEach(row => {
          //     this.$refs.hsnotable.toggleRowSelection(row);
          //   });
          // } else {
          //   this.$refs.hsnotable.clearSelection();
          // }
        }
      });
    },
    /*================== Cancel ==================*/
    handelCancel() {
      window.history.back(-1);
    },
    /*================== Save ==================*/
    handelSave() {
      this.form.HSID = this.selectionNo.toString();
      this.saveFlag = true;
      if (this.queryIndex === 1) {
        hsRuleUpdate(this.form).then(res => {
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
        hsRuleAdd(this.form).then(res => {
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
    /*================== SelectionChange ==================*/
    handleSelectionChange(val) {
      this.selectionNo = val;
      this.selectionNo = this.selectionNo.map(v => v.HSID);
    }
  }
};
</script>

<style lang="scss" scoped>
.formbox {
  padding: 0 20px;
  .table-box {
    padding: 0 0 15px;
    border-top: 1px solid $fsee;
    .form-title {
      padding: 5px 0;
      font-size: 14px;
    }
  }
}
</style>
