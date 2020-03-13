<template>
  <div class="warp">
    <div class="box invoice-box">
      <p class="title">请填写发票信息 <i class="el-icon-edit"
                                  style="font-size: 24px;"></i></p>
      <div class="content">
        <div class="content-msg">
          <span class="msg-title">购票方名称：</span>
          <el-input max-length="100" size="small" clearable
                    v-model.trim="order.buyerName ">
          </el-input>
        </div>
        <div class="content-msg">
          <span class="msg-title">购方税号：</span>
          <el-input max-length="20" size="small" clearable
                    v-model.trim="order.buyerTaxNum ">
          </el-input>
        </div>
        <div class="content-msg">
          <span class="msg-title">购方电话：</span>
          <el-input max-length="20" size="small" clearable
                    v-model.trim="order.buyerTel ">
          </el-input>
        </div>
        <div class="content-msg">
          <span class="msg-title">购方手机：</span>
          <el-input max-length="20" size="small" clearable
                    v-model.trim="order.buyerPhone ">
          </el-input>
        </div>
        <div class="content-msg">
          <span class="msg-title">购方地址：</span>
          <el-input max-length="100" size="small" clearable
                    v-model.trim="order.buyerAddress ">
          </el-input>
        </div>
        <div class="content-msg">
          <span class="msg-title">银行账号及开户行地址：</span>
          <el-input max-length="100" size="small" clearable
                    v-model.trim="order.buyerAccount ">
          </el-input>
        </div>
      </div>
      <div class="footer">
        <address class="footer-text">
          <p>注：</p>
          <p>1.上方信息不能为空</p>
          <p>2.点击微信开票,将开启微信发票信息填充，会把上面数据覆盖。</p>
        </address>
        <el-button type="warning" size="small" @click="wxPrint" v-throttle plain>
          {{ws?'已开启微信开票':'开启微信开票'}}
        </el-button>
      </div>
    </div>
    <div class="box weight-Info">
      <p class="title">
        <span>重要信息</span>
        <i class="el-icon-star-on" style="font-size: 24px;color: #f09999"></i>
      </p>
      <div class="content">
        <div class="weight-msg">
          <div class="weight-msg-item">
            <span class="weight-msg-title">推送方式：</span>
            <el-select v-model="order.pushMode" size="small" placeholder="请选择" disabled>
              <el-option v-for="item in pushMode" :value="item.value"
                         :label="item.label" :key="item.value"/>
            </el-select>
          </div>
          <div class="weight-msg-item">
            <span class="weight-msg-title">清单标志：</span>
            <el-radio v-model="order.listFlag" label="0">自动产生</el-radio>
            <el-radio v-model="order.listFlag" disabled label="1">手动产生</el-radio>
          </div>
        </div>
        <div class="weight-msg">
          <div class="weight-msg-item">
            <span class="weight-msg-title">推送邮箱：</span>
            <el-input max-length="50" placeholder="推送方式为不推送或手机、邮箱时，此项为必填" disabled size="small" style="width: 200px"
                      v-model.trim="order.email">
            </el-input>
          </div>
          <div class="weight-msg-item">
            <span class="weight-msg-title">代开标志：</span>
            <el-radio v-model="order.proxyInvoiceFlag" label="0">非代开</el-radio>
            <el-radio v-model="order.proxyInvoiceFlag" disabled label="1">代开</el-radio>
          </div>
        </div>
        <div class="weight-msg">
          <div class="weight-msg-item">
            <span class="weight-msg-title">发票种类：</span>
            <el-select v-model="order.invoiceLine" size="small" disabled>
              <el-option v-for="item in invoiceLine" :value="item.value" :label="item.label" :key="item.value"/>
            </el-select>
          </div>
          <div class="weight-msg-item">
            <span class="weight-msg-title">开票类型：</span>
            <el-radio v-model="order.invoiceType" label="1">正票</el-radio>
            <el-radio v-model="order.invoiceType" disabled label="2">红票</el-radio>
          </div>
        </div>
        <div class="weight-msg">
          <div class="weight-msg-item">
            <!--<span class="weight-msg-title">推送邮箱：</span>-->
            <!--<el-input max-length="50" placeholder="推送方式为不推送或手机、邮箱时，此项为必填" disabled size="small" style="width: 200px"-->
            <!--v-model.trim="order.email">-->
            <!--</el-input>-->
          </div>
          <div class="weight-msg-item">
            <span class="weight-msg-title">成品油标志：</span>
            <el-radio v-model="order.productOilFlag" label="0">非成品油</el-radio>
            <el-radio v-model="order.productOilFlag" disabled label="1">成品油</el-radio>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {WS} from '../../../api'
  import {mapMutations} from 'vuex'

  export default {
    name: "Invoice",
    data() {
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
        invoiceLine: [
          {value: 's', label: '专用发票'},
          {value: 'p', label: '普通发票(电票)'},
          {value: 'c', label: '普通发票(纸票)'},
          {value: 'e', label: '收购发票(电票)'},
          {value: 'f', label: '收购发票(纸票)'},
        ],
        pushMode: [
          {value: '-1', label: '不推送'},
          {value: '0', label: '邮箱'},
          {value: '1', label: '手机(默认)'},
          {value: '2', label: '邮箱、手机'},
        ],
        wxUrl: '',
        ws: null
      }
    },
    methods: {
      ...mapMutations(['SET_ORDERINFO']),
      wxPrint() {
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
      //连接websocket
      websocket(url) {
       
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
      createInfo(eventData) {
        const data = JSON.parse(eventData)
        if (data.errcode === 0) {
          this.order.buyerAddress = data.addr
          this.order.buyerName = data.title
          this.order.buyerTaxNum = data.tax_no
          this.order.buyerPhone = data.phone
          this.order.buyerAccount = data.bank_no + ' ' + data.bank_type
          const number = {type: 'number', number: data.number}
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
    components: {},
    props: {}

  }
</script>

<style scoped>
  .warp {
    grid-area: 1 / 3 / 5 / 6;
    width: 100%;
  }

  .box {
    padding: 10px;
    color: #ffffff;
    font-size: 18px;
    font-weight: 700;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .invoice-box {
    height: 430px;
    background-color: #2196F3;
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
    padding: 10px;
  }

  .msg-title {
    margin-right: 10px;
    width: 120px;
    font-size: 14px;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #dddddd;
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
</style>