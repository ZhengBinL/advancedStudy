<template>
  <div class="table-box">
    <div class="formbox">
      <el-form :model="form" :inline="true" size="small" onsubmit="return false;">
        <el-row :gutter="0">
          <el-col class="inpbox">
            <el-form-item>
              <el-input class="industry-inp" v-model="form.ImageName" placeholder="File Name"></el-input>
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
      <h2 class="form-title">List File</h2>
      <div class="main-opt"><el-button type="success" size="small" class="btn-add" @click="goAdd">Create</el-button></div>
      <el-table :data="tableData" border stripe size="small" style="width: 100%">
        <el-table-column type="index" width="50" align="center" label="NO."></el-table-column>
        <el-table-column label="Image" width="200" align="center">
          <template slot-scope="scope">
            <img :src="imgPath + scope.row.ImageName" class="media-img">
          </template>
        </el-table-column>
        <el-table-column prop="DisplayName" label="File Name" show-overflow-tooltip></el-table-column>
        <el-table-column label="Action" width="160">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="warning" size="mini">Edit</el-button>
            <el-button @click="handleDelete(scope.row.ImageID)" type="danger" size="mini">Delete</el-button>
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
  import { ERR_OK, arrIndex, apiUrl, imgUrl } from '@/axios/common/common'
  import { mediaList, mediaDelete } from '@/axios/media';

  export default {
    data () {
      return {
        form: {},
        resData: this.metaData(),
        imgPath: '',
        // 列表数据
        tableData: [
          {
            image: '',
            filename: 'part_name1.jpg',
            status:false
          }
        ],
        totalCount: 0, // 总条数
      }
    },
    mounted(){
      this.list();
      this.imgPath = imgUrl;
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
        mediaList(this.form,this.resData).then((res) => {
          if (res.data[0].MessageCode == ERR_OK) {
            this.tableData = res.data[arrIndex];
            this.totalCount = res.data[0].TotalCount;
          }
        })
      },
      /*================== 添加 ==================*/
      goAdd(){
        this.$router.push({name:'mediaCreate',query:{index:0}})
      },
      /*================== Search ==================*/
//      search(){
//        console.log('search')
//      },
      // /*================== View ==================*/
      // handleView(){
      //   this.$router.push({name:'installationView'})
      // },
      /*================== Edit ==================*/
      handleEdit(data){
        this.$router.push({name:'mediaCreate',query:{index:1, data: data}})
      },
      /*================== Delete ==================*/
      handleDelete(id){
        this.$confirm('Are you sure to delete?', 'Tips', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          mediaDelete(id).then((res) => {
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
<style lang="scss" scoped>
  .media-img{
    width: 60px;
    height: 36px;
  }
</style>

