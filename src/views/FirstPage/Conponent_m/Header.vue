<template>
  <div class="warp">
    <div class="bind-printer"
         v-if="isPrinter">
      <p class="title">
        <span>我的打印机</span>
        <span>
          <i class="el-icon-more-outline more bind-more"
             @click="togglePrinter"
             style="margin-right:7px;"></i>
          <img :src="aaaa?require('../../../assets/img/toTop.png'):require('../../../assets/img/toBut.png')"
               alt=""
               @click="isShow"
               style="margin-bottom:5px;">
        </span>

      </p>
      <collapse-transition>
        <div class="collapse-wrap"
             v-show="aaaa">
          <slot>
            <div class="printer-Info">
              <span>当前打印机：</span>
              <div class="printer-Info-box">
                <p class="printer-Info-item">
                  <i class="el-icon-printer"
                     style="font-size: 24px;color: #f5f5f5;"></i>：
                  <span v-if="printerValue">{{printerValue.model||'null'}}</span></p>
                <p class="printer-Info-item">
                  <i class="el-icon-tickets"
                     style="font-size: 24px;color: #f5f5f5;"></i>：
                  <span v-if="printerValue">{{printerValue.number||'number为空'}}</span></p>
              </div>
            </div>
            <div class="printer-insert">
              <el-input v-model.trim="number"
                        style="margin-right:10px;width: 64%;"
                        maxlength="16"
                        size="small"
                        laceholder="请输入打印机编号"
                        clearable />
              <el-button type="danger"
                         size="small"
                         @click="bindPrintNumber"
                         plain
                         v-throttle>绑定</el-button>
            </div>
          </slot>
        </div>
      </collapse-transition>

    </div>
    <div class="bind-printer toggle-printer"
         v-if="!isPrinter">
      <p class="title">
        <span>选择打印机</span>
        <i class="el-icon-more-outline more toggle-more"
           @click="togglePrinter"></i>
      </p>
      <div class="toggle-printer-Info">
        <div class="toggle-Info-item"
             :class="{isActive:index==activeIndex}"
             v-for="(item,index) in  printerList"
             :key="index"
             @click="selectPrint(index)">
          <i class="el-icon-printer"
             style="font-size: 20px;color: #f5f5f5;"></i>&nbsp;
          <span>{{item.number}}</span>
        </div>
      </div>
      <div class="toggle-printer-footer">
        <el-button size="mini"
                   @click="deletePrinter"
                   type="danger"
                   plain>删除</el-button>
        <el-button size="mini"
                   @click="confirm"
                   type="primary"
                   plain>选中</el-button>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'

import { findNumberInfo, insertNumber, deleteNumber, updateNumber } from '../../../api/bindPrinter'
import { messageMinxins } from '../../../mixins'
import { generateBsse64, verificationNumber } from '../../../util/tool'
import CollapseTransition from '../../../plugins/plane'


export default {
  name: "Header",
  mounted () {
    if (this.isUser) {
      this.getPrinterValue()
    }

  },
  data () {
    return {
      isPrinter: true,
      /*printerList: [//绑定打印机列表
        {number: '0005BF7350022B00', isActive: false, model: 'DL-300'},
        {number: '0061BF7350023701', isActive: true, model: 'DL-300'},
        {number: '0061BF7350023702', isActive: false, model: 'DL-300'},
        {number: '0061BF7350023703', isActive: false, model: 'DL-300'},
        {number: '0061BF7350023704', isActive: false, model: 'DL-300'},
      ],*/
      printerList: [],
      number: '',
      activeIndex: 0,
      aaaa: true
    }
  },
  methods: {
    ...mapMutations(['SET_ORDERINFO', 'LOGIN_OUT']),
    //初始化打印机
    isShow () {
      this.aaaa = !this.aaaa
    },
    getPrinterValue () {
      const { userId, Authorization } = this
      const data = generateBsse64({ userId })
      findNumberInfo({ data, Authorization })
        .then(res => {
          if (res.data.length > 0) {
            this.printerList = res.data
            for (let i = 0; i < this.printerList.length; i++) {
              if (this.printerList[i].isActive) {
                this.activeIndex = i
              }
              this.printerList[i].index = i
            }
          } else {
            this.myMessage('error', '打印机为空，请绑定打印机')
          }
        })
        .catch(err => {
          if (err.code == 1501 || err.code == 1502) {
            this.$alert(`操作超时，请重新登陆?`, '提示', {
              confirmButtonText: '确定',
              type: 'error',
              callback: () => {
                this.myMessage('success', '退出成功')
                this.LOGIN_OUT()
                // location.reload();
              }
            })
            return
          }
          this.myMessage('error', err.data)
        })

    },

    //切换打印机
    togglePrinter () {
      if (this.printerList.length < 1) {
        this.myMessage("error", "请绑定打印机")
        return
      }
      this.isPrinter = !this.isPrinter
    },
    //选择选中的打印机
    selectPrint (index) {
      this.activeIndex = index
    },
    //取消选中的打印机
    cancel () {
      this.isPrinter = !this.isPrinter
      for (let item of this.printerList) {
        if (item.isActive) {
          this.activeIndex = item.index
        }
      }
    },
    //选中选择的打印机
    async confirm () {
      //1.判断选中的number是否是为true
      const i = this.activeIndex
      const isActive = this.printerList[i].isActive
      if (!isActive) {
        //2.远程数据更新
        const { userId, Authorization } = this
        const _id = this.printerList[i]._id
        const data = generateBsse64({ userId, _id, isActive: true })
        //2.1修改选中的number为true
        const result = await updateNumber({ data, Authorization })
        if (result.code == 0) {
          //3.本地进行数据更新
          for (let item of this.printerList) {
            item.isActive = false
          }
          this.printerList[i].isActive = true
          this.SET_ORDERINFO({ type: 'number', number: this.printerValue.number })
          this.myMessage('success', '切换默认打印机成功')
          //4.关闭切换打印机的页面
          this.isPrinter = !this.isPrinter
        } else {
          this.myMessage('error', '切换默认打印机失败')
        }
      } else {
        this.myMessage("error", "当前的number已经选中了")
      }

    },
    //绑定打印机
    bindPrintNumber () {
      if (!verificationNumber(this.number)) {
        this.myMessage('error', '请输入正确的打印机编号')
        return
      } else {
        const { userId, Authorization, number } = this
        const data = generateBsse64({ userId, number })
        insertNumber({ data, Authorization })
          .then((res) => {
            this.printerList.push(res.data)
            this.myMessage('success', '绑定成功')
          })
          .catch(err => {
            this.myMessage('error', err.data)
          })
      }

    },
    //删除打印机
    deletePrinter () {
      const { userId, Authorization } = this
      const i = this.activeIndex
      const printerInfo = this.printerList[i]
      const _id = printerInfo._id
      const data = generateBsse64({ userId, _id })

      this.$confirm(`此操作将${printerInfo.number}删除, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteNumber({ data, Authorization })
          .then(() => {
            this.myMessage("success", "删除成功")
            this.printerList.splice(i, 1)
            //如果最后一条数据被删除，就直接关闭切换打印机页面
            if (this.printerList.length < 1) {
              this.isPrinter = !this.isPrinter
            }

          })
          .catch(err => {
            this.myMessage("error", err.data)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    async toggleNumber (i) {
      //2.远程数据更新
      const { userId, Authorization } = this
      const _id = this.printerList[i]._id
      const data = generateBsse64({ userId, _id, isActive: true })
      //2.1修改选中的number为true
      const result = await updateNumber({ data, Authorization })
      if (result.code == 0) {
        //3.本地进行数据更新
        for (let item of this.printerList) {
          item.isActive = false
        }
        this.printerList[i].isActive = true
        this.SET_ORDERINFO({ type: 'number', number: this.printerValue.number })

      }
    },
  },
  computed: {
    ...mapState(['orderInfo', 'user', 'isUser']),
    userId () {
      return this.user.data._id
    },
    Authorization () {
      return this.user.Authorization
    },
    printerValue () {
      let print = null
      if (this.printerList.length > 0) {
        for (let item of this.printerList) {
          if (item.isActive) {
            print = item
          }
        }
      }
      return print
    }
  },
  watch: {
    //监听vuex里的number
    'orderInfo.number' (number) {
      //1.当number存在时
      if (number) {
        //2.在this.printerList循环找出属于number的项
        for (let item of this.printerList) {
          if (item.number === number && !item.isActive) {
            const i = item.index
            this.toggleNumber(i)
          }
        }
      }
    },
    isUser (value) {
      if (value) {
        this.getPrinterValue()
      }
    }
  },
  components: { CollapseTransition },
  props: {},
  mixins: [messageMinxins]
}
</script>

<style scoped>
.warp {
  width: 100%;
  grid-area: 1 / 1 / 2 / 3;
}

.bind-printer {
  padding: 15px;
  /* height: 266px; */
  background-color: #ff8a8a;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  transition: 0.3s;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.more {
  font-size: 24px;
  color: #f5f5f5;
  cursor: pointer;
  transition: 0.3s;
}

.toggle-more:hover {
  background-color: #ff9999;
  cursor: pointer;
  border-radius: 50%;
}

.bind-more:hover {
  background-color: #4d4d4d;
  cursor: pointer;
  border-radius: 50%;
}

.printer-Info {
  display: flex;
  margin-top: 5px;
  padding-top: 5px;
  height: 143px;
  font-size: 16px;
  border-top: 1px solid #f8f8f8;
}

.printer-Info-box {
  margin-top: 10px;
  width: 250px;
  height: 80px;
}

.printer-Info-item {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.printer-insert {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.toggle-printer {
  background-color: #333333;
}

.toggle-printer-Info {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 5px;
  padding-top: 5px;
  height: 143px;
  font-size: 16px;
  border-top: 1px solid #f8f8f8;
  overflow: auto;
}

.toggle-printer-Info::-webkit-scrollbar {
  width: 6px;
  height: 20px;
  background-color: #333;
}

/*定义滚动条轨道
  内阴影+圆角*/
.toggle-printer-Info::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 10px #333333;
  border-radius: 6px;
  background-color: #ffffff;
}

.toggle-Info-item {
  margin: 5px 10px;
  height: 20px;
  cursor: pointer;
}

.toggle-Info-item:hover {
  color: #f09999;
}

.isActive {
  color: #f09999;
}

.toggle-printer-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
  border-top: 1px solid #f8f8f8;
}
</style>