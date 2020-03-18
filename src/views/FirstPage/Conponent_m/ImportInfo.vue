<template>
  <div class="box weight-Info"
       style="
    line-height: 39px;">
    <p style="display:flex;justify-content:space-between">
      <span>其他信息</span>
      <img :src="bbbb?require('../../../assets/img/toTop.png'):require('../../../assets/img/toBut.png')"
           alt=""
           @click="isShow"
           style="margin-top:16px;height:10px;">
    </p>
    <collapse-transition>
      <div class="collapse-wrap"
           v-show="bbbb">
        <slot>
          <p class="title">重要信息</p>
          <div class="content">
            <div class="weight-msgL">
              <div class="weight-msg-item"
                   style="margin-bottom: 14px;margin-top: 5px;">
                <span class="weight-msg-title">推送方式：</span>
                <el-select v-model="order.pushMode"
                           size="small"
                           placeholder="请选择"
                           disabled>
                  <el-option v-for="item in pushMode"
                             :value="item.value"
                             :label="item.label"
                             :key="item.value" />
                </el-select>
              </div>
              <div class="weight-msg-item"
                   style="margin-bottom: 20px;">
                <span class="weight-msg-title">推送邮箱：</span>
                <el-input max-length="50"
                          placeholder="推送方式为不推送或手机、邮箱时，此项为必填"
                          disabled
                          size="small"
                          style="width: 200px"
                          v-model.trim="order.email">
                </el-input>
              </div>
              <div class="weight-msg-item">
                <span class="weight-msg-title">发票种类：</span>
                <el-select v-model="order.invoiceLine"
                           size="small"
                           disabled>
                  <el-option v-for="item in invoiceLine"
                             :value="item.value"
                             :label="item.label"
                             :key="item.value" />
                </el-select>
              </div>
            </div>
            <div class="weight-msgR">
              <div class="weight-msg-item">
                <span class="weight-msg-title">清单标志：</span>
                <el-radio v-model="order.listFlag"
                          label="0"
                          style="flex:0.5;">自动产生</el-radio>
                <el-radio v-model="order.listFlag"
                          disabled
                          label="1"
                          style="flex:2;">手动产生</el-radio>
              </div>
              <div class="weight-msg-item">
                <span class="weight-msg-title">代开标志：</span>
                <el-radio v-model="order.proxyInvoiceFlag"
                          label="0"
                          style="flex:0.5;">非代开</el-radio>
                <el-radio v-model="order.proxyInvoiceFlag"
                          disabled
                          label="1"
                          style="flex:2;">代开</el-radio>
              </div>
              <div class="weight-msg-item">
                <span class="weight-msg-title">开票类型：</span>
                <el-radio v-model="order.invoiceType"
                          label="1"
                          style="flex:0.5;">正票</el-radio>
                <el-radio v-model="order.invoiceType"
                          disabled
                          label="2"
                          style="flex:2;">红票</el-radio>
              </div>
              <div class="weight-msg-item">
                <span class="weight-msg-title">成品油标志：</span>
                <el-radio v-model="order.productOilFlag"
                          label="0"
                          style="flex:0.5;">非成品油</el-radio>
                <el-radio v-model="order.productOilFlag"
                          disabled
                          label="1"
                          style="flex:2;">成品油</el-radio>
              </div>
            </div>
          </div>
          <p class="title">
            <span>备注信息</span>

          </p>
          <div class="content">
            <el-input class="text-content"
                      max-length="130"
                      type="textarea"
                      resize="none"
                      :rows="5"
                      v-model.trim="remark"
                      style="margin-top:10px;" />
          </div>
        </slot>
      </div>
    </collapse-transition>
  </div>
</template>

<script>
import CollapseTransition from '../../../plugins/plane'

export default {
  name: 'importInfo',
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
      remark: '请前往诺诺网(www.jss.com.cn)查询发票详情',
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
      ws: null,
      bbbb: false
    }
  },
  methods: {
    isShow () {
      this.bbbb = !this.bbbb
    },
  },
  components: { CollapseTransition }
}
</script>
<style >
.el-textarea__inner {
  height: 200px;
}
</style>
<style scoped>
.warp {
  grid-area: 1 / 3 / 5 / 6;
  width: 100%;
}

.box {
  padding: 9px 17px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.invoice-box {
  height: 430px;
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
  display: flex;
}
.weight-msgL {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.weight-msgR {
  flex: 1;
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
  /* height: 210px; */
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
  display: flex;
  align-items: center;
}

.weight-msg-title {
  width: 100px;
  font-size: 14px;
}
</style>