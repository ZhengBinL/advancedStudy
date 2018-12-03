<template>
  <div class="table-box">
    <div class="table-set">
      <h2 class="form-title">Data List Master Role</h2>
      <div class="main-opt"><el-button type="success" size="small" class="btn-add" @click="goAdd">Create</el-button></div>
      <el-table :data="tableList" border stripe size="small" style="width: 100%">
        <el-table-column type="index" width="50" align="center" label="NO"></el-table-column>
        <el-table-column prop="RoleName" label="Role Name" min-width="50" show-overflow-tooltip></el-table-column>
        <el-table-column prop="CreateTime" label="Create Time" min-width="50" show-overflow-tooltip></el-table-column>
        <el-table-column label="Action" width="254">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="warning" size="mini">Edit</el-button>
            <el-button @click="handleDelete(scope.row.RoleID)" type="danger" size="mini">Delete</el-button>
            <el-button @click="handleView(scope.row.RoleID)" type="primary" size="mini">Privilege</el-button>
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
  import { ERR_OK, arrIndex } from '@/axios/common/common'
  import { roleList, roleDelete } from '@/axios/role';

  export default {
    data () {
      return {
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
      tableList: function() {
        return this.tableData.slice(
          (this.resData.currentPage - 1) * this.resData.pageSize,
          this.resData.currentPage * this.resData.pageSize
        );
      }
    },
    methods: {
      /*================== 分页数据 ==================*/
      metaData(){
        return {
          currentPage: 1,
          pageSize: 20,
        }
      },
      /*================== 获取列表数据 ==================*/
      list(){
        roleList(this.resData).then((res) => {
          if (res.data[0].MessageCode == ERR_OK) {
            this.tableData = res.data[arrIndex];
            this.totalCount = res.data[0].TotalCount;
          }
        })
      },
      /*================== 删除 ==================*/
      handleDelete(id){
        this.$confirm('Are you sure to delete?', 'Tips', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          roleDelete(id).then((res) => {
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
      },
      /*================== create ==================*/
      goAdd(){
        this.$router.push({
          name: 'roleAdd',
          query: { index: 0}
        })
      },
      /*================== Edit ==================*/
      handleEdit(data){
        this.$router.push({name: 'roleAdd',
          query: { index: 1, data: data }
        })
      },
      /*================== 权限 ==================*/
      handleView(id){
        this.$router.push({
          name: 'rolePrivilege',
          query: {id: id}
        })
      }
    }
  }
</script>
