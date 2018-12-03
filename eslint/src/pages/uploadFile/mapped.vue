<template>
  <div>
    <h2 class="bread-crumb">Review Part No. To HS No.</h2>
    <div class="formbox">
      <el-form :model="form" size="small" onsubmit="return false;" >
        <!--Part No. Not Yet Determination-->
        <div class="table-box">
          <h2 class="form-title">Part No. Not Yet Determination</h2>
          <div class="formbox no-bdb no-marb">
            <el-form :model="query" :inline="true" size="small" onsubmit="return false;">
              <el-row :gutter="0">
                <el-col class="inpbox">
                  <el-form-item>
                    <el-input class="industry-inp" v-model="query.FileName" placeholder="Filter By File Name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="searchbox">
                  <el-form-item>
                    <button class="el-button el-button--small el-button--primary btn-search" type="button" @click="search1"><i class="el-icon-search"></i><span>search</span></button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="table-set">
            <el-table :data="partTable" border stripe size="small" style="width: 100%">
              <el-table-column width="50" align="center" label=" ">
                <template slot-scope="scope">
                  <el-radio v-model="partRadio" :label="scope.row.PartID" class="radio-box" @change="choosePart">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column prop="PartNo" label="Part No." min-width="40" show-overflow-tooltip></el-table-column>
              <el-table-column prop="PartName" label="Part Name" min-width="40" show-overflow-tooltip></el-table-column>
              <el-table-column prop="FunctionName" label="Function" min-width="50" show-overflow-tooltip></el-table-column>
              <el-table-column prop="InstallationName" label="Installation" min-width="50" show-overflow-tooltip></el-table-column>
              <el-table-column prop="MaterialName" label="Material" min-width="50" show-overflow-tooltip></el-table-column>
              <el-table-column prop="Description" label="Description" min-width="50" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
          <div class="table-page clearfix">
            <el-pagination background
                           @current-change="handleCurrentChange"
                           :current-page.sync="partRes.currentPage"
                           :page-size="partRes.pageSize"
                           layout="total, prev, pager, next"
                           :total="partTotal">
            </el-pagination>
          </div>
        </div>
        <!--Match Part Knowledge Rule-->
        <div class="table-box">
          <h2 class="form-title">Match Part Knowledge Rule</h2>
          <div class="formbox no-bdb no-marb">
            <el-form :model="knowledge" :inline="true" size="small" onsubmit="return false;">
              <el-row :gutter="0">
                <el-col class="inpbox">
                  <el-form-item>
                    <el-input class="industry-inp" v-model="knowledge.PartPattern" placeholder="Part No. Patern"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="inpbox">
                  <el-form-item>
                    <el-select v-model="knowledge.RuleID" clearable placeholder="Rule Name">
                      <el-option v-for="item in ruleNameArr"
                                 :key="item.RuleID"
                                 :label="item.RuleName"
                                 :value="item.RuleID"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col class="searchbox">
                  <el-form-item>
                    <button class="el-button el-button--small el-button--primary btn-search" type="button" @click="search2"><i class="el-icon-search"></i><span>search</span></button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="table-set">
            <el-table :data="ruleTable" border stripe size="small" style="width: 100%">
              <el-table-column type="index" width="50" align="center" label="NO."></el-table-column>
              <el-table-column prop="PartPattern" label="Part No. Patern" min-width="40" show-overflow-tooltip></el-table-column>
              <el-table-column prop="RuleName" label="Rule Name" min-width="40" show-overflow-tooltip></el-table-column>
              <el-table-column prop="Description" label="Description" min-width="50" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
          <div class="table-page clearfix">
            <el-pagination background
                           @current-change="handleCurrentChange"
                           :current-page.sync="ruleRes.currentPage"
                           :page-size="ruleRes.pageSize"
                           layout="total, prev, pager, next"
                           :total="ruleTotal">
            </el-pagination>
          </div>
        </div>
        <!--Match HS Rules-->
        <div class="table-box">
          <h2 class="form-title">Match HS Rules</h2>
        </div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="Have HS No." name="first">
            <div class="table-box no-bdt">
              <div class="formbox no-bdb no-marb">
                <el-form :model="hsQuery" :inline="true" size="small" onsubmit="return false;">
                  <el-row :gutter="0">
                    <el-col class="inpbox">
                      <el-form-item>
                        <el-input class="industry-inp" v-model="hsQuery.patern" placeholder="Part No. Patern"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col class="inpbox">
                      <el-form-item>
                        <el-select v-model="hsQuery.ruleName" clearable placeholder="Rule Name">
                          <el-option v-for="item in ruleNameArr"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col class="inpbox">
                      <el-form-item>
                        <el-input class="industry-inp" v-model="hsQuery.hsNo" placeholder="HS No."></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col class="inpbox">
                      <el-form-item>
                        <el-select v-model="hsQuery.MaterialID" clearable placeholder="Material">
                          <el-option v-for="item in materialArr"
                                     :key="item.MaterialID"
                                     :label="item.MaterialName"
                                     :value="item.MaterialID"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col class="inpbox">
                      <el-form-item>
                        <el-select v-model="hsQuery.FunctionID" clearable placeholder="Function">
                          <el-option v-for="item in partFunctionArr"
                                     :key="item.FunctionID"
                                     :label="item.FunctionName"
                                     :value="item.FunctionID"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col class="inpbox">
                      <el-form-item>
                        <el-select v-model="hsQuery.InstallationID" clearable placeholder="Installation">
                          <el-option v-for="item in installationArr"
                                     :key="item.InstallationID"
                                     :label="item.InstallationName"
                                     :value="item.InstallationID"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col class="searchbox">
                      <el-form-item>
                        <button class="el-button el-button--small el-button--primary btn-search" type="button" @click="search3"><i class="el-icon-search"></i><span>search</span></button>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <div class="table-set">
                <el-table :data="tableData1" border stripe size="small" style="width: 100%">
                  <el-table-column width="50" align="center" label=" ">
                    <template slot-scope="scope">
                      <el-radio v-model="hsNotRadio" :label="scope.row.HSID" @change="getHsY" class="radio-box">&nbsp;</el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column prop="PartNo" label="Part No. Patern" min-width="40" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="PartName" label="Rule Name" min-width="40" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="HSNo" label="HS No." min-width="40" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="MaterialName" label="Material" min-width="50" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="FunctionName" label="Function" min-width="50" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="InstallationName" label="Installation" min-width="50" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="Description" label="Description" min-width="50" show-overflow-tooltip></el-table-column>
                </el-table>
              </div>
              <div class="table-page clearfix">
                <el-pagination background
                               @current-change="handleCurrentChange"
                               :current-page.sync="resData1.currentPage"
                               :page-size="resData1.pageSize"
                               layout="total, prev, pager, next"
                               :total="totalCount1">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Don't Have HS No." name="second">
            <div class="table-box no-bdt">
              <div class="formbox no-bdb no-marb">
                <el-form :model="mainQuery" :inline="true" size="small" onsubmit="return false;">
                  <el-row :gutter="0">
                    <el-col class="inpbox">
                      <el-form-item>
                        <el-input class="industry-inp" v-model="mainQuery.HSNo" placeholder="HS No."></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col class="inpbox">
                      <el-form-item>
                        <el-input class="industry-inp" v-model="mainQuery.Kumhs" placeholder="KUMHS"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col class="searchbox">
                      <el-form-item>
                        <button class="el-button el-button--small el-button--primary btn-search" type="button" @click="search4"><i class="el-icon-search"></i><span>search</span></button>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <div class="table-set">
                <el-table :data="hsTable" border stripe size="small" style="width: 100%">
                  <el-table-column width="50" align="center" label=" ">
                    <template slot-scope="scope">
                      <el-radio v-model="hsNotRadio" :label="scope.row.HSID" @change="getHsN" class="radio-box">&nbsp;</el-radio>
                    </template>
                  </el-table-column>
                  <el-table-column prop="HSNo" label="HS No." min-width="40" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="Description" label="Description" min-width="50" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="Kumhs" label="KUMHS" min-width="50" show-overflow-tooltip></el-table-column>
                </el-table>
              </div>
              <div class="table-page clearfix">
                <el-pagination background
                               @current-change="handleCurrentChange"
                               :current-page.sync="hsResData.currentPage"
                               :page-size="hsResData.pageSize"
                               layout="total, prev, pager, next"
                               :total="hsTotal">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-col :span="6">
          <el-form-item>
            <el-button @click="handelCancel">Cancel</el-button>
            <el-button type="primary" @click="handelSave">Save</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {ERR_OK, arrIndex} from '@/axios/common/common'
  import { materialList } from "@/axios/material.js";
  import { installationList } from "@/axios/installation.js";
  import { functionList } from "@/axios/function.js";
  import {ruleNameList} from "@/axios/ruleName.js";
  import { partNoList} from '@/axios/partNo';
  import { partRuleList} from '@/axios/partRule.js'
  import { hsNoList } from "@/axios/hsNo.js";
  import { reviewSave } from "@/axios/upload.js";

  export default {
    data() {
      return {
        title: '',
        queryIndex: '',//判断新增或编辑
        activeName: 'first',
        form: {},     // 提交对象
        // select下拉框数组
        ruleNameArr: [],
        materialArr:[],
        partFunctionArr: [],
        installationArr: [],
        query: {},  // partNo.查询条件
        knowledge: {}, // knowledge rule查询条件
        hsQuery: {}, // have HS No.查询条件
        //notQuery: {}, //don't have HS No.查询条件
        mainQuery: {}, // HS Master List 查询条件

        partRadio: '', // 单选的partNo.
        hsYesRadio: '', //单选框
        hsNotRadio: '', // HS list master 单选
        // partNo.列表数据
        partTable: [],
        partRes: this.metaData(),
        partTotal: 0,
        // knowledge rule列表数据
        ruleTable: [],
        ruleRes: this.metaData(),
        ruleTotal: 0,
        // Have HS No.
        tableData1: [
          {
            partNo: '[76626]',
            ruleName: '5 Digits',
            hsNo: '87082993',
            partFunction: 'Sebagai sarana pemberi kesan exklusif dari dudukan Switch tambahan dan pematik rokok di Console Box',
            installation: 'Terpasang pada Console Box bagian depan atas',
            material: 'PLASTIK POLIETILENA',
            description: 'Part name description'
          }
        ],
        resData1: this.metaData(),
        totalCount1: 1, // 总条数
        // Don't Have HS No.
        //tableData2: [],
        //totalCount2: 1, // 总条数
        //resData2: this.metaData(),
        // HS list
        hsTable: [],
        hsResData: this.metaData(),
        hsTotal: 0,
      }
    },
    mounted() {
      this.getSelect();
      this.partNoList();
      this.hsNotList();

      this.queryIndex = this.$route.query.index;
      if (this.queryIndex == 1) {
        this.title = "Edit"
      } else {
        this.title = "Create"
      }
    },
    methods: {
      /*================== 分页数据 ==================*/
      metaData() {
        return {
          currentPage: 1,
          pageSize: 10,
        }
      },
      search1(){},
      search2(){},
      search3(){},
      search4(){},
      /*================== 获取PartNo.列表数据 ==================*/
      partNoList() {
        partNoList(this.query, this.partRes).then(res => {
          if (res.data[0].MessageCode == ERR_OK) {
            this.partTable = res.data[arrIndex];
            this.partTotal = res.data[0].TotalCount;
          }
        });
      },
      /*================== 点击part No. radio ==================*/
      choosePart(val){
        this.partRadio = val
        this.kRuleList(); //获取Match Part Knowledge Rule
      },
      /*================== 获取Match Part Knowledge Rule列表数据 ==================*/
      kRuleList(){
        partRuleList(this.knowledge).then((res) => {
          if(res.data[0].MessageCode == ERR_OK){
            this.ruleTable = res.data[arrIndex];
            this.ruleTotal = res.data[0].TotalCount;
          }
        })
      },
      /*================== 获取dont have hs No.列表数据 ==================*/
      hsNotList(){
        hsNoList(this.mainQuery, this.hsResData).then(res => {
          if (res.data[0].MessageCode == ERR_OK) {
            this.hsTable = res.data[arrIndex];
            this.hsTotal = res.data[0].TotalCount;
          }
        });
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
        ruleNameList(this.selObj).then(res => {
          if (res.data[0].MessageCode == ERR_OK) {
            this.ruleNameArr = res.data[arrIndex];
          }
        });
      },
      /*================== 已有关联关系表格 ==================*/
      getHsY(val){
        this.hsNotRadio = val;
      },
      /*================== 没有关联关系表格 ==================*/
      getHsN(val){
        this.hsNotRadio= val;
      },
      /*================== Cancel ==================*/
      handelCancel() {
        window.history.back(-1)
      },
      handleClick(tab){
        if (tab.name == 'first'){
//          this.hsNotRadio = '';
        }else {
//          this.hsYesRadio = '';
        }
      },
      /*================== Save ==================*/
      handelSave() {
        reviewSave(this.partRadio,this.hsNotRadio).then((res) => {
          if(res.data[0].MessageCode == ERR_OK){
            this.handelCancel();
            this.$message({
              type: 'success',
              message: 'Successfully upload'
            });
          }else {
            this.$message({
              type: 'error',
              message: res.data[0].Message
            });
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .formbox{
    padding:0 20px;
    .table-box{
      padding: 0 0 15px;
      border-top: 1px solid $fsee;
      .form-title{
        padding:5px 0;
        font-size: 14px;
      }
    }
  }

</style>
