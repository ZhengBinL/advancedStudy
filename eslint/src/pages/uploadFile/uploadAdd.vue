<template>
  <div>
    <h2 class="bread-crumb">Upload New File</h2>
    <div class="formbox w50 mg0">
      <el-form size="small" onsubmit="return false;" label-width="120px">
        <el-form-item label="Select File:">
          <el-upload
            ref="upload"
            :action="uploadUrl"
            :limit="maxNum"
            :data="param"
            :on-success="certificateSuccess"
            :on-error="certificateError"
            :on-exceed="handleExceed"
            :on-remove="handleRemove"
            :on-change="handleChange"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" plain size="small" type="primary">Browse File</el-button>
            <div slot="tip" class="el-upload__tip">Max Size {{maxVal}}MB</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="handelCancel">Cancel</el-button>
          <el-button type="primary" @click="submitUpload">Upload</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { ERR_OK, apiUrl, apiUpload, formatDateTime } from '@/axios/common/common'
  import { excelAdd } from '@/axios/upload'

  export default {
    data () {
      return {
        form: {},
        maxNum: 1,  // 上传文件最多个数
        maxVal: 4, // 上传文件最大值
        uploadUrl: '',
        param: {
          user: 'xx',
          accesstoken: 'xx'
        },
        fileList: []
      }
    },
    mounted(){
      this.uploadUrl = apiUrl + apiUpload;
    },
    methods: {
      /*================== 上传 ==================*/
      submitUpload() {
        if (this.fileList.length == 0){
          this.$message({
            type: 'warning',
            message: 'Please choose a file'
          });
          return
        }
        if (this.fileList[0].size > 1024*1024*this.maxVal){
          this.$message.warning('Max Size '+this.maxVal+'MB');
          return
        }
        this.$refs.upload.submit();
      },
      /*================== 移除文件 ==================*/
      handleRemove(file, fileList) {
        this.fileList = [];
      },
      /*================== 文件个数超出 ==================*/
      handleExceed(files, fileList) {
        this.$message.warning('Only one file can be uploaded at a time');
      },
      /*================== 文件发生改变 ==================*/
      handleChange(file,fileList){
        this.fileList = fileList;
        //console.log(fileList,'handleChange')
      },
      /*================== 上传成功 ==================*/
      certificateSuccess(res, file){
        //console.log(res,'res')
        //console.log(file.raw,'file')
        if (res[0].MessageCode == ERR_OK){
          let fileData = file.raw;
          let _form = {};
          _form.FileName = res[0].Message;
          _form.DisplayName = fileData.name;
          _form.UploadUser = this.param.user;
          _form.UploadTime = formatDateTime(fileData.lastModified);
          //console.log(_form,'form')
          excelAdd(_form).then((res) => {
            if (res.data[0].MessageCode == ERR_OK) {
              this.handelCancel();
              this.$message({
                type: 'success',
                message: 'Successfully upload'
              });
            }else {
              this.$message({
                type: 'error',
                message:res.data[0].Message
              })
            }
          })
        }
      },
      /*================== 上传失败 ==================*/
      certificateError(err, file, fileList){
        this.$message({
          type: 'error',
          message:err
        })
      },
      /*================== Cancel ==================*/
      handelCancel(){
        this.$router.go(-1);
      }
    }
  }
</script>

