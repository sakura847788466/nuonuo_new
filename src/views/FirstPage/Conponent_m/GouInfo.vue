<template>
  <!-- 购票方信息 -->
  <div class="warp">
    <div class="box invoice-box">
      <p style="display:flex;justify-content: space-between;align-item:center;">购票方信息 <img :src="bbbb?require('../../../assets/img/toTop.png'):require('../../../assets/img/toBut.png')"
             alt=""
             @click="isShow"
             style="height:10px;"></p>

      <collapse-transition>
        <div class="collapse-wrap"
             v-show="bbbb">
          <slot>
            <p style="margin-top: 5px;"
               class="title">发票信息</p>
            <div class="content">
              <div class="content-msg">
                <div class="item">
                  <span class="msg-title">购票方名称:</span>
                  <el-input max-length="100"
                            size="small"
                            clearable
                            v-model.trim="order.buyerName">
                  </el-input>
                  <img src="../../../assets/img/xingxing.png"
                       alt=""
                       style="height:100%;">
                </div>
                <div class="item">
                  <span class="msg-title">购票方税号:</span>
                  <el-input max-length="100"
                            size="small"
                            clearable
                            v-model.trim="order.buyerTaxNum ">
                  </el-input>
                  <img src="../../../assets/img/xingxing.png"
                       alt=""
                       style="height:100%;">
                </div>
              </div>
              <div class="content-msg">
                <div class="item">
                  <span class="msg-title">购票方电话:</span>
                  <el-input max-length="100"
                            size="small"
                            clearable
                            v-model.trim="order.buyerTel">
                  </el-input>
                  <img src="../../../assets/img/xingxing.png"
                       alt=""
                       style="height:100%;">
                </div>
                <div class="item">
                  <span class="msg-title">购票方手机:</span>
                  <el-input max-length="100"
                            size="small"
                            clearable
                            v-model.trim="order.buyerPhone">
                  </el-input>
                  <img src="../../../assets/img/xingxing.png"
                       alt=""
                       style="height:100%;">
                </div>
              </div>
              <div class="content-msg">
                <div class="item">
                  <span class="msg-title">购票方地址:</span>
                  <el-input max-length="100"
                            size="small"
                            clearable
                            v-model.trim="order.buyerAddress">
                  </el-input>
                  <img src="../../../assets/img/xingxing.png"
                       alt=""
                       style="height:100%;">
                </div>
                <div class="item"
                     style="flex:1;">
                  <span class="msg-title">开户银行号:</span>
                  <el-input max-length="100"
                            size="small"
                            clearable
                            v-model.trim="order.buyerAccount ">
                  </el-input>
                  <img src="../../../assets/img/xingxing.png"
                       alt=""
                       style="height:100%;">
                </div>
              </div>
            </div>
            <div class="footer">
              <address class="footer-text">

              </address>
              <div class="bottom_r"
                   style="display:flex;line-height:36px;">
                <img src="../../../assets/img/sign.png"
                     alt=""
                     style="margin-top:10px;margin-left:6px;height: 16px;width: 16px;margin-right: 10px;">
                <p style="font-size:10px; margin-right: 10px;">点击微信开票，将开启微信发票信息填充，会把上面数据覆盖</p>
                <el-button type="warning"
                           size="small"
                           @click="wxPrint"
                           v-throttle
                           plain>
                  {{ws?'已开启微信开票':'开启微信开票'}}
                </el-button>
              </div>

            </div>
            <ShopInfo />
          </slot>
        </div>
      </collapse-transition>
    </div>

  </div>
</template>

<script>
import { WS } from '../../../api'
import { mapMutations } from 'vuex'
import CollapseTransition from '../../../plugins/plane'
import ShopInfo from "../../Home/childrenComponents/ShopInfo";



export default {
  name: "Invoice",
  data () {
    return {
      order: {
        "buyerTel": "",
        "listFlag": "0",
        "pushMode": "1",
        "buyerAddress": "",
        "buyerTaxNum": "",
        "invoiceType": "1",
        "invoiceLine": "p",
        "email": "846722718@qq.com",
        "buyerName": "",
        "buyerPhone": "",
        "buyerAccount": "",
        "productOilFlag": "0",
        "proxyInvoiceFlag": "0",
        "userId": '4ed208ef1ea14466828bc915abb4dfc4'
      },
      bbbb: false,
      invoiceLine: [
        { value: 's', label: '专用发票' },
        { value: 'p', label: '普通发票(电票)' },
        { value: 'c', label: '普通发票(纸票)' },
        { value: 'e', label: '收购发票(电票)' },
        { value: 'f', label: '收购发票(纸票)' },
      ],
      pushMode: [
        { value: '-1', label: '不推送' },
        { value: '0', label: '邮箱' },
        { value: '1', label: '手机(默认)' },
        { value: '2', label: '邮箱、手机' },
      ],
      wxUrl: '',
      ws: null
    }
  },
  methods: {
    ...mapMutations(['SET_ORDERINFO']),
    wxPrint () {
      if (this.ws) {
        return
      }
      this.wxUrl = WS + '/websocket/nnpayment'
      this.$confirm('是否开启微信开票?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.websocket(this.wxUrl)
      }).catch(() => {
        this.$notify({
          title: '信息',
          message: '已取消，开启微信开票',
          type: 'info',
          position: 'top-left',
          offset: 50
        });
      });

    },
    isShow () {
      this.bbbb = !this.bbbb
    },
    //连接websocket
    websocket (url) {

      let that = this
      if ('WebSocket' in window) {
        this.ws = new WebSocket(url);
      }
      else {
        alert('Not support websocket')
      }

      this.ws.onerror = function () {
        that.$notify({
          title: '失败',
          message: '微信开票开启失败',
          type: 'error',
          position: 'top-left',
          offset: 50
        });
        that.ws = null;
      };

      this.ws.onopen = function () {
        that.$notify({
          title: '成功',
          message: '微信开票开启成功，请在打印机展示二维码',
          type: 'success',
          position: 'top-left',
          offset: 50
        });
      }

      this.ws.onmessage = function (event) {
        that.createInfo(event.data)
      }


      this.ws.onclose = function () {
        // setMessageInnerHTML("close");
      }

      window.onbeforeunload = function () {
        this.ws.close();
      }


    },
    //把微信返回数据放置在order
    createInfo (eventData) {
      const data = JSON.parse(eventData)
      if (data.errcode === 0) {
        this.order.buyerAddress = data.addr
        this.order.buyerName = data.title
        this.order.buyerTaxNum = data.tax_no
        this.order.buyerPhone = data.phone
        this.order.buyerAccount = data.bank_no + ' ' + data.bank_type
        const number = { type: 'number', number: data.number }
        this.SET_ORDERINFO(number)
        this.$notify({
          title: '成功',
          message: '微信开票信息，已准备完成，请生成该发票！',
          type: 'success',
          position: 'top-left',
          offset: 50
        });
      } else {
        this.$notify({
          title: '失败',
          message: '微信开票开启失败',
          type: 'error',
          position: 'top-left',
          offset: 50
        });
      }

    }
  },
  components: { CollapseTransition, ShopInfo },
  props: {}

}
</script>

<style scoped>
.warp {
  grid-area: 1 / 3 / 5 / 6;
  width: 100%;
}
img {
  margin-top: 10px;
  margin-left: 6px;
}
.box {
  padding: 17px;
  /* color: #ffffff; */
  font-size: 18px;
  font-weight: 700;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.invoice-box {
  /* height: 430px; */
  background-color: #ffffff;
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
  padding: 14px;
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
  padding: 10px;
  border-top: 1px solid #dddddd;
}

.footer-text {
  width: 50%;
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
</style>