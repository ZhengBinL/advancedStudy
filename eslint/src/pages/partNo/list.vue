<template>
  <div class="table-box">
    <div class="formbox">
      <el-form :model="form" :inline="true" size="small" onsubmit="return false;">
        <el-row :gutter="0">
          <el-col class="inpbox">
            <el-form-item>
              <el-input class="industry-inp" v-model="form.PartNo" placeholder="Part No." @keyup.enter.native="search"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="inpbox">
            <el-form-item>
              <el-input class="industry-inp" v-model="form.PartName" placeholder="Part Name" @keyup.enter.native="search"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="inpbox">
            <el-form-item>
              <el-select v-model="form.MaterialID" clearable placeholder="Material">
                <el-option v-for="item in materialArr"
                           :key="item.MaterialID"
                           :label="item.MaterialName"
                           :value="item.MaterialID"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="inpbox">
            <el-form-item>
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
      <h2 class="form-title">Data List Master Part No.</h2>
      <div class="main-opt"><el-button type="success" size="small" class="btn-add" @click="goAdd">Create</el-button></div>
      <el-table :data="tableData" border stripe size="small" style="width: 100%">
        <el-table-column type="index" width="50" align="center" label="NO."></el-table-column>
        <el-table-column prop="PartNo" label="Part No." min-width="40" show-overflow-tooltip></el-table-column>
        <el-table-column prop="PartName" label="Part Name" min-width="40" show-overflow-tooltip></el-table-column>
        <el-table-column prop="MaterialName" label="Material" min-width="50" show-overflow-tooltip></el-table-column>
        <el-table-column prop="FunctionName" label="Function" min-width="50" show-overflow-tooltip></el-table-column>
        <el-table-column prop="InstallationName" label="Installation" min-width="50" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Description" label="Description" min-width="50" show-overflow-tooltip></el-table-column>
        <el-table-column label="Action" width="90" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="warning" size="mini">Edit</el-button>
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
  import { partNoList } from "@/axios/partNo.js";
  import { materialList } from "@/axios/material.js";
  import { installationList } from "@/axios/installation.js";
  import { functionList } from "@/axios/function.js";

  export default {
    data () {
      return {
        query: {}, // 下拉备用
        form: {},
        // select下拉框数组
        materialArr:[],
        partFunctionArr: [],
        installationArr: [],
        resData: this.metaData(),
        // 列表数据
        tableData: [],
        totalCount: 0, // 总条数
      }
    },
    mounted(){
      this.getSelect();
      this.list();
    },
    methods: {
      /*================== 分页数据 ==================*/
      metaData(){
        return {
          currentPage: 1,
          pageSize: 25,
        }
      },
      /*================== 下拉 ==================*/
      getSelect(){
        materialList(this.query).then(res => {
          if (res.data[0].MessageCode == ERR_OK) {
            this.materialArr = res.data[arrIndex];
          }
        });
        installationList(this.query).then(res => {
          if (res.data[0].MessageCode == ERR_OK) {
            this.installationArr = res.data[arrIndex];
          }
        });
        functionList(this.query).then(res => {
          if (res.data[0].MessageCode == ERR_OK) {
            this.partFunctionArr = res.data[arrIndex];
          }
        });
      },
      /*================== 获取列表数据 ==================*/
      list() {
        partNoList(this.form, this.resData).then(res => {
          if (res.data[0].MessageCode == ERR_OK) {
            this.tableData = res.data[arrIndex];
            this.totalCount = res.data[0].TotalCount;
          }
        });
      },
      /*================== 添加 ==================*/
      goAdd(){
        this.$router.push({name:'partAdd'})
      },
      /*================== Edit ==================*/
      handleEdit(data){
        this.$router.push({
          name:'partAdd',
          query:{
            index: 1,
            id: data.PartID,
            partNo: data.PartNo,
            partName: data.PartName,
            functionId: data.FunctionID,
            materialId: data.MaterialID,
            installationId: data.InstallationID,
            desc: data.Description,
            ruleId: data.RuleID,
            spec:data.Spec,
            level: data.Level
          }
        })
      }
    }
  }
</script>
