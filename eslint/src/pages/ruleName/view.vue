<template>
  <div>
    <h2 class="bread-crumb">View Rule Name</h2>
    <div class="formbox w50 mg0">
      <el-form :model="form" size="small" onsubmit="return false;" label-width="150px">
        <el-form-item label="Rule Name:">
          <el-input class="industry-inp" v-model="form.RuleName" placeholder="" disabled></el-input>
        </el-form-item>
        <el-form-item label="Rule Level:">
          <el-input class="industry-inp" v-model="form.Level" placeholder="" disabled></el-input>
        </el-form-item>
        <el-form-item label="For:">
          <el-input class="industry-inp" v-model="form.SpecName" placeholder="" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handelCancel">Back</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {ERR_OK} from '@/axios/common/common'

  export default {
    data() {
      return {
        form: {},
        item:''//传过来的数据
      }
    },
    mounted() {
      this.item = this.$route.query.item;
      this.form = this.item
    },
    methods: {
      /*================== Cancel ==================*/
      handelCancel() {
        window.history.back(-1)
      }
    }
  }
</script>

