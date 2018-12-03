<template>
  <div class="table-box">
    <div class="formbox">
      <el-form :model="form" :inline="true" size="small" onsubmit="return false;">
        <el-row :gutter="0">
          <el-col class="inpbox">
            <el-form-item>
              <el-input class="industry-inp" v-model="form.FileName" placeholder="File Name" @keyup.enter.native="search"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="inpbox">
            <el-form-item>
              <el-date-picker
                v-model="form.UploadTimeS"
                type="date"
                placeholder="Start Date">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <!--<el-col class="inpbox"><div class="word">to</div></el-col>-->
          <el-col class="inpbox">
            <el-form-item>
              <el-date-picker
                v-model="form.UploadTimeE"
                type="date"
                placeholder="End Date">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="selectbox">
            <el-form-item>
              <el-select v-model="form.Approve" clearable placeholder="Status Approve">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in approveArr" :key="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="selectbox">
            <el-form-item>
              <el-select v-model="form.Download" clearable placeholder="Download">
                <el-option v-for="item in downloadArr"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
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
      <h2 class="form-title">Data List Uploaded File</h2>
      <div class="main-opt"><el-button type="success" size="small" class="btn-add" @click="goAdd">Upload New File</el-button></div>
      <el-table :data="tableData" border stripe size="small" style="width: 100%">
        <el-table-column type="index" width="50" align="center" label="NO."></el-table-column>
        <el-table-column prop="DisplayName" label="File Name" min-width="40" show-overflow-tooltip></el-table-column>
        <el-table-column prop="UploadTime" label="Updated Date" min-width="50" show-overflow-tooltip></el-table-column>
        <el-table-column label="Status Approve" min-width="50">
          <template slot-scope="scope">
            <div class="state-limit">
              <el-button type="warning" size="mini" plain v-if="scope.row.Approve==0">Waiting</el-button>
              <el-button type="success" size="mini" plain v-else-if="scope.row.Approve==1">Approved</el-button>
              <el-button type="primary" size="mini" plain v-else>Finished</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Download" width="100">
          <template slot-scope="scope" v-if="scope.row.Download==1">
            <div class="state-limit"><el-button type="primary" size="mini">Download</el-button></div>
          </template>
        </el-table-column>
        <el-table-column label="Total Data" min-width="40">
          <template slot-scope="scope" v-if="scope.row.Approve!=0">{{scope.row.TotalData}}</template>
        </el-table-column>
        <el-table-column label="Data Finish" min-width="40">
          <template slot-scope="scope" v-if="scope.row.Approve!=0">{{scope.row.FinishData}}</template>
        </el-table-column>
        <el-table-column label="Review Product Info" min-width="50">
          <template slot-scope="scope" v-if="scope.row.Approve!=0">{{scope.row.ReviewProduct}}</template>
        </el-table-column>
        <el-table-column label="Review HS" min-width="40">
          <template slot-scope="scope" v-if="scope.row.Approve!=0">{{scope.row.ReviewHS}}</template>
        </el-table-column>
        <el-table-column prop="message" label="Message" min-width="40" show-overflow-tooltip></el-table-column>
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
  import { requestList } from '@/axios/upload'

  export default {
    data () {
      return {
        form: {},
        approveArr: [
          {label: 'waiting', value: 0},
          {label: 'approved', value: 1},
          {label: 'finished', value: 2},
        ],
        downloadArr: [
          {label: 'yes', value: 1},
          {label: 'no', value: 0}
        ],
        resData: this.metaData(),
        // 列表数据
        tableData: [],
        totalCount: 0, // 总条数
      }
    },
    mounted(){
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
      /*================== 获取列表数据 ==================*/
      list(){
        requestList(this.form, this.resData).then((res) =>{
          if(res.data[0].MessageCode == ERR_OK){
            this.tableData = res.data[arrIndex];
            this.totalCount = res.data[0].TotalCount;
          }
        })
      },
      /*================== 添加 ==================*/
      goAdd(){
        this.$router.push({name:'uploadMonitorAdd'})
      }
    }
  }
</script>
