<template>
    <div class="songs">
        <div class="songs-header">
            <img class="img" :src="data.gdInfo.coverImgUrl"/>
            <div>
                <div class="title">{{data.gdInfo.name}}</div>
                <div class="creator">
                    <img class="avatarUrl" :src="data.gdInfo.creator.avatarUrl"/>
                    <span class="nickname">{{data.gdInfo.creator.nickname}}</span>
                    <span>{{dayjs(data.gdInfo.createTime).format('YYYY-MM-DD')}}创建</span>
                </div>
                <div class="tags">
                    标签：
                    <span v-for="item in data.gdInfo.tags" :key="item">
                        {{item}}<span> | </span>
                    </span>
                </div>
                <div class="count">
                    <span>歌曲：{{ data.tracks.length }}</span>
                    播放量：{{formatCount(data.gdInfo.playCount)}}
                </div>
                <div v-html="`简介：${data.gdInfo.description}`" class="description">
                </div>
                <div class="buttons">
                    <div class="play" @click="handlePlayAll">
                        <i class="al-icon icon-play"/>
                        <span>播放全部</span>
                    </div>
                    <div class="like">
                        <i class="al-icon icon-like"/>
                    </div>
                </div>
            </div>
        </div>
        <el-tabs v-model="data.activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane :label="`歌曲${data.tracks.length}`" name="sound">
                <ul class="list-head">
                    <li v-for="item in data.head" :key="item">{{item}}</li>
                </ul>
                <ul class="list">
                    <li class="list-item" v-for="item in data.tracks" :key="item.id" @dblclick="handlePlaySound(item)">
                        <span class="name">{{item.name}}</span>
                        <span class="ar">{{item.ar.map(i=>i.name).join('&')}}</span>
                        <span class="al">{{item.al.name || ''}}</span>
                        <span class="time">{{dayjs(item.dt).format('mm:ss')}}</span>
                    </li>
                </ul>
            </el-tab-pane>
            <el-tab-pane label="评论" name="comment">

            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
  import { onBeforeMount, reactive, getCurrentInstance  } from 'vue';
  import { useRouter, useRoute } from 'vue-router'
  import { useStore } from 'vuex'
  import { getAction } from '@/api/api';
  import { formatCount } from '@/utils/util';
  import dayjs from 'dayjs'
  const route = useRoute()
  const store = useStore()
  let { proxy } = getCurrentInstance()
  const data = reactive({
    activeName: 'sound',
    head: [ '歌名', '歌手', '专辑', '时间' ],
    tracks: [],
    gdInfo:{
      name: '',
      coverImgUrl: '',
      createTime: '',
      creator: {},
      description: '',
      tags: [],
      playCount: 0,
      subscribedCount: 0
    }
  })
  onBeforeMount(()=>{
    getAction(`/playlist/detail?id=${route.query.id}`).then((res) => {
      const info = res.data.playlist
      Object.keys(data.gdInfo).map(item=>{
        data.gdInfo[item] = info[item]
      })
    });
    getAction(`/playlist/track/all?id=${route.query.id}`).then((res) => {
      data.tracks = res.data.songs
    });
  })
  const handleClick = ()=>{

  }
  const handlePlayAll = ()=>{
    store.commit('updateStateValue',{
      key: 'tracks',
      value: data.tracks
    })
    proxy.$mitt.emit('playSong',data.tracks[0].id)
  }
  const handlePlaySound = (item)=>{
    proxy.$mitt.emit('playSong',item.id)
  }

</script>

<style lang="scss" scoped>
    @mixin itemStyle{
        flex: 0 0 25%;
        &:first-child{
            flex: 0 0 40%;
        }
        &:last-child{
            flex: 1;
        }
    }
.songs{
    color: var(--text-normal-color);
    padding-top: 8px;
    &-header{
        display: flex;
        font-size: 1.2rem;
        .img{
            width: 250px;
            height: 250px;
            border-radius: 10px;
            aspect-ratio: 1/1;
            border: 1px solid rgba(0,0,0,.04);
            margin-right: 15px;
            box-shadow: 0 0 6px 2px rgba(185, 175, 168, 0.6);
        }
        .title{
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        .creator{
            display: flex;
            align-items: center;margin-bottom: 10px;
            .avatarUrl{
                width: 15px;
                height: 15px;
                border-radius: 50%;
                margin-right: 5px;
            }
            .nickname{
                color: #7beccb;
                margin-right: 10px;
            }
        }
        .tags{
            margin: 10px 0;
        }
        .description{
            margin-top: 10px;
        }
        .buttons{
            display: flex;
            align-items: center;
            margin-top: 20px;
            .play{
                height: 40px;
                min-width: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                line-height: 18px;
                font-weight: 600;
                border-radius: 8px;
                padding: 8px 16px;
                cursor: pointer;
                background-color: #bbcdff;
                color: #335eea;
                transition: 0.2s;
                &:hover{
                    transform: scale(1.05);
                }
                .icon-play{
                    font-size: 1.4rem;
                    margin-right: 5px;
                }
            }
            .like{
                height: 40px;
                min-width: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                line-height: 18px;
                transition: 0.2s;
                color: #ffffff;
                border-radius: 8px;
                padding: 8px 0;
                margin: 0 10px;
                cursor: pointer;
                background-color: #323232;
                &:hover{
                    transform: scale(1.05);
                }
            }
        }
    }
    .list-head{
        display: flex;
        align-items: center;
        padding: 10px;
        li{
            color: #a6a6a6;
            font-size: 1.2rem;
            @include itemStyle;
        }
    }
    .list{
        &-item{
            padding: 10px;
            margin: 2px;
            display: flex;
            align-items: center;
            border-radius: 5px;
            transition: 0.5s;
            cursor: pointer;
            &:hover{
                box-shadow: 0 0 3px 1px slategray;
                background-color: #323232;
            }
            &:nth-child(2n){
                background-color: #323232;
            }
            span{
                @include itemStyle;
            }
            .name{
                font-size: 1.2rem;

            }
        }
    }
}
</style>
