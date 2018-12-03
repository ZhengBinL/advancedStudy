<template>
  <div class="table-box">
    <div class="formbox">
      <el-form :model="form" :inline="true" size="small" onsubmit="return false;">
        <el-row :gutter="0">
          <el-col class="inpbox">
            <el-form-item>
              <el-input class="industry-inp" v-model="form.RuleName" placeholder="Rule Name" @keyup.enter.native="search"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="inpbox">
            <el-form-item>
              <el-input class="industry-inp" v-model="form.Level" placeholder="Rule Level" @keyup.enter.native="search"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="inpbox">
            <el-form-item>
              <!-- <el-select v-model="form.Spec" placeholder="Select...">
                <el-option
                    v-for="item in form"
                    :key="item.Spec"
                    :label="item.SpecName"
                    :value="item.SpecName"
                    style="width: 180px"
                  >
                  </el-option>
              </el-select> -->
              <el-select v-model="form.Spec" placeholder="For">
                <el-option label="HS Rule" value="1"></el-option>
                <el-option label="Part Knowledge Rule" value="2"></el-option>
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
      <h2 class="form-title">Data List Master Rule Name</h2>
      <div class="main-opt"><el-button type="success" size="small" class="btn-add" @click="goAdd">Create</el-button></div>
      <el-table :data="tableList" border stripe size="small" style="width: 100%">
        <el-table-column type="index" width="50" align="center" label="NO"></el-table-column>
        <el-table-column prop="RuleName" label="Rule Name" min-width="50" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Level" label="Rule Level" min-width="50" show-overflow-tooltip></el-table-column>
        <el-table-column prop="SpecName" label="For" min-width="50" show-overflow-tooltip></el-table-column>
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
import { ruleNameList, ruleNameDel } from "@/axios/ruleName.js";
export default {
  data() {
    return {
      form: {},
      resData: this.metaData(),
      // 列表数据
      tableData: [],
      totalCount: 0 // 总条数
    };
  },
  mounted() {
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
    metaData() {
      return {
        currentPage: 1,
        pageSize: 25
      };
    },
    /*================== 获取列表数据 ==================*/
    list() {
      ruleNameList(this.form).then(res => {
        if (res.data[0].MessageCode == ERR_OK) {
          this.tableData = res.data[arrIndex];
          this.totalCount = res.data[0].TotalCount;
        }
      });
    },
    /*================== 添加 ==================*/
    goAdd() {
      this.$router.push({ name: "ruleNameCreate", query: { index: 0 } });
    },
    /*================== View ==================*/
    handleView(item) {
      this.$router.push({ name: "ruleNameView", query: { item: item } });
    },
    /*================== Edit ==================*/
    handleEdit(item) {
      this.$router.push({
        name: "ruleNameCreate",
        query: { index: 1, item: item }
      });
    },
    /*================== Delete ==================*/
    handleDelete(item) {
      this.$confirm("Are you sure to delete?", "Tips", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning"
      })
        .then(() => {
          ruleNameDel(item).then(res => {
            if (res.data[0].MessageCode == ERR_OK) {
              this.list();
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


