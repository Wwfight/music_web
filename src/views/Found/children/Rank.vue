<template>
    <div class="rank">
      <div class="title">官方榜</div>
      <div class="tj">
        <div class="tj-item" v-for="item in data.rankList.slice(0,4)" :key="item.id">
          <div class="tj-item_left" @click="handlePlaySongs(item)">
            <img class="coverImgUrl" v-lazyImg="item.coverImgUrl" />
            <span class="update">{{dayjs(item.updateTime).format('MM-DD')}}更新</span>
            <div class="play-icon">
              <i class="al-icon icon-play"/>
            </div>
          </div>
          <ul class="tj-item_right">
            <li class="tj-item_right-li" v-for="(song,index) in item.songs" :key="song.id" @click="handlePlaySound(song)">
              <div>
                <span class="index">{{ index + 1 }}.</span>
                <span class="name">
                  {{song.name}}
                  <span class="alia">{{song.alia.length?`(${song.alia.join('&')})`:''}}</span>
                </span>
              </div>
              <span class="singer">{{song.ar.map(i=>i.name).join('&')}}</span>
            </li>
          </ul>
          <div class="all" @click="handle2SongList(item)">查看全部 <ArrowRight style="width: 1rem;height: 1rem;margin-left: 0.1rem;position:relative;top: 1.2px;"/> </div>
        </div>
      </div>
      <div class="title">全球榜</div>
      <ul class="qqb">
        <li class="qqb-item" v-for="item in data.rankList.slice(4,data.rankList.length)" :key="item.id" @click="handle2SongList(item)">
          <p style="position: relative">
            <img class="coverImgUrl" v-lazyImg="item.coverImgUrl" />
            <span class="play-icon">
              <i class="al-icon icon-play"/>
            </span>
          </p>
          <p class="qqb-item_name">{{item.name}}</p>
        </li>
      </ul>
    </div>
</template>

<script setup>
  import { onMounted, reactive, getCurrentInstance  } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { getAction } from '@/api/api';
  import dayjs from 'dayjs'
  const store = useStore()
  const router = useRouter()
  let { proxy } = getCurrentInstance()
  const data = reactive({
    rankList: []
  });
  onMounted(()=>{
    console.log('mounted')
    getAction('/toplist').then((res) => {
      data.rankList = res.data.list
      data.rankList.map((item,index)=>{
        if(index<=3){
          getAction(`/playlist/track/all?id=${item.id}&limit=5`).then((res) => {
            data.rankList[index].songs = res.data.songs
          })
        }
      })
    });
  })
  const handlePlaySongs = (item)=>{
    getAction(`/playlist/track/all?id=${item.id}`).then((res) => {
      const tracks = res.data.songs
      store.commit('updateStateValue',{
        key: 'tracks',
        value: tracks
      })
      proxy.$mitt.emit('playSong',tracks[0].id)
    });
  }
  const handlePlaySound = (item)=>{
    proxy.$mitt.emit('playSong',item.id)
  }
  const handle2SongList = (item)=>{
    router.push({ name: 'songs', query:{ id: item.id } })
  }
</script>

<style lang="scss" scoped>
.rank{
  color: var(--text-normal-color);
  padding: 5px;
  .title{
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .tj{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &-item{
      flex: 0 0 49%;
      margin-bottom: 20px;
      display: flex;
      flex-wrap: wrap;
      cursor: pointer;
      &_left{
        position: relative;
        width: 200px;
        height: 200px;
        margin-right: 15px;
        &:hover .play-icon{
          opacity: 1;
        }
        .update{
          position: absolute;
          left: 50%;
          top: 62%;
          transform: translate(-50%, 0);
          font-size: 1.2rem;
        }
      }
      &_right{
        flex: 1;
        &-li{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 10px;
          cursor: pointer;
          &:nth-child(-n+3) .index{
            color: #FF4E4E;
            font-size: 1.3rem;
          }
          .index{
            font-size: 1.1rem;
            font-weight: bold;
            position: relative;
            top: 1px;
            margin-right: 5px;
          }
          .alia{
            color: var(--text-dec-color);
          }
          &:nth-child(2n){
            background-color: #323232;
          }
        }
      }
      .all{
        flex: 0 0 100%;
        margin-left: 225px;
        color: #8d8d8d;
      }
    }
  }
  .play-icon{
    position: absolute;
    left: 50%;
    top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(51, 51, 51, 0.5);
    backdrop-filter: saturate(180%) blur(30px);
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    transition: all 0.5s ease-in-out;
    opacity: 0;
    .icon-play{
      font-size: 2.5rem;
      color: var(--el-color-primary);
    }
  }
  .coverImgUrl{
    width: 100%;
    height: 100%;
    border-radius: 10px;
    aspect-ratio: 1/1;
    border: 1px solid rgba(0,0,0,.04);
    margin-right: 15px;
    box-shadow: 0 0 6px 2px rgba(185, 175, 168, 0.6);
  }
  .qqb{
    display: grid;
    grid-template-columns: repeat(auto-fill, 10%);
    &-item{
      grid-row-gap: 20px;
      grid-column-gap: 20px;
      position: relative;
      margin-right: 2.4rem;
      cursor: pointer;
      &:hover .play-icon{
        opacity: 1;
      }
      &:hover .coverImgUrl{
        box-shadow: 0 0 6px 2px rgba(185, 175, 168, 0.6);
      }
      .coverImgUrl{
        height: inherit;
        box-shadow: none;
      }
      &_name{
        font-size: 1.2rem;
        word-break: break-all;
        text-align: center;
        margin: 10px 0;
      }
    }
  }
}
</style>
