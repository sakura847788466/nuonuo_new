<template>
  <!-- 销售方信息 -->
  <div class="warp">
    <div class="box invoice-box">
      <p class="title">销售方信息 <img :src="bbbb?require('../../../assets/img/toTop.png'):require('../../../assets/img/toBut.png')"
             alt=""
             @click="isShow"
             style="height:10px;"></p>
      <collapse-transition>
        <div class="collapse-wrap"
             v-show="bbbb">
          <slot>
            <div class="content">
              <div class="content-msg">
                <div class="item">
                  <span class="msg-title">收 款 人 :</span>
                  <el-input max-length="100"
                            size="small"
                            clearable
                            v-model.trim="order.payee ">
                  </el-input>
                </div>
                <div class="item">
                  <span class="msg-title">开 票 人 :</span>
                  <el-input max-length="100"
                            size="small"
                            clearable
                            v-model.trim="order.clerk">
                  </el-input>
                </div>
                <div class="item">
                  <span class="msg-title">复 核 人 :</span>
                  <el-input max-length="100"
                            size="small"
                            clearable
                            v-model.trim="order.checker ">
                  </el-input>
                </div>
              </div>
              <div class="content-msg">
                <div class="item">
                  <span class="msg-title">开户银行:</span>
                  <el-input max-length="100"
                            size="small"
                            clearable
                            v-model.trim="order.salerAccount ">
                  </el-input>
                </div>
                <div class="item">
                  <span class="msg-title">银行账号:</span>
                  <el-input max-length="100"
                            size="small"
                            clearable
                            v-model.trim="order.salerAccount">
                  </el-input>
                </div>
                <div class="item">
                  <span class="msg-title">销方税号:</span>
                  <el-input max-length="100"
                            size="small"
                            clearable
                            v-model.trim="order.salerTaxNum">
                  </el-input>
                </div>
              </div>
              <div class="content-msg">
                <div class="item">
                  <span class="msg-title">销方电话:</span>
                  <el-input max-length="100"
                            size="small"
                            clearable
                            v-model.trim="order.salerTel ">
                  </el-input>
                </div>
                <div class="item"
                     style="flex:2;">
                  <span class="msg-title">销方地址:</span>
                  <el-input max-length="100"
                            size="small"
                            clearable
                            v-model.trim="order.salerAddress ">
                  </el-input>
                </div>
              </div>
            </div>
            <div class="footer">
              <address class="footer-text"
                       style="width:75%;height:20px;">

              </address>
              <el-button type="warning"
                         size="small"
                         @click="editOrder(order)"
                         v-throttle
                         plain>
                修改信息
              </el-button>
              <el-button type="warning"
                         size="small"
                         v-throttle
                         plain
                         @click="isOtherInfo=!isOtherInfo">
                选择修改信息
              </el-button>
            </div>
          </slot>
        </div>
      </collapse-transition>
      <!-- 修改信息 -->
      <el-dialog title="修改发票信息"
                 :visible.sync="isEditOtherInfo"
                 width="800px">
        <el-form :model="editOrderInfo"
                 :rules="rules"
                 ref="editOrderInfo"
                 label-width="180px">
          <el-form-item label="销方税号"
                        prop="salerTaxNum">
            <el-input v-model.trim="editOrderInfo.salerTaxNum"
                      autocomplete="off"
                      maxlength="20"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="销方电话"
                        prop="salerTel">
            <el-input v-model.trim="editOrderInfo.salerTel"
                      autocomplete="off"
                      maxlength="20"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="销方地址"
                        prop="salerAddress">
            <el-input v-model.trim="editOrderInfo.salerAddress"
                      autocomplete="off"
                      maxlength="100"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="银行账号及开户行地址"
                        prop="salerAccount">
            <el-input v-model="editOrderInfo.salerAccount"
                      autocomplete="off"
                      placeholder="请用空格隔开两个信息"
                      maxlength="100"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="收款人"
                        prop="payee">
            <el-input v-model.trim="editOrderInfo.payee"
                      autocomplete="off"
                      maxlength="8"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="复核人"
                        prop="checker">
            <el-input v-model.trim="editOrderInfo.checker"
                      autocomplete="off"
                      maxlength="8"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="开票人"
                        prop="clerk">
            <el-input v-model.trim="editOrderInfo.clerk"
                      autocomplete="off"
                      maxlength="8"
                      show-word-limit></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="cancel"
                     v-throttle>恢复默认</el-button>
          <el-button type="primary"
                     @click="confirm(editOrderInfo.index)">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 切换信息 -->
      <el-dialog title="切换发票信息"
                 :visible.sync="isOtherInfo"
                 width="800px">
        <div class="dialog-body">
          <div class="dialog-body-content"
               :class="{active:item.isActive}"
               v-for="(item,index) in orderArr"
               :key="index">
            <el-row class="content-item">
              <el-col :span="14">
                <span>收款人：</span>
                <span>{{item.payee}}</span>
              </el-col>
              <el-col :span="10">
                <span>开票人：</span>
                <span>{{item.clerk}}</span>
              </el-col>
            </el-row>
            <el-row class="content-item">
              <el-col :span="18">
                <span class="item-title">税号</span>：
                <span>{{item.salerTaxNum}}</span>
              </el-col>
            </el-row>
            <el-row class="content-item">
              <el-col :span="18">
                <span class="item-title">银行账号</span>：
                <span>{{item.salerAccount|bankNum}}</span>
              </el-col>
            </el-row>
            <el-row class="content-item">
              <el-col :span="18">
                <span class="item-title">开户银行</span>：
                <span>{{item.salerAccount|bankName}}</span>
              </el-col>
            </el-row>
            <el-row class="content-item">
              <el-col :span="20">
                <span class="item-title">地址</span>：
                <span>{{item.salerAddress}}</span>
              </el-col>
            </el-row>
            <el-row class="content-item">
              <el-col :span="12">
                <span>复核人</span>：
                <span>{{item.checker}}</span>
              </el-col>
              <el-col :span="12">
                <span>电话</span>：
                <span>{{item.salerTel}}</span>
              </el-col>
            </el-row>
            <div class="content-hide">
              <el-button type="warning"
                         @click="editOrder(item)">修改信息</el-button>
              <el-button type="danger"
                         @click="deleteOrder(index)"
                         v-if="!item.isActive">删除信息</el-button>
              <el-button type="primary"
                         @click="selectOrder(item)"
                         v-if="!item.isActive">确认选中</el-button>
            </div>
          </div>
        </div>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     @click="isAddOtherInfo = true">新增发票信息</el-button>
        </div>
      </el-dialog>
      <!-- 新增发票信息 -->
      <el-dialog title="增加发票信息"
                 :visible.sync="isAddOtherInfo"
                 width="800px">
        <el-form :model="addOrderInfo"
                 :rules="rules"
                 ref="addOrderInfo"
                 label-width="180px">
          <el-form-item label="销方税号"
                        prop="salerTaxNum">
            <el-input v-model.trim="addOrderInfo.salerTaxNum"
                      autocomplete="off"
                      maxlength="20"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="销方电话"
                        prop="salerTel">
            <el-input v-model.trim="addOrderInfo.salerTel"
                      autocomplete="off"
                      maxlength="20"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="销方地址"
                        prop="salerAddress">
            <el-input v-model.trim="addOrderInfo.salerAddress"
                      autocomplete="off"
                      maxlength="100"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="银行账号及开户行地址"
                        prop="salerAccount">
            <el-input v-model="addOrderInfo.salerAccount"
                      autocomplete="off"
                      placeholder="请用空格隔开两个信息"
                      maxlength="100"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="收款人"
                        prop="payee">
            <el-input v-model.trim="addOrderInfo.payee"
                      autocomplete="off"
                      maxlength="8"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="复核人"
                        prop="checker">
            <el-input v-model.trim="addOrderInfo.checker"
                      autocomplete="off"
                      maxlength="8"
                      show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="开票人"
                        prop="clerk">
            <el-input v-model.trim="addOrderInfo.clerk"
                      autocomplete="off"
                      maxlength="8"
                      show-word-limit></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     @click="addOrder(addOrderInfo)">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { WS } from '../../../api'
import { mapMutations } from 'vuex'
import CollapseTransition from '../../../plugins/plane'
import { mapState } from 'vuex'
import { messageMinxins } from '../../../mixins'
import { Base64 } from 'js-base64';
import { generateBsse64 } from '../../../util/tool'
import { findSalerInfo, insertSaler, deleteSaler, updateSaler } from '../../../api/drectPrint'



export default {
  name: "Invoice",
  mounted () {
    if (this.isUser) {
      this.getOrderItem()
    }
  },
  data () {
    return {
      isOtherInfo: false,
      isEditOtherInfo: false,
      isAddOtherInfo: false,
      remark: '请前往诺诺网(www.jss.com.cn)查询发票详情',
      orderArr: [],//保存销售方数组
      order: {},
      bbbb: false,
      editOrderInfo: {},//修改信息
      spareOrderInfo: {},//备份修改信息
      addOrderInfo: {
        checker: "李四",
        payee: "张三",
        clerk: "王五",
        salerAccount: "56564646445122211 工商银行",
        salerAddress: "广东省湛江市",
        salerTaxNum: "445546546546546",
        salerTel: "13692478981",
      },//新增发票信息
      rules: {
        salerTaxNum: [
          { required: true, message: '请输入纳税号', trigger: 'blur' },
        ],
        salerTel: [
          { required: true, message: '请输入电话号', trigger: 'blur' },
        ],
        salerAddress: [
          { required: true, message: '请输入地址', trigger: 'blur' },
        ],
        salerAccount: [
          { required: true, message: '请输入银行账号及开户行地址', trigger: 'blur' },
        ],
        payee: [
          { required: true, message: '请输入收款人', trigger: 'blur' },
        ],
        checker: [
          { required: true, message: '请输入复核人', trigger: 'blur' },
        ],
        clerk: [
          { required: true, message: '请输入开票人', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    isShow () {
      this.bbbb = !this.bbbb
    },
    getOrderItem () {
      const { userId, Authorization } = this
      const data = generateBsse64({ userId })
      findSalerInfo({ data, Authorization })
        .then(res => {
          if (res.data.length > 0) {
            this.orderArr = res.data
            for (let i = 0; i < this.orderArr.length; i++) {
              if (this.orderArr[i].isActive) {
                this.order = this.orderArr[i]
              }
              this.orderArr[i].index = i
            }
          } else {
            this.myMessage('error', '销售方信息为空，请添加信息')
          }
        })
        .catch(err => {
          this.myMessage('error', err.data)
        })


    },
    //点击修改信息
    editOrder (item) {
      this.isEditOtherInfo = true
      this.editOrderInfo = JSON.parse(JSON.stringify(item))
      this.spareOrderInfo = JSON.parse(JSON.stringify(item))
    },
    //选中修改信息
    selectOrder (order) {
      const { Authorization } = this
      order.isActive = true
      //1.2转换base64
      const data = Base64.encode(JSON.stringify({ ...order }))
      //1.3发送请求
      updateSaler({ data, Authorization })
        .then(() => {
          //1.4修改本地orderArr
          for (let item of this.orderArr) {
            item.isActive = false
          }
          order.isActive = true
          this.order = order
          this.myMessage('success', '切换成功')
        })
        .catch(() => {
          this.myMessage('error', '切换失败')
        })

    },
    cancel () {
      this.editOrderInfo = JSON.parse(JSON.stringify(this.spareOrderInfo))
    },
    //确认修改信息
    confirm (index) {
      //1.验证修改内容
      this.$refs.editOrderInfo.validate((valid) => {
        if (valid) {
          //1.1取出Authorization
          const { Authorization } = this
          //1.2转换base64
          const data = Base64.encode(JSON.stringify({ ...this.editOrderInfo }))
          //1.3发送请求
          updateSaler({ data, Authorization })
            .then(() => {
              //1.4请求成功，根据this.editOrderInfo.isActive是否修改order
              if (this.editOrderInfo.isActive) {
                this.order = this.editOrderInfo
              }
              //1.5更新数组里的值
              this.orderArr[index] = this.editOrderInfo
              this.myMessage('success', '修改成功')
              this.isEditOtherInfo = !this.isEditOtherInfo
            })
            .catch(() => {
              this.myMessage('error', '修改失败')
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //删除发票信息项
    deleteOrder (index) {
      const { userId, Authorization } = this
      const _id = this.orderArr[index]._id
      const data = Base64.encode(JSON.stringify({ _id, userId }))
      deleteSaler({ data, Authorization })
        .then(() => {
          this.orderArr.splice(index, 1)
          this.myMessage('success', '删除成功')
        })
        .catch(() => {
          this.myMessage('error', '删除失败')
        })
    },

    //新增发票信息项
    addOrder (saleInfo) {
      this.$refs.addOrderInfo.validate((valid) => {
        if (valid) {
          const { userId, Authorization } = this
          const data = Base64.encode(JSON.stringify({ ...saleInfo, userId }))
          insertSaler({ data, Authorization })
            .then(res => {
              this.orderArr.push(res.data)
              this.myMessage('success', '添加成功')
              this.isAddOtherInfo = false
            })
            .catch(() => {
              this.myMessage('error', '添加失败')
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },

    //使用测试销售方账号
    onTestOrder () {
      const data = {
        checker: "李四",
        payee: "张三",
        clerk: "王五",
        salerAccount: "56564646445122211 工商银行",
        salerAddress: "广东省湛江市",
        salerTaxNum: "339901999999142",
        salerTel: "13692478981",
        isActive: true,
        isTest: true
      }
      this.order = data
    }
  },
  computed: {
    ...mapState(['orderInfo', 'user', 'isUser']),
    userId () {
      return this.user.data._id
    },
    Authorization () {
      return this.user.Authorization
    },
  },
  watch: {
    isUser (value) {
      if (value) {
        this.getOrderItem()
      }
    }
  },
  filters: {
    bankName (value) {
      if (value) {
        const result = value.split(' ')
        return result[1]
      }
    },
    bankNum (value) {
      if (value) {
        const result = value.split(' ')
        return result[0]
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
  grid-area: 1 / 3 / 5 / 6;
  width: 100%;
}

.box {
  padding: 19px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.invoice-box {
  /* height: 430px; */
  background-color: #2196f3;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content {
  margin-top: 5px;
  border-top: 1px solid #dddddd;
}

.content-msg {
  display: flex;
  align-items: center;
  padding: 5px;
}
.item {
  display: flex;
  flex: 1;
}

.msg-title {
  /* margin-right: 10px; */
  width: 120px;
  line-height: 32px;
  font-size: 14px;
  text-align: center;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 0 10px;
  /* border-top: 1px solid #dddddd; */
}

.footer-text {
  width: 400px;
  line-height: 18px;
  font-size: 14px;
}

.weight-Info {
  margin-top: 20px;
  height: 210px;
  background-color: #ffffff;
  color: #333333;
}

.weight-msg {
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-top: 10px;
}

.weight-msg-item {
  flex: 1;
}

.weight-msg-title {
  width: 100px;
  font-size: 14px;
}

/* 切换信息中boy里面的内容 */
.other-box {
  padding: 10px;
  height: 450px;
  font-size: 18px;
  color: #333333;
  font-weight: 700;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: 0.3s;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.handle {
  color: #ff9999;
  font-size: 24px;
  cursor: pointer;
}

.content {
  position: relative;
  margin-top: 5px;
  width: 100%;
  padding: 5px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  border: 1px solid #dddddd;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.content-else {
  margin-top: 5px;
  width: 100%;
  height: 180px;
  padding: 5px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  border: 1px solid #dddddd;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.else-btn {
  margin-top: 50px;
  text-align: center;
}

.content-item {
  line-height: 24px;
}

.item-title {
  height: 24px;
  line-height: 24px;
  width: 70px;
  text-align: justify;
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
}

.item-title:after {
  content: " ";
  display: inline-block;
  width: 100%;
  height: 0px;
}

.content-hide {
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: 0.8s;
}

.content:hover .content-hide {
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-box {
  margin-top: 10px;
}

.text-content {
  margin-top: 10px;
}

.dialog-body {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 600px;
  overflow: auto;
}

.dialog-body-content {
  position: relative;
  margin: 5px;
  padding: 5px;
  width: 360px;
  height: 180px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  border: 1px solid #dddddd;
  cursor: pointer;
}

.dialog-body-content:hover .content-hide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.active {
  border: 1px solid #f08080;
}
</style>