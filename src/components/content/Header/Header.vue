<template>
  <div class="header"
       :class="{isFiexd:!isUser}">
    <header>
      <img src="../../../assets/img/logo.png"
           alt=""
           class="logo_img">
      <div class="logo">得实云打印开票系统</div>
      <ul class="nav">
        <!--<li :class="{active:isCurrent('/home')}" @click="goTo('/home')">首页</li>-->
        <!--<li :class="{active:isCurrent('/wx')}" @click="goTo('wx')">微信开票</li>-->
      </ul>
      <div class="login"
           v-if="!isUser">
        <el-button type="danger"
                   size="small"
                   @click="login('register')">注册</el-button>
        <el-button type="primary"
                   size="small"
                   @click="login('login')">登录</el-button>
      </div>
      <div class="login"
           v-else>
        <el-button type="danger"
                   icon="el-icon-user-solid"
                   @click="isShowUser=!isShowUser"
                   size="small"
                   :title="user.data.userMobile"
                   circle
                   plain />
        <span class="userName">{{user.data.userMobile}}</span>
        <span class="set_ada"><img src="../../../assets/img/set.png"
               style="margin-right: 8px;"
               alt="">修改信息</span>
        <span class="back_ada"
              @click="loginOut"><img src="../../../assets/img/back.png"
               style="margin-right: 8px;"
               alt="">退出系统</span>
        <div v-show="isShowUser">
          <ul class="popover">
            <li><a href="">修改信息</a></li>
            <li><a @click="loginOut">退出登录</a></li>
            <li><a @click="comeBack">返回首页</a></li>
          </ul>
          <div class="modal"
               @click="isShowUser=!isShowUser"></div>
        </div>
      </div>
    </header>
    <Login v-if="!isUser"
           @editActiveNames="editActiveNames"
           :activeNames="activeNames" />
  </div>
</template>

<script>
import { messageMinxins } from '../../../mixins'
import { mapState, mapMutations } from 'vuex'
import Login from "../Login/Login";

export default {
  name: "Header",
  mounted () {
    this.IS_LOGIN()
  },
  data () {
    return {
      isShowLogin: false,
      activeNames: 'login',
      isShowUser: false,//
      dialogVisible: false
    }
  },
  methods: {
    ...mapMutations(['LOGIN_OUT', 'IS_LOGIN']),
    handleClose () { },
    goTo (path) {
      this.$router.push(path)
    },
    isCurrent (path) {
      return this.$route.path === path
    },
    //点击显示登录
    login (type) {
      this.isShowLogin = true
      this.activeNames = type
    },
    //点击退出登录
    loginOut () {
      this.isShowUser = false
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.myMessage('success', '退出成功！')
        this.LOGIN_OUT()
      })
    },
    //监听login的关闭事件
    close () {
      this.isShowLogin = false
    },
    //监听login的切换事件
    editActiveNames (type) {
      this.activeNames = type
    },
    // ada
    comeBack () {
      this.$router.push({ path: '/firstPage' })
    }
  },
  computed: {
    ...mapState(['user', 'isUser']),
  },
  components: { Login },
  props: {},
  mixins: [messageMinxins]
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /*height: 55px;*/
  background-color: #5c77deff;
  border-bottom: 1px solid #dddddd;
  box-shadow: 0 2px 5px #dddddd;
  z-index: 1;
}
.isFiexd {
  position: static;
}
header {
  display: flex;
  margin: 0 auto;
  padding-left: 20px;
  width: 90%;
  line-height: 55px;
}

.logo {
  font-family: Arial !important;
  font-size: 24px;
  color: #ffffff;
}

.nav {
  display: flex;
  align-items: center;
  margin-left: 100px;
  font-size: 16px;
  color: #f09999;
}

.nav li {
  margin-right: 10px;
  padding-bottom: 2px;
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}

.nav li:hover {
  border-bottom: 2px solid lightcoral;
  color: lightcoral;
}

.active {
  border-bottom: 2px solid lightcoral;
  color: lightcoral;
}

.login {
  position: relative;
  margin-left: auto;
  font-size: 14px;
  color: #fff;
}

/*登录成功 开始*/
/*模态框*/
.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgb(255, 255, 255);
  opacity: 0;
  background-size: 100% 100%;
}

.popover {
  position: absolute;
  /*display: none;*/
  top: 30px;
  left: 36px;
  width: 100px;
  height: 100px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #f8f8f8;
  z-index: 1;
}

.popover li {
  width: 100%;
  line-height: 30px;
}

.popover li a {
  display: inline-block;
  width: 100%;
  text-align: center;
}

.popover li a:hover {
  color: lightcoral;
  background-color: #fff;
}

.userName {
  height: 20px;
  line-height: 20px;
  display: inline-block;
  width: 130px;
  text-align: center;
  border-right: 1px solid #000;
  margin-right: 24px;
}
.set_ada,
.back_ada {
  height: 20px;
  display: inline-block;
  line-height: 20px;
  text-align: center;
  margin-right: 20px;
  cursor: pointer;
}
.logo_img {
  display: inline-block;
  height: 40px;
  width: 40px;
  line-height: 50px;
  margin-top: 9px;
  margin-right: 10px;
}
/*.isPopover:hover + .popover {*/
/*display: block;*/
/*}*/

/*.popover:hover {*/
/*display: block;*/
/*}*/

/*登录成功 结束*/
</style>