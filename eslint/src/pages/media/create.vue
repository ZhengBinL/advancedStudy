<template>
  <div>
    <h2 class="bread-crumb">Upload Part Images</h2>
    <div class="formbox w50 mg0">
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="uploadUrl"
        :on-success="certificateSuccess"
        :on-error="certificateError"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :file-list="fileList"
        :beforeUpload="beforeAvatarUpload">
        <el-button slot="trigger" size="small" type="primary">Browse File</el-button>
        <div slot="tip" class="el-upload__tip">Max.Size 4MB</div>
      </el-upload>
      <el-button size="small" @click="handelCancel">Back</el-button>
      <el-button style="margin-top: 50px;" size="small" type="success" @click="submitUpload">Upload</el-button>
    </div>
  </div>
</template>

<script>
  import { ERR_OK, apiUrl, apiMedia, formatDateTime } from '@/axios/common/common'
  import { mediaAdd, mediaUpload } from '@/axios/media';

  export default {
    data () {
      return {
        title:'',
        imgs: [],
        arr: [],
        param: {
          user: localStorage.getItem('userInfo'),
          accesstoken: localStorage.getItem('accessInfo')
        },
        uploadUrl: '',
        fileList: [],
        queryIndex:''//判断新增或编辑
      }
    },
    mounted(){
      this.uploadUrl = apiUrl + apiMedia;
      this.queryIndex=this.$route.query.index;

      if(this.queryIndex==1){
        this.title="Edit"
        let _data = {}
        _data.name = this.$route.query.data.DisplayName;
        _data.url = this.$route.query.data.ImagePath;
        this.fileList.push(_data)
        //console.log(this.$route.query.data)
      }else{
        this.title="Create"
      }
    },
    methods: {
      /*================== Cancel ==================*/
      handelCancel() {
        this.$router.push({
          name: 'media'
        })
      },
      /*================== Save ==================*/
      submitUpload() {
        if (this.fileList.length == 0){
          this.$message({
            type: 'warning',
            message: 'Please choose a picture'
          });
          return
        }
        mediaAdd(this.imgs).then((res) => {
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

//        this.$refs.upload.submit();
      },
      /*================== 移除某一文件 ==================*/
      handleRemove(file, fileList) {
        //console.log(fileList);
        this.fileList = fileList;
      },
      /*================== 上传成功 ==================*/
      certificateSuccess(res, file){
        //console.log(res,'res')
        //console.log(file.raw,'file')
        if (res[0].MessageCode == ERR_OK){
          let fileData = file.raw;
          let _form = {};
          _form.ImageName = res[0].Message;
          _form.DisplayName = fileData.name;
          _form.UploadUser = localStorage.getItem('userInfo');
          _form.UploadTime = formatDateTime(fileData.lastModified);
          this.imgs.push(_form);
        }
        //console.log(this.imgs,'_form')
      },
      /*================== 上传失败 ==================*/
      certificateError(err, file, fileList){
        this.$message({
          type: 'error',
          message:err
        })
      },
      /*================== 文件发生改变 ==================*/
      handleChange(file,fileList){
        //console.log(file)
        //console.log(fileList)
        this.fileList = fileList;
//        console.log(this.fileList,'this.fileList')
//        this.imgs = [];
//        this.fileList.forEach((item) => {
//          if (item.percentage == 100){
//            let _form = {}
//            _form.ImageName = item.response[0].Message;
//            _form.DisplayName = item.name;
//            _form.UploadUser = localStorage.getItem('userInfo');
//            _form.UploadTime = formatDateTime(item.raw.lastModified);
//            this.imgs.push(_form)
//          }
//        })
      },
      beforeAvatarUpload(file) {//文件大小限制/只能是图片
        var testimg=file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = testimg === 'jpg'
        const extension2 = testimg === 'png'
        const extension3 = testimg === 'gif'
        const isLt2M = file.size / 1024 /1024 < 4;
        if(!extension && !extension2 && !extension3) {
          this.$message({
            message: '上传图片只能是 jpg、png、gif 格式!',
            type: 'warning'
          });
        }
        if (!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 4MB!',
            type: 'warning'
          });
        }
        return extension||extension2||extension3&&isLt2M
      }
    }
  }
</script>


