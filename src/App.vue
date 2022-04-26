<template>
  <div id="app">
    <leftNav />
    <router-view />
  </div>
</template>
<script>
import leftNav from "@/components/common/leftNav.vue";

export default {
  components: { leftNav },
};
</script>

<style></style>
