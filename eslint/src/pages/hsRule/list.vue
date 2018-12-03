<template>
  <div class="table-box">
    <div class="formbox">
      <el-form :model="form" :inline="true" size="small" onsubmit="return false;">
        <el-row :gutter="0">
          <el-col class="inpbox">
            <el-form-item>
              <el-input class="industry-inp" v-model="form.PartPattern" placeholder="Part No. Patern" @keyup.enter.native="search"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="inpbox">
            <el-form-item>
              <el-input class="industry-inp" v-model="form.HSRuleID" placeholder="HS No." @keyup.enter.native="search"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="inpbox">
            <el-form-item>
              <!-- <el-input class="industry-inp" v-model="form.RuleName" placeholder="Rule Name"></el-input> -->
              <el-select v-model="form.RuleID" placeholder="Rule Name" class="w100">
                <el-option v-for="item in ruleNameArr"
                           :key="item.RuleID"
                           :label="item.RuleName"
                           :value="item.RuleID"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="inpbox">
            <el-form-item>
              <!-- <el-input class="industry-inp" v-model="form.MaterialName" placeholder="MaterialName"></el-input> -->
              <el-select v-model="form.MaterialID" clearable placeholder="MaterialName">
                <el-option v-for="item in materialArr"
                           :key="item.MaterialID"
                           :label="item.MaterialName"
                           :value="item.MaterialID"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="inpbox">
            <el-form-item>
              <!-- <el-input class="industry-inp" v-model="form.FunctionName" placeholder="Function"></el-input> -->
              <el-select v-model="form.FunctionID" clearable placeholder="Function">
                <el-option v-for="item in partFunctionArr"
                           :key="item.FunctionID"
                           :label="item.FunctionName"
                           :value="item.FunctionID"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="inpbox">
            <el-form-item>
              <!-- <el-input class="industry-inp" v-model="form.InstallationName" placeholder="Installation"></el-input> -->
              <el-select v-model="form.InstallationID" clearable placeholder="Installation">
                <el-option v-for="item in installationArr"
                           :key="item.InstallationID"
                           :label="item.InstallationName"
                           :value="item.InstallationID"></el-option>
              </el-select>
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
      <h2 class="form-title">Data List HS Rule</h2>
      <div class="main-opt"><el-button type="success" size="small" class="btn-add" @click="goAdd">Create</el-button></div>
      <el-table :data="tableData" border stripe size="small" style="width: 100%">
        <el-table-column type="index" width="50" align="center" label="NO."></el-table-column>
        <el-table-column prop="PartPattern" label="Part No. Patern" min-width="40" show-overflow-tooltip></el-table-column>
        <el-table-column prop="HSRuleID" label="HS No." min-width="40" show-overflow-tooltip></el-table-column>
        <el-table-column prop="RuleName" label="Rule Name" min-width="40" show-overflow-tooltip></el-table-column>
        <el-table-column prop="MaterialName" label="Material" min-width="50" show-overflow-tooltip></el-table-column>
        <el-table-column prop="FunctionName" label="Function" min-width="50" show-overflow-tooltip></el-table-column>
        <el-table-column prop="InstallationName" label="Installation" min-width="50" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Description" label="Description" min-width="50" show-overflow-tooltip></el-table-column>
        <el-table-column label="Action" width="234">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="primary" size="mini">View</el-button>
            <el-button @click="handleEdit(scope.row)" type="warning" size="mini">Edit</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" size="mini">Delete</el-button>
          </template>
        </el-table-column>
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
</template>

<script>
import { ERR_OK, arrIndex } from "@/axios/common/common";
import { materialList } from "@/axios/material.js";
import { ruleNameList } from "@/axios/ruleName.js";
import { installationList } from "@/axios/installation.js";
import { functionList } from "@/axios/function.js";
import { hsRuleList, hsRuleDel } from "@/axios/hsRule.js";

export default {
  data() {
    return {
      form: {},
      ruleNameArr: [],
      partFunctionArr: [],
      installationArr: [],
      materialArr: [],
      resData: this.metaData(),
      // 列表数据
      tableData: [],
      totalCount: 0 // 总条数
    };
  },
  mounted() {
    this.list();
    this.handleSeletion();
  },
  methods: {
    /*================== 分页数据 ==================*/
    metaData() {
      return {
        currentPage: 1,
        pageSize: 25
      };
    },
    /*================== 获取下拉数据 ==================*/
    handleSeletion() {
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
    },
    /*================== 获取列表数据 ==================*/
    list() {
      //列表数据
      hsRuleList(this.form).then(res => {
        if (res.data[0].MessageCode == ERR_OK) {
          this.tableData = res.data[arrIndex];
          this.totalCount = res.data[0].TotalCount;
        }
      });
    },
    /*================== 添加 ==================*/
    goAdd() {
      this.$router.push({ name: "hsRuleAdd" });
    },
    /*================== View ==================*/
    handleView(item) {
      this.$router.push({ name: "hsRuleView", query: { item: item } });
    },
    /*================== Edit ==================*/
    handleEdit(item) {
      this.$router.push({ name: "hsRuleAdd", query: { index: 1, item: item } });
    },
    /*================== Delete ==================*/
    handleDelete(item) {
      this.$confirm("Are you sure to delete?", "Tips", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning"
      })
        .then(() => {
          hsRuleDel(item).then(res => {
            if (res.data[0].MessageCode == ERR_OK) {
              this.list();
              //this.handleSeletion();
              this.$message({
                type: 'success',
                message: 'Successfully deleted'
              });
            } else {
              this.$message({
                type: "error",
                message: res.data[0].Message
              });
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>
