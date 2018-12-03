<template>
  <div>
    <h2 class="bread-crumb">View Part No.</h2>
    <div class="formbox">
      <el-form :model="form" size="small" onsubmit="return false;">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Part No.:">
              <el-input class="industry-inp" v-model="form.PartNo" disabled placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Part Name:">
              <el-input class="industry-inp" v-model="form.PartName" disabled placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Material:">
              <el-select v-model="form.MaterialID" class="w100" placeholder="" disabled>
                <el-option v-for="item in materialArr"
                           :key="item.MaterialID"
                           :label="item.MaterialName"
                           :value="item.MaterialID"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Function:">
              <el-select v-model="form.FunctionID" class="w100" placeholder="" disabled>
                <el-option v-for="item in partFunctionArr"
                           :key="item.FunctionID"
                           :label="item.FunctionName"
                           :value="item.FunctionID"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Installation:">
              <el-select v-model="form.InstallationID" class="w100" placeholder="" disabled>
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
              <el-input class="industry-inp" type="textarea" v-model="form.Description" disabled placeholder=""
                        :rows="5"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--Match Part Knowledge Rule-->
        <div class="table-box">
          <h2 class="form-title">Match Part Knowledge Rule</h2>
          <div class="formbox no-bdb no-marb">
            <el-form :model="knowledge" :inline="true" size="small" onsubmit="return false;">
              <el-row :gutter="0">
                <el-col class="inpbox">
                  <el-form-item>
                    <el-input class="industry-inp" v-model="knowledge.PartPattern" placeholder="Part No. Patern" @keyup.enter.native="searchInner"></el-input>
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
                    <button class="el-button el-button--small el-button--primary btn-search" type="button"
                            @click="searchInner"><i class="el-icon-search"></i><span>search</span></button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="table-set">
            <el-table :data="tableList" @row-click="match" highlight-current-row ref="ruleTable" border stripe size="small" style="width: 100%">
              <el-table-column type="index" width="50" align="center" label="NO."></el-table-column>
              <el-table-column prop="PartPattern" label="Part No. Patern" min-width="40" show-overflow-tooltip></el-table-column>
              <el-table-column prop="RuleName" label="Rule Name" min-width="40" show-overflow-tooltip></el-table-column>
              <el-table-column prop="Description" label="Description" min-width="50" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
          <div class="table-page clearfix">
            <div></div>
            <el-pagination background
                           @current-change="handlePageInner"
                           :current-page.sync="resData1.currentPage"
                           :page-size="resData1.pageSize"
                           layout="total, prev, pager, next"
                           :total="totalCount1">
            </el-pagination>
          </div>
        </div>
        <!--Matches 5 Digit Part No.-->
        <div class="table-box">
          <h2 class="form-title">Matches {{onRuleName}} Part No.</h2>
          <div class="formbox no-bdb no-marb">
            <el-form :model="query" :inline="true" size="small" onsubmit="return false;">
              <el-row :gutter="0">
                <el-col class="inpbox">
                  <el-form-item>
                    <el-input class="industry-inp" v-model="query.PartNo" placeholder="Part No." @keyup.enter.native="searchMatch"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="inpbox">
                  <el-form-item>
                    <el-input class="industry-inp" v-model="query.PartName" placeholder="Part Name" @keyup.enter.native="searchMatch"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="inpbox">
                  <el-form-item>
                    <el-select v-model="query.MaterialID" clearable placeholder="Material">
                      <el-option v-for="item in materialArr"
                                 :key="item.MaterialID"
                                 :label="item.MaterialName"
                                 :value="item.MaterialID"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col class="inpbox">
                  <el-form-item>
                    <el-select v-model="query.FunctionID" clearable placeholder="Function">
                      <el-option v-for="item in partFunctionArr"
                                 :key="item.FunctionID"
                                 :label="item.FunctionName"
                                 :value="item.FunctionID"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col class="inpbox">
                  <el-form-item>
                    <el-select v-model="query.InstallationID" clearable placeholder="Installation">
                      <el-option v-for="item in installationArr"
                                 :key="item.InstallationID"
                                 :label="item.InstallationName"
                                 :value="item.InstallationID"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col class="searchbox">
                  <el-form-item>
                    <button class="el-button el-button--small el-button--primary btn-search" type="button"
                            @click="searchMatch"><i class="el-icon-search"></i><span>search</span></button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="table-set">
            <el-table :data="tableData2" border stripe size="small" style="width: 100%">
              <el-table-column type="index" width="50" align="center" label="NO."></el-table-column>
              <el-table-column prop="PartNo" label="Part No." min-width="40" show-overflow-tooltip></el-table-column>
              <el-table-column prop="PartName" label="Part Name" min-width="40" show-overflow-tooltip></el-table-column>
              <el-table-column prop="MaterialName" label="Material" min-width="50" show-overflow-tooltip></el-table-column>
              <el-table-column prop="FunctionName" label="Function" min-width="50"
                               show-overflow-tooltip></el-table-column>
              <el-table-column prop="InstallationName" label="installation" min-width="50"
                               show-overflow-tooltip></el-table-column>
              <el-table-column prop="Description" label="Description" min-width="50"
                               show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
          <div class="table-page clearfix">
            <el-pagination background
                           @current-change="handlePageMatch"
                           :current-page.sync="resData2.currentPage"
                           :page-size="resData2.pageSize"
                           layout="total, prev, pager, next"
                           :total="totalCount2">
            </el-pagination>
          </div>
        </div>
        <el-col :span="6">
          <el-form-item>
            <el-button @click="handelCancel">Back</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {ERR_OK, arrIndex, keyBoardEnter} from '@/axios/common/common'
  import {materialList} from "@/axios/material.js";
  import {installationList} from "@/axios/installation.js";
  import {functionList} from "@/axios/function.js";
  import {ruleNameList} from "@/axios/ruleName.js";
  import {partNoAdd, partNoUpdate, partNoList} from '@/axios/partNo';
  import {partRuleList} from '@/axios/partRule.js'

  export default {
    data() {
      return {
        selObj: {}, // 备用下拉对象
        onRuleId: null, // 点击rule选中的KRuleID
        onRuleName: null, //点击rule选中的RuleName
        form: {
          FunctionID: '',
          MaterialID: '',
          InstallationID: ''
        },     // 提交对象
        saveFlag: false,
        queryIndex: '',//判断新增或编辑
        // select下拉框数组
        ruleNameArr: [],
        materialArr: [],
        partFunctionArr: [],
        installationArr: [],
        knowledge: {}, // knowledge rule查询条件
        query: {},  // partNo.查询条件
        // knowledge rule列表数据
        tableData1: [],
        resData1: this.metaData(),
        totalCount1: 0, // 总条数
        // partNo.列表数据
        tableData2: [],
        totalCount2: 0, // 总条数
        resData2: this.metaData(),
      }
    },
    computed: {
      tableList: function(){
        return this.tableData1.slice((this.resData1.currentPage-1)*this.resData1.pageSize,this.resData1.currentPage*this.resData1.pageSize)
      }
    },
    mounted() {
      this.getSelect();
      //this.matchPartNoList(); // 默认先获取所有的part No.
      this.queryIndex = this.$route.query.index;
        this.form.PartID = parseInt(this.$route.query.id);
        this.form.PartNo = this.$route.query.partNo;
        this.form.PartName = this.$route.query.partName;
        this.form.FunctionID = parseInt(this.$route.query.functionId);
        this.form.MaterialID = parseInt(this.$route.query.materialId);
        this.form.InstallationID = parseInt(this.$route.query.installationId);
        this.form.Description = this.$route.query.desc;
        this.form.RuleID = parseInt(this.$route.query.ruleId);
        this.form.Spec = parseInt(this.$route.query.spec);
        this.form.Level = this.$route.query.level;
        this.partRuleList(); // 根据part No. id获取匹配的part rule列表
    },
    methods: {
      /*================== 分页数据 ==================*/
      metaData() {
        return {
          currentPage: 1,
          pageSize: 10,
        }
      },
      /*================== 下拉 ==================*/
      getSelect() {
        materialList(this.selObj).then(res => {
          if (res.data[0].MessageCode == ERR_OK) {
            this.materialArr = res.data[arrIndex];
          }
        });
        installationList(this.selObj).then(res => {
          if (res.data[0].MessageCode == ERR_OK) {
            this.installationArr = res.data[arrIndex];
          }
        });
        functionList(this.selObj).then(res => {
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
      /*================== 查询 ==================*/
      searchInner(e){
        this.resData1.currentPage = 1;
        keyBoardEnter(e, () => {
          this.partRuleList();
        })
      },
      searchMatch(e){
        this.resData2.currentPage = 1;
        keyBoardEnter(e, () => {
          this.matchPartNoList();
        })
      },
      handlePageInner(val){
        this.resData1.currentPage = val;
        this.partRuleList();
      },
      handlePageMatch(val){
        this.resData2.currentPage = val;
        this.matchPartNoList();
      },
      /*================== 获取Part Knowledge Rule列表数据 ==================*/
      partRuleList() {
        partRuleList(this.knowledge).then((res) => {
          if(res.data[0].MessageCode == ERR_OK){
            this.tableData1 = res.data[arrIndex];
            this.totalCount1 = res.data[0].TotalCount;
          }
        })
      },
      /*================== 点击Part Knowledge Rule ==================*/
      match(row){
        this.$refs.ruleTable.setCurrentRow(row);
        this.onRuleId = row.KRuleID;
        this.onRuleName = row.RuleName;
        //console.log(row)
        this.matchPartNoList(); // 点击传入KRuleID获取相关part No信息
      },
      /*================== 获取Matches Part No.列表数据 ==================*/
      matchPartNoList() {
        partNoList(this.query, this.resData2).then(res => {
          if (res.data[0].MessageCode == ERR_OK) {
            this.tableData2 = res.data[arrIndex];
            this.totalCount2 = res.data[0].TotalCount;
          }
        });
      },
      /*================== Cancel ==================*/
      handelCancel() {
        window.history.back(-1)
      },
    }
  }
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
