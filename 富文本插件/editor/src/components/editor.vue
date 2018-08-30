<template>
  <div>
    <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
  </div>
</template>

<script>
import {quillEditor} from 'vue-quill-editor'; // 导入quillEditor组件
export default {
  data: function () {
    return {
      content: 'this is a simple demo',                // 编辑器的内容
      editorOption: {             // 编辑器的配置
        // something config
      }
    }
  },
  components: {
    quillEditor                 // 声明组件quillEditor
  }
}
</script>

<style lang="css">
/* .quill-editor {
  height: 745px;

  .ql-container {
    height: 680px;
  }
}

.limit {
  height: 30px;
  border: 1px solid #ccc;
  line-height: 30px;
  text-align: right;

  span {
    color: #ee2a7b;
  }
}

.ql-snow .ql-editor img {
  max-width: 480px;
}

.ql-editor .ql-video {
  max-width: 480px;
} */
</style>
