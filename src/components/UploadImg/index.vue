<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="upload"
    >
      <img v-if="value" :src="value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
      <el-progress v-if="isPShow" type="line" :percentage="percentage" class="progress" />
    </el-upload>
  </div>
</template>

<script>
// 第一步:下载包和获取秘钥
var COS = require('cos-js-sdk-v5')

// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
var cos = new COS({
  SecretId: 'AKIDvpaaP4Xq5C9viPxNek3DnC6Qlr17A9UL',
  SecretKey: '58Wck3OjN1b7nhcUwMgvxaDiKl4B6wd8'
})

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imageUrl: '',
      percentage: 0,
      isPShow: false
    }
  },
  methods: {
    async upload({ file }) {
      this.isPShow = !this.isPShow
      console.log(file)
      console.log(this.isPShow)
      // 第二步:调用腾讯云中的sdk方法实现将本地图片上传到疼腾讯云
      console.log(file.uid + '.' + file.name.split('.')[1])
      cos.uploadFile({
        Bucket: 'remember-1316386513', /* 填写自己的bucket，必须字段 存储桶的名字*/
        Region: 'ap-nanjing', /* 存储桶所在地域，必须字段, */
        // Key: '1.jpg', /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 文件名*/
        Key: file.uid + '.' + file.name.split('.')[1], /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 文件名不能写死,应该根据上传的图片的名字来定*/
        // Body: file, // 上传文件对象
        Body: file, // 上传文件对象,需要结构一下
        SliceSize: 1024 * 1024 * 5, /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
        onProgress: (progressData) => {
          console.log(JSON.stringify(progressData))
          this.percentage = progressData.loaded / progressData.total * 100
          // this.isPShow = false
        }
      }, (err, data) => {
        console.log(err, data)
        this.$emit('input', `https://${data.Location}`)
        if (err) {
          console.log('上传失败', err)
        } else {
          console.log('上传成功')
        }
      })
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file)
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isPNG) {
        this.$message.error('上传头像图片只能是 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isPNG && isLt2M
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
