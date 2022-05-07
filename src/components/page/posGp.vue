<template>
  <div class="pos">
    <el-row>
      <el-col :span="9"
              class="pos-order"
              id="border-list">
        <el-tabs>
          <el-tab-pane label="点餐">
            <el-table :data="tableData"
                      border
                      style="width: 100%">
              <el-table-column prop="goodsName"
                               label="商品名称">
              </el-table-column>
              <el-table-column prop="count"
                               label="数量"
                               width="50">
              </el-table-column>
              <el-table-column prop="price"
                               label="金额"
                               width="70">
              </el-table-column>
              <el-table-column label="操作"
                               fixed="right"
                               width="90">

                <template slot-scope="scope">
                  <el-button type="text"
                             size="small"
                             @click="delGood(scope.row)">删除</el-button>
                  <el-button type="text"
                             size="small"
                             @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>

            </el-table>

            <div class="totalDiv">
              数量：{{totalCount}} 金额：￥{{totalMoney}}
            </div>
            <div class="div-btn">
              <el-button type="warning">挂单</el-button>
              <el-button type="danger"
                         @click="delAll">删除</el-button>
              <el-button type="success"
                         @click="checkout">结账</el-button>

            </div>

          </el-tab-pane>
          <el-tab-pane label="挂单">挂单</el-tab-pane>
          <el-tab-pane label="外卖">外卖</el-tab-pane>

        </el-tabs>
      </el-col>
      <el-col :span="15">
        <div class="often-goods">
          <div class="title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li v-for="good in oftenGoods"
                  @click="addOrderList(good)">
                <span>{{good.goodsName}}</span>
                <span class="o-price">￥{{good.price}}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <div>
                <ul class="cookList">
                  <li v-for="good in type0Goods"
                      @click="addOrderList(good)">
                    <span class="foodImg"><img :src="good.goodsImg"
                           width="70px"
                           height="70px"></span>
                    <span class="foodName">{{good.goodsName}} </span>
                    <span class="foodPrice">${{good.price}} </span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <div>
                <ul class="cookList">
                  <li v-for="good in type1Goods"
                      @click="addOrderList(good)">
                    <span class="
                      foodImg"><img :src="good.goodsImg"
                           width="70px"
                           height="70px"></span>
                    <span class="foodName">{{good.goodsName}} </span>
                    <span class="foodPrice">${{good.price}} </span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <div>
                <ul class="cookList">
                  <li v-for="good in type2Goods"
                      @click="addOrderList(good)">
                    <span class="foodImg"><img :src="good.goodsImg"
                           width="70px"
                           height="70px"></span>
                    <span class="foodName">{{good.goodsName}} </span>
                    <span class="foodPrice">${{good.price}} </span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <div>
                <ul class="cookList">
                  <li v-for="good in type3Goods"
                      @click="addOrderList(good)">
                    <span class="foodImg"><img :src="good.goodsImg"
                           width="70px"
                           height="70px"></span>
                    <span class="foodName">{{good.goodsName}} </span>
                    <span class="foodPrice">${{good.price}} </span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "posRmb",
  data () {
    return {
      oftenGoods: [],
      tableData: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      totalMoney: 0,
      totalCount: 0

    }
  },
  created: function () {
    axios.get('https://www.fastmock.site/mock/0bf6a5bae7eab8507e44b56191ddff36/vuepos/oftenGoods').then(
      response => {
        this.oftenGoods = response.data.oftenGoods
        // console.log(this.oftenGoods);
        // console.log(this.tableData);

      }
    ).catch(error => {
      alert('网络错误，不能访问')
    })

    axios.get('https://www.fastmock.site/mock/0bf6a5bae7eab8507e44b56191ddff36/vuepos/typeGoods').then(
      response => {

        this.type0Goods = response.data.data[0]
        this.type1Goods = response.data.data[1]
        this.type2Goods = response.data.data[2]
        this.type3Goods = response.data.data[3]

        // console.log(response.data.data);
      }
    ).catch(error => {
      alert('网络错误，不能访问')
    })
  },
  mounted: function () {
    var orderHigh = document.body.clientHeight;
    // console.log(orderHigh);
    document.getElementById("border-list").style.height = orderHigh + 'px'
  },
  methods: {

    addOrderList: function (goods) {
      this.totalMoney = 0;
      this.totalCount = 0;

      //商品是否在订单列表中
      let isHave = false;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].goodsId == goods.goodsId) {
          isHave = true
        }
      }
      //根据判断写业务逻辑
      if (isHave) {
        //改变列表中商品数量
        let arr = this.tableData.filter(o => {
          console.log(o);
          return o.goodsId == goods.goodsId
        })
        arr[0].count++
      } else {
        let newgoods = {
          goodsId: goods.goodsId, goodsName: goods.goodsName, price: goods.price, count: 1
        }
        this.tableData.push(newgoods)
      }
      this.getAllMoney()
    },
    delGood (good) {
      this.tableData = this.tableData.filter(o => o.goodsId != good.goodsId)
      this.getAllMoney()
    },
    delAll () {
      this.totalCount = 0
      this.totalMoney = 0
      this.tableData = []
    },
    //模拟结账
    checkout () {
      if (this.totalCount != 0
      ) {
        this.tableData = []
        this.totalCount = 0
        this.totalMoney = 0
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      }
    },
    getAllMoney () {
      this.totalCount = 0
      this.totalMoney = 0
      if (this.tableData) {
        //计算汇总价格和数量
        this.tableData.forEach((element) => {
          this.totalCount += element.count
          this.totalMoney = this.totalMoney + (element.price * element.count)
        })
      }
    }
  },
  watch: {
    tableData (newVal, oldVal) {
      console.log('oldVal:', oldVal)
      console.log('newVal:', newVal)
    }
  }
};
</script>

<style scoped>
.pos-order {
  background-color: #f9fafc;
  border-right: 1px solid #c0ccda;
  height: 100%;
}
.div-btn {
  margin-top: 20px;
  text-align: center;
}
.title {
  height: 20px;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 10px;
  text-align: center;
}
.often-goods-list ul li {
  float: left;
  border: 1px solid #f9fafc;
  padding: 10px;
  margin: 10px;
  background-color: #f9fafc;
  cursor: pointer;
}
.o-price {
  color: #58b7ff;
}
.goods-type {
  clear: both;
}
/* 拷贝 */
.cookList li {
  list-style: none;
  width: 23%;
  border: 1px solid #e5e9f2;
  height: auot;
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  float: left;
  margin: 2px;
  cursor: pointer;
}
.cookList li span {
  display: block;
  float: left;
}
.foodImg {
  width: 40%;
}
.foodName {
  font-size: 18px;
  padding-left: 10px;
  color: brown;
}
.foodPrice {
  font-size: 16px;
  padding-left: 10px;
  padding-top: 10px;
}

.totalDiv {
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #d3dce6;
  text-align: center;
}
</style>
