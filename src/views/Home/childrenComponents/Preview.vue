<template>
  <el-dialog title="发票预览" width="900px" :visible.sync="isPreview">
    <div class="img-box">
      <img class="img" v-if="url" :src="url" alt="发票预览图片"/>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isPreview = false">取 消</el-button>
      <el-button type="primary" @click="onPinter">打 印</el-button>
    </div>
  </el-dialog>
</template>

<script>

  export default {
    name: "Preview",
    mounted(){

    },
    data() {
      return {
        isPreview:false
      }
    },
    methods: {
      onPinter(){
        this.$emit('print')
      }
    },
    components: {},
    props: {
      url : {
        type : String,
        required : true,
      }
    },


  }
</script>

<style scoped>
  .img-box{
    position: relative;
    width: 100%;
    height: 500px;
    background-color: #666;
    border-radius: 4px;
  }
  .img{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    padding: 10px 30px;
    width: 500px;
    height: 800px;
    transform: rotate(90deg);
  }
</style>