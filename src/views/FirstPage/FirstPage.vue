<template>
  <el-container>
    <el-container>
      <el-aside width="249px"
                style="position:fixed;">
        <el-col :span="12">
          <el-menu default-active="2"
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   @close="handleClose"
                   background-color="#ffffff"
                   text-color="#303133"
                   active-text-color="#409EFF">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-fold"></i>
                <span>主页</span>
              </template>
            </el-submenu>
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
    //监听滚动条滚动
    window.addEventListener('scroll', this.onScroll)
    console.log("监听滚动")

  },
  destroy () {
    // 在vue组件销毁的时候要移除事件监听
    window.removeEventListener('scroll', this.onScroll)
    console.log("移除")
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    handleChange (val) {
      console.log(val);
    },
    isShow () {
      this.isActive = !this.isActive
    },
    // 滚动监听器
    onScroll () {
      // 获取所有锚点元素
      const navContents = document.querySelectorAll('.el-main .item')
      // 所有锚点元素的 offsetTop
      const offsetTopArr = []
      navContents.forEach(item => {
        offsetTopArr.push(item.offsetTop)
      })
      // 获取当前文档流的 scrollTop
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 定义当前点亮的导航下标
      let navIndex = 0
      for (let n = 0; n < offsetTopArr.length; n++) {
        // 如果 scrollTop 大于等于第 n 个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
        // 那么此时导航索引就应该是 n 了
        if (scrollTop >= offsetTopArr[n]) {
          navIndex = n
        }
      }
      // 把下标赋值给 vue 的 data
      this.active = navIndex
    }
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