<template>
  <div class="home">
    <BindPrinter ref="bindPrinter"/>
    <Invoice ref="invoice"/>
    <DirectPrint ref="directPrint"/>
    <ShopInfo ref="shopInfo" @execute="execute" @preview="preview" @accredit="getAccredit"/>
    <Preview ref="preview" :url="baseUrl" @print="previewPrint"/>
  </div>
</template>

<script>
  import Day from 'dayjs'
  import {requestBilling, printPreview, eInvoicePrint, getAuthorizeAddress} from '../../api'
  import {messageMinxins} from '../../mixins'
  import {generateUUID} from '../../util/tool'
  import DirectPrint from "./childrenComponents/DirectPrint";
  import BindPrinter from "./childrenComponents/BindPrinter";
  import Invoice from "./childrenComponents/Invoice";
  import ShopInfo from "./childrenComponents/ShopInfo";
  import Preview from "./childrenComponents/Preview";

  export default {
    name: "Home",
    created() {

      getAuthorizeAddress()
        .then(res => {
          this.accreditUrl = res.data
        })
        .catch(() => {
          // console.log(error);
        })
      const query = this.$route.query
      if (query.hasOwnProperty('code') && query.hasOwnProperty('taxnum')) {
        console.log(this.$route.query);
      }

    },
    data() {
      return {
        orderArr: [
          {
            checker: "朱燕1",//复核人
            payee: "络克1",//收款人
            clerk: "袁牧庆",//开票人
            salerAccount: "131001088303400 东亚银行杭州分行",
            salerAddress: "杭州市中河中路222号平海国际商务大厦5楼",
            salerTaxNum: "339901999999142",
            salerTel: "0571-87022168",
            isActive: false,
          },
          {
            checker: "朱燕2",//复核人
            payee: "络克1",//收款人
            clerk: "袁牧庆",//开票人
            salerAccount: "131001088303400 东亚银行杭州分行",
            salerAddress: "杭州市中河中路222号平海国际商务大厦5楼",
            salerTaxNum: "339901999999142",
            salerTel: "0571-87022168",
            isActive: false,
          },
          {
            checker: "朱燕3",//复核人
            payee: "络克1",//收款人
            clerk: "袁牧庆",//开票人
            salerAccount: "131001088303400 东亚银行杭州分行",
            salerAddress: "杭州市中河中路222号平海国际商务大厦5楼",
            salerTaxNum: "339901999999142",
            salerTel: "0571-87022168",
            isActive: false,
          },
          {
            checker: "朱燕4",//复核人
            payee: "络克1",//收款人
            clerk: "袁牧庆",//开票人
            salerAccount: "131001088303400 东亚银行杭州分行",
            salerAddress: "杭州市中河中路222号平海国际商务大厦5楼",
            salerTaxNum: "339901999999142",
            salerTel: "0571-87022168",
            isActive: false,
          },
          {
            checker: "朱燕5",//复核人
            payee: "络克1",//收款人
            clerk: "袁牧庆",//开票人
            salerAccount: "131001088303400 东亚银行杭州分行",
            salerAddress: "杭州市中河中路222号平海国际商务大厦5楼",
            salerTaxNum: "339901999999142",
            salerTel: "0571-87022168",
            isActive: true,
          },
        ],
        order: {
          "buyerTel": "0571-88888888",
          "listFlag": "0",
          "pushMode": "1",
          "remark": "请前往诺诺网(www.jss.com.cn)查询发票详情",//备注
          "checker": "朱燕1",//复核人
          "payee": "络克1",//收款人
          "buyerAddress": "杭州市万塘路30号东方科技园12幢2楼",
          "buyerTaxNum": "91330000692368905R",
          "invoiceType": "1",
          "invoiceLine": "p",
          "email": "846722718@qq.com",
          "salerAccount": "东亚银行杭州分行,131001088303400",//销售方开户行及账号
          "orderNo": "",
          "salerTel": "0571-87022168",//销售方电话
          "buyerName": "浙江爱信诺航天信息有限公司",//销售方名称
          "invoiceDate": "",
          "salerAddress": "杭州市中河中路222号平海国际商务大厦5楼",//销售方地址
          "clerk": "袁牧庆",//开票人
          "buyerPhone": "18814094002",
          "buyerAccount": "125000590990435128 杭州银行石桥支行",
          "productOilFlag": "0",
          "salerTaxNum": "339901999999142",//销售方纳税人识别号
          "proxyInvoiceFlag": "0"
        },
        printUrl: '',
        baseUrl: '',
        accreditUrl: ''
      }
    },
    methods: {
      //执行生成发票和生成发票并打印
      execute(type) {
        if (type === 'print') {
          this.print()
        } else {
          this.createInvoice()
        }
      },
      //生成发票信息
      createOrder() {
        //生成UUID和日期
        const date = Day(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        const uuid = generateUUID()
        let result = this.$refs.invoice.order
        const {order, remark} = this.$refs.directPrint
        const {invoiceDetail} = this.$refs.shopInfo
        result.invoiceDate = date
        result.orderNo = uuid
        result.remark = remark
        result.invoiceDetail = invoiceDetail

        result = {...result, ...order}
        delete result.index
        delete result.isActive
        delete result._id
        result.userId = '4ed208ef1ea14466828bc915abb4dfc4'
        if (result.buyerAddress && result.buyerName && result.buyerPhone && result.buyerTaxNum && result.buyerAccount) {
          return result
        } else {
          return false
        }

      },
      //触发发票信息
      createInvoice() {
        //1.执行生成发票的方法
        this.invoice()
          .then(() => {
            //2.显示弹框
            this.$confirm('生成发票成功是否预览，或打印?', '提示', {
              distinguishCancelAndClose: true,
              confirmButtonText: '预览',
              cancelButtonText: '打印',
              type: 'warning'
            }).then(() => {
              //2.1触发预览发票方法
              this.preview()
            }).catch(action => {
              if (action === 'cancel') {
                //2.2触发预览发票方法
                this.previewPrint()
              }

            });
          })
          .catch(err => {
            this.$notify({
              title: '失败',
              message: err.data,
              type: 'error',
              position: 'top-left',
              offset: 50
            });
          })
      },

      /*
      * @desc(描述):生成发票信息
      * 参数填写模板
      *
      * name(形参名称) type(传入类型) required(是否必传，默认是true) paramDesc(参数描述)
      *
      * @param
      * @param
      * @param
      * @param
      *
      * 如果没有返回值@return void，否则 @return 返回值 {类型}
      *
      * @return value{promise}
      *
      * */
      invoice() {
        //1.创建一个promise对象
        return new Promise((resolve, reject) => {
          //2.检验发票的购票方和销售方等参数
          const order = this.createOrder()
          if (!order) {
            this.$notify({
              title: '失败',
              message: '生成发票失败，请检查购票方信息',
              type: 'error',
              position: 'top-left',
              offset: 50
            });
            return
          }
          //3.显示loading
          const loading = this.$loading({
            lock: true,
            text: '发票生成中...',
            spinner: 'el-icon-loading bigPhoto',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          //4.发送请求
          requestBilling(order)
            .then(res => {
              //4.1 把生成发票的url 赋值到this.printUrl，以及把预览发票的base64数据字符串清空，
              //并触发成功promise
              this.printUrl = res.data
              this.baseUrl = ''
              resolve(res)
              loading.close();
            })
            .catch(() => {
              //4.2 触发失败promise
              reject({code: 404, data: '生成发票失败'})
              loading.close();
            })
        })
      },

      /*
      * @desc(描述):点击生成发票并打印按钮
      * 参数填写模板
      *
      * name(形参名称) type(传入类型) required(是否必传，默认是true) paramDesc(参数描述)
      *
      * @param
      * @param
      * @param
      * @param
      *
      * 如果没有返回值@return void，否则 @return 返回值 {类型}
      *
      * @return void
      *
      * */
      print() {
        //生成发票信息
        this.invoice()
          .then(() => {
            //打印发票
            this.previewPrint()
          })
          .catch(err => {
            this.$notify({
              title: '失败',
              message: err.data,
              type: 'error',
              position: 'top-left',
              offset: 50
            });
          })
      },

      /*
      * @desc(描述):直接打印发票
      * 参数填写模板
      *
      * name(形参名称) type(传入类型) required(是否必传，默认是true) paramDesc(参数描述)
      *
      * @param
      * @param
      * @param
      * @param
      *
      * 如果没有返回值@return void，否则 @return 返回值 {类型}
      *
      * @return void
      *
      * */
      previewPrint() {
        let loading = this.$loading({
          lock: true,
          text: '发票打印中..',
          spinner: 'el-icon-loading bigPhoto',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        const data = {
          number: this.$refs.bindPrinter.printerValue.number,
          type: 'url_pdf',
          receive: this.printUrl
        }
        //发送打印请求
        printPreview(data).then(() => {
          this.$notify({
            title: '成功',
            message: '打印成功',
            type: 'success',
            position: 'top-left',
            offset: 50
          });
          loading.close();
        }).catch((err) => {
          this.$notify({
            title: '失败',
            message: err.data,
            type: 'error',
            position: 'top-left',
            offset: 50
          });
          loading.close();
        })
      },

      /*
      * @desc(描述):根据ShopInfo组件触发事件preview事件，进行显示预览图片
      * 参数填写模板
      *
      * name(形参名称) type(传入类型) required(是否必传，默认是true) paramDesc(参数描述)
      *
      * @param
      * @param
      * @param
      * @param
      *
      * 如果没有返回值@return void，否则 @return 返回值 {类型}
      *
      * @return void
      *
      * */
      preview() {
        if (this.printUrl) {
          if (!this.baseUrl) {
            this.renderPreview()
              .then(res => {
                if (res.code === 0) {
                  this.$refs.preview.isPreview = true
                } else {
                  this.myMessage('error', '预览发票失败')
                }
              })
          } else {
            this.$refs.preview.isPreview = true
          }

        } else {
          this.myMessage('error', '请生成发票再预览')
        }
      },

      /*
      * @desc(描述):生成预览发票，并返回promise
      * 参数填写模板
      *
      * name(形参名称) type(传入类型) required(是否必传，默认是true) paramDesc(参数描述)
      *
      * @param
      * @param
      * @param
      * @param
      *
      * 如果没有返回值@return void，否则 @return 返回值 {类型}
      *
      * @return msg {Object}
      *
      * */
      async renderPreview() {
        //1.生成成功信息
        let msg = {code: 0, data: '预览成功'}
        //2.生成预览发票数据
        const data = {
          dsNumber: [this.$refs.bindPrinter.printerValue.number],
          fileType: 'url_pdf',
          printData: this.printUrl,
          action: 'preview',
          imageAlgorithm: 'binarization',
        }
        try {
          //3.发送请求
          const res = await eInvoicePrint(data)
          this.baseUrl = res.data
        } catch (e) {
          //4.预览失败，生成错误信息
          msg.code = 404
          msg.data = '预览失败'
        }
        //返回状态信息
        return msg
      },

      getAccredit() {
        window.location.href = this.accreditUrl
      }
    }
    ,
    components: {
      Preview, ShopInfo, Invoice, BindPrinter, DirectPrint
    }
    ,
    mixins: [messageMinxins],
  }
</script>

<style scoped>
  .home {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    /*grid-template-rows: repeat(5,1.1fr);*/
    grid-column-gap: 50px;
    grid-row-gap: 20px;
    padding-top: 75px;
    margin: 0 auto;
    width: 80%;
  }

  @media (max-width: 1300px) {
    .home {
      width: 90%;
    }
  }

  @media (max-width: 1200px) {
    .home {
      width: 95%;
    }
  }

  @media (max-width: 1100px) {
    .home {
      width: 99%;
    }
  }

</style>