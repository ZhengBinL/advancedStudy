<template>
  <div class="table-box">
    <div class="formbox">
      <el-form :model="form" :inline="true" size="small" onsubmit="return false;">
        <el-row :gutter="0">
          <el-col class="inpbox">
            <el-form-item>
              <el-input class="industry-inp" v-model="form.PartPattern" placeholder="Part No.Pattern" @keyup.enter.native="search"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="inpbox">
            <el-form-item>
              <el-select v-model="form.RuleID" placeholder="Rule Name">
                <el-option
                  v-for="item in ruleNames"
                  :key="item.RuleID"
                  :label="item.RuleName"
                  :value="item.RuleID">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--<el-col class="inpbox">-->
            <!--<el-form-item label="Description:">-->
              <!--<el-input class="industry-inp" v-model="form.description" placeholder=""></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col class="searchbox">
            <el-form-item>
              <button class="el-button el-button--small el-button--primary btn-search" type="button" @click="search"><i class="el-icon-search"></i><span>search</span></button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-set">
      <h2 class="form-title">Data List Part Knowledge Rule</h2>
      <div class="main-opt"><el-button type="success" size="small" class="btn-add" @click="goAdd">Create</el-button></div>
      <el-table :data="tableList" border stripe size="small" style="width: 100%">
        <el-table-column type="index" width="50" align="center" label="NO."></el-table-column>
        <el-table-column prop="PartPattern" label="Part No. Patern" min-width="40" show-overflow-tooltip></el-table-column>
        <el-table-column prop="RuleName" label="Rule Name" min-width="40" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Description" label="Description" min-width="50" show-overflow-tooltip></el-table-column>
        <el-table-column label="Action" width="234">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="primary" size="mini">View</el-button>
            <el-button @click="handleEdit(scope.row)" type="warning" size="mini">Edit</el-button>
            <el-button @click="handleDelete(scope.row.KRuleID)" type="danger" size="mini">Delete</el-button>
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
  import {ERR_OK, arrIndex} from '@/axios/common/common'
  import {partRuleList, partRuleDelete} from '@/axios/partRule.js'
  import {ruleNameList} from '@/axios/ruleName'

  export default {
    data () {
      return {
        form: {},
        resData: this.metaData(),
        //下拉框
        ruleNames: [],
        // 列表数据
        tableData: [],
        totalCount: 0, // 总条数
      }
    },
    mounted(){
      this.getRuleName();
      this.list();
    },
    computed: {
      tableList: function(){
        return this.tableData.slice((this.resData.currentPage-1)*this.resData.pageSize,this.resData.currentPage*this.resData.pageSize)
      }
    },
    methods: {
      /*================== 分页数据 ==================*/
      metaData(){
        return {
          currentPage: 1,
          pageSize: 25,
        }
      },
      /*================== 获取下拉 ==================*/
      getRuleName(){
        ruleNameList().then((res) => {
          if(res.data[0].MessageCode == ERR_OK){
            this.ruleNames = res.data[arrIndex];
          }
        })
      },
      /*================== 获取列表数据 ==================*/
      list(){
        partRuleList(this.form).then((res) => {
          if(res.data[0].MessageCode == ERR_OK){
            this.tableData = res.data[arrIndex];
            this.totalCount = res.data[0].TotalCount;
          }
        })
      },
      /*================== 添加 ==================*/
      goAdd(){
        this.$router.push({name:'partRuleCreate',query:{index:0}})
      },

      /*================== View ==================*/
      handleView(data){
        this.$router.push({name:'partRuleView', query: {data: data}})
      },
      /*================== Edit ==================*/
      handleEdit(data){
        this.$router.push({name:'partRuleCreate',query: {index: 1, data: data}})
      },
      /*================== Delete ==================*/
      handleDelete(id){
        this.$confirm('Are you sure to delete?', 'Tips', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          partRuleDelete(id).then((res) => {
            if (res.data[0].MessageCode == ERR_OK) {
              this.list();
              this.$message({
                type: 'success',
                message: 'Successfully deleted'
              });
            }else {
              this.$message({
                type: 'error',
                message:res.data[0].Message
              })
            }
          })
        }).catch(() => {});
      }
    }
  }
</script>


