<template>
    <div class="side-bar">
        <ul class="side-bar_ul">
            <li class="side-bar_ul-item" :class="{isActive: hasCurrent(item)}" v-for="item in data.menu" :key="item.route" @click="handleChangeMenu(item)">{{item.name}}</li>
        </ul>
    </div>
</template>

<script setup>
import { reactive,watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const data = reactive({
  menu: [
    { name: '发现音乐', route: 'found', subRoute: 'personality' },
    { name: '播客', route: 'podcast' },
    { name: '视频', route: 'video' },
    { name: '关注', route: 'focusOn' },
    { name: '私人定制', route: 'customMade' },
  ],
});
const handleChangeMenu = (item)=>{
  router.push({name: item.route})
}
const hasCurrent = (item)=>{
  const currentRoute = route.name
  return item.route === currentRoute || item.subRoute === currentRoute
}
</script>
<script>
export default {
  name: 'SideBar',
};
</script>

<style lang="scss" scoped>
    .side-bar{
        width: 200px;
        height: 100vh;
        padding: 5px 15px;
        /*border-right: 1px solid red;*/
        background-color: #1E1E1E;
        color: var(--text-normal-color);
        &_ul{
            &-item{
                font-size: 1.2rem;
                padding: 12px 0;
                cursor: pointer;
                border-radius: 4px;
                padding-left: 6px;
                &.isActive{
                    background-color: #606060;
                    font-weight: bold;
                    font-size: 1.3rem;
                }
                &:hover{
                    background-color: #343434;
                }
            }
        }
    }
</style>
