<template>
  <div>
    <h2 class="bread-crumb">View New HS Rule</h2>
    <div class="formbox">
      <el-form :model="form" size="small" onsubmit="return false;" >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Rule Name:">
              <el-input class="industry-inp" v-model="form.RuleName" placeholder="" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Part No. Patern:">
              <el-input class="industry-inp" v-model="form.PartPattern" placeholder="" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Material:">
              <el-input class="industry-inp" v-model="form.MaterialName" placeholder="" disabled></el-input>
              <!-- <el-select v-model="form.material" filterable clearable class="w100">
                <el-option v-for="item in materialArr"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Function:">
              <el-input class="industry-inp" v-model="form.FunctionName" placeholder="" disabled></el-input>
              <!-- <el-select v-model="form.partFunction" filterable clearable class="w100">
                <el-option v-for="item in partFunctionArr"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Installation:">
              <el-input class="industry-inp" v-model="form.InstallationName" placeholder="" disabled></el-input>
              <!-- <el-select v-model="form.installation" filterable clearable class="w100">
                <el-option v-for="item in installationArr"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="Description:">
              <el-input class="industry-inp" type="textarea" v-model="form.Description" placeholder="" :rows="5" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--List Master HS-->
        <div class="table-box">
          <h2 class="form-title">List Master HS</h2>
          <div class="formbox no-bdb no-marb">
            <el-form :model="knowledge" :inline="true" size="small" onsubmit="return false;">
              <el-row :gutter="0">
                <el-col class="inpbox">
                  <el-form-item label="HS No. :">
                    <el-input class="industry-inp" v-model="knowledge.HSNo" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="inpbox">
                  <el-form-item label="KUMHS:">
                    <el-input class="industry-inp" v-model="knowledge.Kumhs" placeholder=""></el-input>
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
            <el-table :data="tableData" border stripe size="small" style="width: 100%">
              <el-table-column type="selection" width="50" align="center" label=" "></el-table-column>
              <el-table-column type="index" width="50" align="center" label="NO."></el-table-column>
              <el-table-column prop="HSNo" label="HS No." min-width="40" show-overflow-tooltip></el-table-column>
              <el-table-column prop="Description" label="Description" min-width="50" show-overflow-tooltip></el-table-column>
              <el-table-column prop="Kumhs" label="KUMHS" min-width="50" show-overflow-tooltip></el-table-column>
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
import { ERR_OK, arrIndex } from "@/axios/common/common";
import { hsNoList } from "@/axios/hsNo.js";
export default {
  data() {
    return {
      title: "",
      form: {}, // 提交对象
      // select下拉框数组
      materialArr: [],
      partFunctionArr: [],
      installationArr: [],
      knowledge: {}, // knowledge rule查询条件
      query: {}, // partNo.查询条件
      // HS List列表数据
      tableData: [],
      resData: this.metaData(),
      totalCount: 0, // 总条数
      item: "" //传过来的数据
    };
  },
  mounted() {
    this.item = this.$route.query.item;
    this.form = this.item;
    this.list();
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
      //hsNo列表数据
      hsNoList(this.knowledge, this.resData).then(res => {
        if (res.data[0].MessageCode == ERR_OK) {
          this.tableData = res.data[arrIndex];
          this.totalCount = res.data[0].TotalCount;
        }
      });
    },
    /*================== Cancel ==================*/
    handelCancel() {
      window.history.back(-1);
    }
  }
};
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
