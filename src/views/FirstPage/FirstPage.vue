<template>
  <el-container>
    <el-container>
      <el-aside width="249px"
                style="position:fixed;">
        <el-col :span="12">
          <el-menu default-active="1"
                   class="el-menu-vertical-demo"
                   @select="handleOpen"
                   background-color="#ffffff"
                   text-color="#303133"
                   active-text-color="#409EFF">
            <el-menu-item index="1">
              <i class="el-icon-s-fold"></i>
              <span slot="title">主页</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">打印机</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-s-custom"></i>
              <span slot="title">销售方信息</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-s-custom"></i>
              <span slot="title">购票方信息</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-menu"></i>
              <span slot="title">其他信息</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>

      <el-main style="margin-left:249px;">
        <!-- main -->
        <div class="item first">
          <div class="printShm">
            <Header />
            <!-- 打印机组件 -->
          </div>
          <div class="shopInfo">
            <Invoice />
          </div>
        </div>
        <div class="item">
          <GouInfo />
        </div>
        <div class="item">
          <ImportInfo />
        </div>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import DirectPrint from "../Home/childrenComponents/DirectPrint";
import Header from "./Conponent_m/Header";
import Invoice from "./Conponent_m/Invoice";
import ShopInfo from "../Home/childrenComponents/ShopInfo";
import Preview from "../Home/childrenComponents/Preview";
import CollapseTransition from '../../plugins/plane.js'
import GouInfo from "./Conponent_m/GouInfo";
import ImportInfo from "./Conponent_m/ImportInfo";



export default {
  name: 'firstPage',
  data () {
    return {
      activeNames: ['0'],
      isActive: false,
      active: '0',
    }
  },
  mounted () {


  },
  destroy () {

  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    isShow () {
      this.isActive = !this.isActive
    },

  },
  components: { DirectPrint, Header, Invoice, ShopInfo, Preview, CollapseTransition, GouInfo, ImportInfo }
}
</script>
<style >
.el-icon-arrow-down {
  display: none;
}
.el-collapse-item__header {
  height: 57px;
}
</style>
<style scoped>
.el-container {
  margin-top: 27.5px;
}
.el-col {
  width: 249px;
}
.el-menu {
  height: 1479px;
}

/* main */

.item {
  /* height: 57px; */
  width: 100%;
  margin-bottom: 20px;
}
.first {
  display: flex;
  justify-content: space-between;
}

.printShm {
  flex: 1.5;
  height: 100%;
  /* border: 1px solid #a9a5a5;
  background-color: #fff;
  line-height: 57px; */
}
.shopInfo {
  flex: 2;
  height: 100%;
  margin-left: 40px;
}
</style>