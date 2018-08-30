import Vue from 'util/vueExt'
import { Component } from 'vue-property-decorator'
import * as Template from './editor.vue'
import * as Quill from 'quill'    // 引入编辑器

const STATICDOMAIN = '//ss.yidejia.com/'
const STATVIDEO = '//flv.yidejia.com/'

@Component({
  mixins: [Template]
})
export default class Editor extends Vue {
  content = ''    // 文章内容
  editorOption = {}    // 编辑器选项
  addRange: any = new Array()
  uploadData = {}
  photoUrl = ''         // 上传图片地址
  uploadType = ''    // 上传的文件类型（图片、视频）
  fullscreenLoading = false

  $refs: {
    myQuillEditor: any,
    imgInput: any
  }

  get nowLength() {
    return this.content.length
  }

  get SurplusLength() {   // 计算属性 获得当前输入字符长度
    let num = 10000 - Number(this.content.length)
    if (num > 0) {
      return num
    } else {
      return 0
    }
  }

  // 上传七牛的actiond地址
  get qnLocation() {
    if (location.protocol === 'http:') {
      return 'http://up-z0.qiniu.com'
    }
    return 'https://up-z0.qbox.me'
  }

  // 图片上传前获得数据token数据
  qnUpload(file) {
    this.fullscreenLoading = true
    const suffix = file.name.split('.')
    const ext = suffix.splice(suffix.length - 1, 1)[0]
    console.log(this.uploadType)
    if (this.uploadType === 'image') {  // 如果是点击插入图片
      return this.api.getQNToken().then(res => {
        this.uploadData = {
          key: `image/${suffix.join('.')}_${new Date().getTime()}.${ext}`,
          token: res
        }
      })
    } else if (this.uploadType === 'video') {  // 如果是点击插入视频
      return this.api.getVideoQNToken().then(res => {
        this.uploadData = {
          key: `video/${suffix.join('.')}_${new Date().getTime()}.${ext}`,
          token: res
        }
      })
    }
  }

  // 图片上传之前调取的函数
  beforeUpload(file) {
    return this.qnUpload(file)
  }

  // 图片上传成功回调   插入到编辑器中
  upScuccess(e, file, fileList) {
    this.fullscreenLoading = false
    let vm = this
    let url = ''
    if (this.uploadType === 'image') {    // 获得文件上传后的URL地址
      url = STATICDOMAIN + e.key
    } else if (this.uploadType === 'video') {
      url = STATVIDEO + e.key
    }
    if (url != null && url.length > 0) {  // 将文件上传后的URL地址插入到编辑器文本中
      let value = url
      vm.addRange = vm.$refs.myQuillEditor.quill.getSelection()
      value = value.indexOf('http') !== -1 ? value : 'http:' + value
      vm.$refs.myQuillEditor.quill.insertEmbed(vm.addRange !== null ? vm.addRange.index : 0, vm.uploadType, value, Quill.sources.USER)   // 调用编辑器的 insertEmbed 方法，插入URL
    } else {
      (<any>this).$message.error(`${vm.uploadType}插入失败`)
    }
    this.$refs['upload'].clearFiles()    // 插入成功后清除input的内容
  }

  // 点击图片ICON触发事件
  imgHandler(state) {
    this.addRange = this.$refs.myQuillEditor.quill.getSelection()
    if (state) {
      let fileInput = document.getElementById('imgInput')
      fileInput.click() // 加一个触发事件
    }
    this.uploadType = 'image'
  }

  // 点击视频ICON触发事件
  videoHandler(state) {
    this.addRange = this.$refs.myQuillEditor.quill.getSelection()
    if (state) {
      let fileInput = document.getElementById('imgInput')
      fileInput.click() // 加一个触发事件
    }
    this.uploadType = 'video'
  }

  // 编辑器光标离开 将编辑器内容发射给父组件
  onEditorBlur(editor) {
    this.$emit('getValue', this.content)
  }

  // 编辑器获得光标
  onEditorFocus(editor) {
    editor.enable(true)   // 实现达到上限字符可删除
  }

  // 编辑器文本发生变化
  onEditorChange({ editor, html, text }) {
    let textLength = text.length
    if (textLength > 10000) {
      (<any>this).$message.error('最多输入10000个字符')
      editor.enable(false)
    }
    this.$emit('getValue', this.content)
  }

  // 清除编辑器内容
  callMethod() {
    this.content = ''
  }

  // 页面加载后执行 为编辑器的图片图标和视频图标绑定点击事件
  mounted() {
    // 为图片ICON绑定事件  getModule 为编辑器的内部属性
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
    this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('video', this.videoHandler)  // 为视频ICON绑定事件
  }
}
