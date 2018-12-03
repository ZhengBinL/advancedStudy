<template>
  <div class="table-box">
    <div class="formbox">
      <el-form :model="form" :inline="true" size="small" onsubmit="return false;">
        <el-row :gutter="0">
          <el-col class="inpbox">
            <el-form-item label="">
              <el-input class="industry-inp"  v-model="form.FunctionName" placeholder="Function" @keyup.enter.native="search"></el-input>
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
      <h2 class="form-title">Data List Function Part</h2>
      <div class="main-opt"><el-button type="success" size="small" class="btn-add" @click="goAdd">Create</el-button></div>
      <el-table :data="tableList" border stripe size="small" style="width: 100%">
        <el-table-column type="index" width="50" align="center" label="NO."></el-table-column>
        <el-table-column prop="FunctionName" label="Function" min-width="40" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Description" label="Description" min-width="50" show-overflow-tooltip></el-table-column>
        <el-table-column label="Action" width="234">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="primary" size="mini">View</el-button>
            <el-button @click="handleEdit(scope.row)" type="warning" size="mini">Edit</el-button>
            <el-button @click="handleDelete(scope.row.FunctionID)" type="danger" size="mini">Delete</el-button>
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
  import {functionList, functionDelete} from '@/axios/function.js'

  export default {
    data () {
      return {
        form: {
          FunctionName: ''
        },
        resData: this.metaData(),
        // 列表数据
        tableData: [],
        totalCount: 0, // 总条数
      }
    },
    mounted(){
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
      /*================== 获取列表数据 ==================*/
      list(){
        functionList(this.form).then((res) => {
          if(res.data[0].MessageCode == ERR_OK){
            this.tableData = res.data[arrIndex];
            this.totalCount = res.data[0].TotalCount;
          }
        })
      },
      /*================== 添加 ==================*/
      goAdd(){
        this.$router.push({name:'functionCreate',query:{index:0}})
      },
      /*================== View ==================*/
      handleView(data){
        this.$router.push({name:'functionView',query:{data: data}})
      },
      /*================== Edit ==================*/
      handleEdit(data){
        this.$router.push({name:'functionCreate',query:{index:1, data: data}})
      },
      /*================== Delete ==================*/
      handleDelete(id){
        this.$confirm('Are you sure to delete?', 'Tips', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          functionDelete(id).then((res) => {
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

