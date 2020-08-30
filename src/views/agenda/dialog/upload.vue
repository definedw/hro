<template>
  <div>
    <el-dialog title="办理回复"
               :visible="show"
               @close="$emit('close')"
               :close-on-click-modal="false">
      <div class="page-form">
        <el-form ref="ruleForm"
                 :model="ruleForm">
          <el-form-item label="办理描述"
                        prop="content"
                        :rules="{required: true, message: '请填写办理描述', trigger: 'blur'}">
            <el-input v-model="ruleForm.content"
                      clearable
                      type="textarea"
                      maxlength="2000"
                      placeholder="请添加描述"></el-input>
          </el-form-item>
          <el-form-item label="上传文件">
            <el-upload ref="upload"
                       class="upload-file"
                       :data="{questionId: id,file: files,content: ruleForm.content}"
                       :auto-upload="false"
                       :action="`handlessssss`"
                       :file-list="fileList"
                       :limit="10"
                       :with-credentials="true"
                       accept=".jped,.jpg,.png"
                       multiple
                       :http-request="handleUpload"
                       :on-change="onChange"
                       :on-error="handleError"
                       :on-success="handleSuccess"
                       :on-remove="handleRemove"
                       :on-exceed="handleExceed"
                       :before-upload="handleBeforeUpload">
              <el-button size="small"
                         type="primary">选择文件</el-button>
              <div slot="tip"
                   class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过2MB</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="$emit('close')">取消</el-button>
        <el-button type="primary"
                   @click="modifySubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'upload',
  props: ['id', 'visible'],
  data() {
    return {
      show: this.visible,
      ruleForm: {},
      fileList: [],
      files: []
    }
  },
  methods: {
    handleExceed(files, fileList) {
      if (files && files.length > 10) {
        this.$message.error('一次选择的文件超过10个.')
      }
    },
    handleBeforeUpload(file, fileList) {
      console.log('Before upload.', fileList)
      let isExceed = Math.floor(file.size / 1024 / 1024) > 2
      if (isExceed) {
        this.$message.error('文件超过 2MB.请重新选择.')
        return Promise.reject({})
        // this.$refs.upload.abort(file)
      } else {
        return Promise.resolve()
      }
    },
    handleSuccess(res, file, fileList) {
      if (res.code !== 0) {
        return Promise.reject({ code: res.code, msg: res.msg }).then(() => {
        }).catch(err => {
          file.status = 'fail'
          this.$message.error(`${msg}`)
        })
      } else {
        return Promise.resolve({ code: res.code, msg: res.msg, list: res.list }).then(res => {
          console.log('Handle Success.', res)
          this.$message.success(`${res.msg}`)
          this.$emit('close', this.show)
          this.$emit('handleUpdate', true)
        })
      }
    },
    onChange(file, fileList) {
      console.log(file, fileList)
      this.files = fileList.map(v => {
        return v.raw
      })
    },
    handleUpload(raw) {
      console.log('raw', raw)
      this.files.push(raw.file)
    },
    handleError(file) {
      console.log('File Upload Faild.')
      this.$message.error(`Upload Faild.`)
    },
    handlePreview() {

    },
    handleRemove() {
      console.log('remove')
    },
    modifySubmit() {
      if (!window.FileReader) {
        this.$message.info('您的浏览器版本较低，暂不支持文件上传，建议您升级浏览器或者更换浏览器后重试！')
      }
      if (!this.ruleForm.content) {
        this.$message.error('请填写办理描述后提交')
        return
      } else {
        this.$refs.upload.submit()
        let fd = new FormData(),
          url = `/api/questionRecord/saveQuestion`
        fd.append('questionId', this.id)
        fd.append('content', this.ruleForm.content)
        this.files.forEach(file => {
          fd.append('file', file)
        })
        this.$http.post(url, fd).then(res => {
          console.log('Handle Upload', res)
          this.$message.success(`${res.msg}`)
          this.$emit('close', this.show)
          this.$emit('handleUpdate', true)
        }).catch(err => {
          console.log('Upload Faild.')
        })
      }
    }
  },
  watch: {
    show(val) {
      this.show = val
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-file {
  position: relative;
  padding-top: 20px;
  button {
    margin-bottom: 5px;
  }
  &::before {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1;
    content: '';
    height: 0;
    border-bottom: solid 1px #d6d6d6;
    transform-origin: 0 100%;
    transform: scaleY(1);
  }
}
</style>
