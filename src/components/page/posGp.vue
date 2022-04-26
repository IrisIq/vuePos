<template>
  <div class="pos">
    <el-row>
      <el-col :span="8"
              class="pos-order"
              id="border-list">我是订单栏</el-col>
      <el-col :span="7">我是产品栏</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "posRmb",
  mounted: function () {
    var orderHigh = document.body.clientHeight;
    console.log(orderHigh);
    document.getElementById("border-list").style.height = orderHigh + 'px'
  },
};
</script>

<style scoped>
.pos-order {
  background-color: #f9fafc;
  border-right: 1px solid #c0ccda;
  height: 100%;
}
</style>
