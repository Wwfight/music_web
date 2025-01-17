<template>
  <SideBar />
  <div class="app-right">
    <Nav />
    <div class="main">
      <router-view />
    </div>
    <play-controll />
  </div>

</template>
<script></script>
<style lang="scss">
@use "assets/css/public";
@use "assets/css/element";
ul{
  list-style: none;
}
body, html{
  overflow: hidden;
  font-size: 12px;
}
#app {
  font-family: Barlow,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif,microsoft uighur;
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  display: flex;
  background-color: var(--bg-color);
  overflow: hidden;
  .app-right {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    .main {
      flex: 1;
      padding: 6vh 20px 10vh;
      overflow-y: auto;
    }
  }
}
</style>
