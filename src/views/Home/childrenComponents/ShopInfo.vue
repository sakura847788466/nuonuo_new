<template>
  <div class="warp">
    <div class="box">
      <div class="shop">
        <p class="title">商品信息：</p>
        <div class="content">
          <el-table height="250"
                    class="content-msg"
                    :data="invoiceDetail">
            <el-table-column label="名称"
                             width="200"
                             align="center">
              <template slot-scope="scope">
                <el-input placeholder="请输入内容"
                          v-model="scope.row.goodsName"
                          size="mini">
                  <el-select v-model="scope.row.goodsName"
                             slot="append"
                             placeholder="请选择">
                    <el-option v-for="(item,index) in goodsName"
                               :value="item"
                               :key="index" />
                  </el-select>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="specType"
                             label="型号"
                             align="center"
                             width="50">
            </el-table-column>
            <el-table-column label="单位"
                             width="150"
                             align="center">
              <template slot-scope="scope">
                <el-input placeholder="请输入内容"
                          v-model="scope.row.unit"
                          size="mini">
                  <el-select v-model="scope.row.unit"
                             slot="append"
                             placeholder="请选择">
                    <el-option v-for="(item,index) in unit"
                               :value="item"
                               :key="index" />
                  </el-select>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column label="数量"
                             align="center">
              <template slot-scope="scope">
                <el-input-number :min="1"
                                 size="mini"
                                 v-model.trim="scope.row.num" />
              </template>
            </el-table-column>
            <el-table-column label="单价"
                             align="center">
              <template slot-scope="scope">
                <el-input-number :min="0"
                                 size="mini"
                                 v-model.trim="scope.row.price"
                                 maxlength="2" />
              </template>
            </el-table-column>
            <el-table-column label="金额"
                             align="center"
                             width="100">
              <template slot-scope="scope">
                ￥{{scope.row.price*scope.row.num}}
              </template>
            </el-table-column>
            <el-table-column label="税率"
                             prop="taxRate"
                             align="center"
                             width="60">
              <!--<template slot-scope="scope">-->
              <!--<el-input size="mini" v-model="scope.row.taxRate"/>-->
              <!--</template>-->
            </el-table-column>
            <el-table-column prop="address"
                             label="操作"
                             align="center">
              <template slot-scope="scope">
                <div style="display: flex;justify-content: center">
                  <el-button size="mini"
                             type="danger"
                             @click="handleDelete(scope.$index)"
                             v-throttle>-</el-button>
                  <el-button size="mini"
                             @click="handleAdd(scope.$index)">+</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <footer class="footer-box">
        <div class="footer-preview">
          <el-button @click="preview"
                     v-throttle>预览发票</el-button>
          <!--<el-button @click="getAccredit" v-throttle>授 权</el-button>-->
        </div>
        <div class="footer-print">
          <p class="footer-text"
             @click="isPrint=!isPrint">是否提交发票并打印</p>
          <el-checkbox v-model="isPrint"></el-checkbox>
          <el-button type="primary"
                     class="footer-btn"
                     v-throttle
                     @click="createInvoice">{{isPrint?'打印发票':'提交发票'}}</el-button>
        </div>

      </footer>
      <!--<el-button type="danger" style="width: 120px" v-throttle @click="print">打印</el-button>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopInfo",
  data () {
    return {
      invoiceDetail: [
        {
          "specType": "1",
          "invoiceLineProperty": "0",//发票行性质
          "num": "2",
          "withTaxFlag": "1",//含税标志
          "favouredPolicyFlag": "0",//优惠政策
          "taxRate": "0.13",
          "unit": "台",
          "price": "11",
          "goodsName": "电脑"
        }, {
          "specType": "2",
          "invoiceLineProperty": "0",
          "num": "1",
          "withTaxFlag": "1",
          "favouredPolicyFlag": "0",
          "taxRate": "0.13",
          "unit": "只",
          "price": "25",
          "goodsName": "鸡"
        }
      ],
      isPrint: false,
      goodsName: [
        '电脑', '电视', '猪肉', '鸡肉', '衣服'
      ],
      unit: [
        '个', '只', '台', '件', '头', '条'
      ],
    }
  },
  methods: {
    createInvoice () {
      if (this.isPrint) {
        this.$confirm('是否生成发票,并打印?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('execute', 'print')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消生成'
          });
        });
      } else {
        this.$confirm('是否生成发票?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('execute', 'invoice')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消生成'
          });
        });
      }
    },
    handleDelete (index) {
      const len = this.invoiceDetail.length
      if (len > 1) {
        this.invoiceDetail.splice(index, 1)
      }
    },
    handleAdd (index) {
      const item = {
        "specType": "1",
        "invoiceLineProperty": "0",//发票行性质
        "num": "1",
        "withTaxFlag": "1",//含税标志
        "favouredPolicyFlag": "0",//优惠政策
        "taxRate": "0.13",
        "unit": "个",
        "price": "",
        "goodsName": ""
      }
      this.invoiceDetail.splice(index + 1, 0, item)
    },
    preview () {
      this.$emit('preview')
    },
    getAccredit () {
      this.$emit('accredit')
    }
  },
  components: {},
  props: {}

}
</script>

<style scoped>
.warp {
  grid-area: 5 / 1 / 6 / 6;
  margin: 30px 0;
}

.box {
  padding: 10px;
  font-size: 18px;
  color: #333333;
  font-weight: 700;
  /* border-radius: 4px; */
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
  /*width: 80%;*/
  background-color: #ffffff;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content {
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid #dddddd;
}

.content-msg {
  padding: 10px;
  width: 100%;
}

.text-box {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.footer-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
.footer-preview {
  margin-left: 10px;
}
.footer-print {
  display: flex;
  align-items: center;
}
.footer-text {
  margin-right: 10px;
  cursor: pointer;
}
.footer-btn {
  margin: 0 10px;
  width: 120px;
}
</style>