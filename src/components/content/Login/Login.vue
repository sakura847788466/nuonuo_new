<template>
  <el-dialog title="得实云打印开票系统" :close-on-click-modal="false" :close-on-press-escape="false" :lock-scroll="true"
             :visible.sync="dialogFormVisible" :show-close="false" width="360px" top="240px">

    <div class="tab">
      <span class="login-text" :class="{isActive:activeNames==='login'}" @click="tab('login')">登录</span>
      <span class="point">.</span>
      <span class="register-text" :class="{isActive:activeNames==='register'}" @click="tab('register')">注册</span>
    </div>
    <div class="login-box" v-show="activeNames==='login'" @keyup.enter="goLogin">
      <div class="login-item">
        <el-input prefix-icon="el-icon-user" v-model.trim="login.userMobile" placeholder="请输入手机号" clearable/>
      </div>
      <div class="login-item">
        <el-input prefix-icon="el-icon-lock" v-model.trim="login.passWord" placeholder="请输入密码" show-password
                  clearable/>
      </div>
      <div class="login-footer">
        <el-button plain type="primary" style="width: 100%" @click="goLogin" v-throttle>登录</el-button>
        <!--<div class="login-info">-->
        <!--&lt;!&ndash;<el-checkbox>记住密码</el-checkbox>&ndash;&gt;-->
        <!--<el-button type="text">忘记密码？</el-button>-->
        <!--</div>-->
      </div>
      <div class="login-order">
        <p class="order-text">其他登录方式</p>
        <div class="order-btn-box">
          <el-button type="info" icon="el-icon-message" circle size="small" title="短信登录"></el-button>
          <!--<el-button type="success" icon="el-icon-check" circle size="small"></el-button>-->
        </div>
      </div>
    </div>
    <div class="register-box" v-show="activeNames==='register'" @keyup.enter="goRegister">
      <div class="login-item">
        <el-input prefix-icon="el-icon-user" v-model.trim="register.userMobile" placeholder="请输入手机号" clearable/>
      </div>
      <div class="login-item">
        <el-input prefix-icon="el-icon-lock" show-password v-model.trim="register.passWord" placeholder="请输入密码"
                  clearable/>
      </div>
      <div class="login-item">
        <el-input prefix-icon="el-icon-lock" show-password v-model.trim="register.againPassword" placeholder="请再次输入密码"
                  clearable/>
      </div>
      <div class="login-item ">
        <el-input prefix-icon="el-icon-message" v-model="register.code" placeholder="请输入验证码"
                  show-word-limit maxlength="6"
                  clearable>
          <el-button slot="append" @click="getCode" :disabled="computedTime!==0" v-throttle>
            {{computedTime>0?`${computedTime}s`:'验证码'}}
          </el-button>
        </el-input>
      </div>
      <div class="login-footer">
        <el-button plain type="danger" style="width: 100%" @click="goRegister" v-throttle>注册</el-button>
        <div style="padding: 10px"></div>
        <!--<div class="login-info">-->
        <!--<el-checkbox>记住密码</el-checkbox>-->
        <!--<el-button type="text">忘记密码？</el-button>-->
        <!--</div>-->
      </div>
    </div>

  </el-dialog>


</template>

<script>
  import {mapActions} from 'vuex'

  import {getSendSMS, checkSendSMS} from "../../../api/login";
  import {messageMinxins} from '../../../mixins'
  import {verificationPhone, verificationPassword, generateBsse64} from '../../../util/tool'


  export default {
    name: "Login",
    mounted() {
      // if (this.isShow) {
      //   document.body.style.overflow = 'auto'
      // } else {
      //   document.body.style.overflow = 'hidden'
      // }
    },
    data() {
      return {
        dialogFormVisible: true,
        login: {
          userMobile: '13686035300',
          passWord: '123456...',
        },
        register: {
          code: '',
          userMobile: '',
          passWord: '',
          againPassword: ''
        },
        computedTime: 0,//验证码时间
      }
    },
    methods: {
      ...mapActions(['goToLogin', 'goToRegister']),
      //点击关闭
      close() {
        this.$emit('close')
      },
      //进行切换登录注册切换
      tab(type) {
        this.$emit("editActiveNames", type)
      },
      //点击登录按钮
      goLogin() {
        if (this.venLogin(this.login)) {
          const data = generateBsse64(this.login)
          this.goToLogin({data})
            .then(res => {
              this.myMessage('success', res.data)
            })
            .catch(err=>{
              this.myMessage('error', err.data)
            })
        }

      },
      //验证登录
      venLogin(data) {
        const {userMobile, passWord} = data
        if (userMobile && passWord) {
          if (!verificationPhone(userMobile)) {
            this.myMessage('error', '请输入检查手机号')
            return false
          }
          if (!verificationPassword(passWord)) {
            this.myMessage('error', '请输入8-16位的字符，必须包含两种组合：字母，数字，特殊符号')
            return false
          }
        } else {
          this.myMessage('error', '请输入手机号和密码')
          return false
        }
        return true
      },
      //点击注册
     async goRegister() {
        const {userMobile, passWord} = this.register
        //1.验证用户信息是否正确
        const isRegister = this.venRegister('register')
        if (isRegister) {
          //2.验证验证码是否正确
          const isCheckCode = await this.checkCode(this.register)
          if (isCheckCode) {
            //转base64
            const data = generateBsse64({userMobile, passWord})
            this.goToRegister({data})
              .then(res => {
                this.myMessage('success', res.data)
              })
              .catch(err => {
                this.myMessage('error', err.data)
              })
          } else {
            this.myMessage('error', '验证码不正确')
          }

        }

      },
      //验证注册
      venRegister(type) {
        const {code, userMobile, passWord, againPassword} = this.register
        if (userMobile && passWord && againPassword) {
          if (!verificationPhone(userMobile)) {
            this.myMessage('error', '请输入检查手机号')
            return false
          }
          if (!verificationPassword(passWord)) {
            this.myMessage('error', '请输入8-16位的字符，必须包含两种组合：字母，数字，特殊符号')
            return false
          }
          if (passWord !== againPassword) {
            this.myMessage('error', '请检查确认密码，两次密码不一致')
            return false
          }
        } else {
          this.myMessage('error', '请检查输入，不能为空')
          return false
        }

        if (type === 'register') {
          if (code.length != 6) {
            this.myMessage('error', '请检查验证码')
            return false
          }
        }
        return true
      },
      //获取验证码
      async getCode() {
        //1.验证注册信息
        const isGetCode = this.venRegister('getCode')
        if (!isGetCode) {
          return
        }
        //2.生成发送验证码信息
        const {userMobile} = this.register
        const phoneInfo = {
          "templateId": "143707",
          "autograph": "得实云打印开票系统",
          "params": ["账号注册"],
          phone: userMobile
        }
        //3.生成倒计时
        this.computedTime = 30
        const intervalId = setInterval(() => {
          this.computedTime--
          if (this.computedTime <= 0) {
            //停止计时
            clearInterval(intervalId)
          }
        }, 1000);

        //4.发送验证码
        try {
          //发送ajax(向指定手机号发送)
          const result = await getSendSMS(phoneInfo)
          // 显示提示
          if (result.code == 0) {
            this.myMessage('success', '发送成功')
          } else {
            this.myMessage('error', '发送失败')
          }
        } catch (e) {
          this.myMessage('error', '验证次数已用完')
        }
      },

      //验证验证码是否是正确
      async checkCode(data) {
        let flag = true
        const {userMobile, code} = data
        const codeInfo = {
          mobile: userMobile,
          verifcationCode: code
        }
        try {
          const result = await checkSendSMS(codeInfo)
          if (result.code != 0) {
            flag = false
          }
        } catch (e) {
          flag = false
        }
        return flag
      }
    },
    components: {},
    mixins: [messageMinxins],
    props: {
      isShow: {
        type: Boolean,
      },
      activeNames: {
        type: String,
        default: 'login'
      }
    },
    watch: {
      // isShow(val) {
      //   if (val) {
      //     document.body.style.overflow = 'auto'
      //   } else {
      //     document.body.style.overflow = 'hidden'
      //   }
      // }
    }

  }
</script>

<style scoped>
  /*切换登录注册样式 开始*/
  .tab {
    margin-top: -30px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
  }

  .login-text, .register-text {
    padding: 10px;
  }

  .login-text:hover, .register-text:hover {
    color: lightcoral;
    cursor: pointer;
    border-bottom: 2px solid lightcoral;
  }

  .isActive {
    color: lightcoral;
    border-bottom: 2px solid lightcoral;
  }

  .point {
    position: relative;
    top: -5px;
    margin: 0 10px;
    font-size: 40px;
    line-height: 30px
  }

  /*切换登录注册样式 结束*/

  /*登录输入框开始*/
  .login-box, .register-box {
    margin: 30px auto 0;
    width: 240px;
  }

  .login-item {
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 30px;
  }

  .login-footer {
    margin-top: 10px;
  }

  .login-info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .login-order {
    margin-top: 20px;
  }

  .order-text {
    padding-bottom: 10px;
    text-align: center;
    font-size: 16px;
    border-bottom: 1px solid #ddd;
  }

  .order-btn-box {
    margin-top: 10px;
    text-align: center;
  }

  /*登录输入框结束*/
</style>