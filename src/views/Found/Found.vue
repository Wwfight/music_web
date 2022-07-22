<template>
  <div class="home">
    <el-tabs v-model="data.activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane v-for="item in data.tabs" :key="item.route" :label="item.name" :name="item.route">
      </el-tab-pane>
      <router-view/>
    </el-tabs>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, reactive,toRaw   } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const data = reactive({
  activeName: 'personality',
  tabs: [
    { name: '个性推荐', route: 'personality' },
    { name: '专属定制', route: 'exclusive' },
    { name: '歌单', route: 'songList' },
    { name: '排行榜', route: 'rank' },
    { name: '歌手', route: 'singer' },
    { name: '最新音乐', route: 'latest' },
  ],
});
const handleClick = (e)=>{
  router.push({name: toRaw(e).props.name})
}
</script>
