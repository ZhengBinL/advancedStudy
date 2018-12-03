<template>
  <div>
    <h2 class="bread-crumb">View Part Knowledge Rule</h2>
    <div class="formbox w50 mg0">
      <el-form :model="form" size="small" onsubmit="return false;" label-width="150px">
        <el-form-item label="Part No.Pattern:">
          <el-input class="industry-inp" v-model="form.PartPattern" placeholder="" disabled></el-input>
        </el-form-item>
        <el-form-item label="Rule Name:">
          <el-input class="industry-inp" v-model="form.RuleName" placeholder="" disabled></el-input>
        </el-form-item>
        <el-form-item label="Description:">
          <el-input class="industry-inp" type="textarea" v-model="form.Description" placeholder="" :rows="5"
                    disabled></el-input>
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
        form: {}
      }
    },
    mounted() {
      this.form = this.$route.query.data;
    },
    methods: {
      /*================== Cancel ==================*/
      handelCancel() {
        window.history.back(-1)
      }
    }
  }
</script>

