<template>
  <div>
    <h2 class="bread-crumb">View Master Function Part</h2>
    <div class="formbox w50 mg0">
      <el-form :model="form" size="small" onsubmit="return false;" label-width="80px">
        <el-form-item label="Function:">
          <el-input class="industry-inp" type="textarea" v-model="form.FunctionName" placeholder="" disabled></el-input>
        </el-form-item>
        <el-form-item label="Description:">
          <el-input class="industry-inp" type="textarea" v-model="form.Description" placeholder="" :rows="5" disabled></el-input>
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
    data () {
      return {
        form: {}
      }
    },
    mounted(){
      this.form = this.$route.query.data;
    },
    methods: {
      /*================== Cancel ==================*/
      handelCancel(){
        window.history.back(-1)
      }
    }
  }
</script>

