<template>
  <div class="pos">
    <div class="main">
      <posRmb />
    </div>
  </div>
</template>

<script>
import posRmb from "@/components/page/posGp.vue";


export default {
  components: { posRmb },
};
</script>

<style>
.main {
  float: left;
  width: 95%;
  height: 100%;
  /* background-color: #20a6dc; */
  overflow: hidden;
}
</style>
