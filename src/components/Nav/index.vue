<template>
  <div class="nav"></div>
</template>

<script setup>
import { reactive } from 'vue';

const data = reactive({});
</script>
<script>
export default {
  name: 'Nav',
};
</script>

<style lang="scss" scoped>
.nav {
  height: 6vh;
  width: 100%;
  z-index: 99;
  position: absolute;
  top: 0;
  backdrop-filter: saturate(180%) blur(30px);
  background-color: var(--color-navbar-bg);
}
</style>
