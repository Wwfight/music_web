<template>
    <div class="banner">
        <el-carousel :interval="4000" type="card" height="250px">
            <el-carousel-item v-for="item in data.banners" :key="item.targetId">
                <img class="banner-img" :src="item.imageUrl"/>
            </el-carousel-item>
        </el-carousel>
    </div>
    <h3 class="con-title" @click="router.push({name: 'songList'})">推荐歌单 <ArrowRight style="width: 1.5rem;height: 1.5rem;margin-left: 0.5rem;position:relative;top: 3px;"/></h3>
    <ul class="personalized section">
        <div v-for="item in data.personalized" :key="item.id">
            <li class="personalized-item" @click="handlePlayHot(item)">
                <div class="personalized-item_pic">
                    <img class="img" :src="item.picUrl"/>
                    <div class="play-icon">
                        <i class="al-icon icon-play"/>
                    </div>
                </div>
                <span class="personalized-item_name">{{item.name}}</span>
            </li>
        </div>
    </ul>
    <h3 class="con-title">热门电台 <ArrowRight style="width: 1.5rem;height: 1.5rem;margin-left: 0.5rem;position:relative;top: 3px;"/></h3>
    <ul class="dj section">
            <li v-for="item in data.dj" :key="item.id" class="dj-item" >
                <div class="dj-item_pic">
                    <img class="img"  :src="item.picUrl"/>
                    <div class="play-icon">
                        <i class="al-icon icon-play"/>
                    </div>
                </div>
                <div class="dj-item_right">
                    <div class="dj-item_name">{{item.name}}</div>
                    <span class="dj-item_category">{{item.category}}</span>
                    <div class="dj-item_right-bottom">
                        <span class="dj-item_brand">{{item.rcmdtext}}</span>
                        <span class="dj-item_count"><el-icon><CaretRight /></el-icon>{{formatCount(item.playCount)}}</span>
                    </div>
                </div>
            </li>
    </ul>
    <h3 class="con-title">独家放送 <ArrowRight style="width: 1.5rem;height: 1.5rem;margin-left: 0.5rem;position:relative;top: 3px;"/></h3>
    <ul class="private section">
        <li v-for="item in data.privatecontent" :key="item.id" class="private-item" >
            <div class="private-item_pic">
                <img class="img" :src="item.picUrl"/>
                <div class="img-icon">
                    <i class="al-icon icon-play"/>
                </div>
            </div>
            <div class="private-item_name">{{item.name}}</div>
        </li>
    </ul>
</template>

<script setup>
  import { onBeforeMount, ref, reactive,toRaw   } from 'vue';
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { getAction } from '@/api/api';
  const store = useStore()
  const router = useRouter()
  const data = reactive({
    banners: [],
    personalized: [],
    dj: [],
    privatecontent: []
  })
  onBeforeMount(() => {
    getAction('/banner').then((res) => {
      data.banners = res.data.banners
    });
    getAction('/personalized',{limit: 10}).then((res) => {
      data.personalized = res.data.result
    });
    getAction('/dj/hot',{limit: 4}).then((res) => {
      data.dj = res.data.djRadios
    });
    getAction('/personalized/privatecontent',{limit: 4}).then((res) => {
      data.privatecontent = res.data.result
    });
  });
  const formatCount = (item)=>{
    return `${Math.floor(item / 10000)}万`
  }
  const  handlePlayHot = (item)=>{
    router.push({ name: 'songs', query:{ id: item.id } })
  }

</script>

<style lang="scss" scoped>
    .banner{
        width: 75%;
        /*height: 100%;*/
        margin: 0 auto;
        &-img{
            width: 100%;
            height: 100%;
            display: block;
        }
    }
    .section{
        margin-bottom: 2rem;
    }
    .con-title{
        font-size: 18px;
        color: var(--text-normal-color);
        cursor: pointer;
    }
    .play-icon{
        position: absolute;
        right: 10px;
        bottom: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(51, 51, 51, 0.78);
        backdrop-filter: saturate(180%) blur(130px);
        width: 30px;
        height: 30px;
        border-radius: 50%;
        transition: all 0.5s ease-in-out;
        opacity: 0;
        .icon-play{
            font-size: 1.4rem;
            color: var(--el-color-primary);
        }
    }
    .personalized{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        color: var(--text-normal-color);
        &>div{
            flex: 0 0 10%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
        }
        &-item{
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 120px;
            cursor: pointer;
            position: relative;
            &:hover .play-icon{
                opacity: 1;
            }
            &_pic{
                width: 100%;
                height: 120px;
                border-radius: 6px;
                overflow: hidden;
                margin-bottom: 8px;
                position: relative;
                .img{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
            &_name{
                word-break: break-all;
                line-height: 1.5;

            }
        }
    }
    .dj{
        display: flex;
        justify-content: space-between;
        color: var(--text-normal-color);
        &-item{
            display: flex;
            flex: 0 0 25%;
            cursor: pointer;
            &_right{
                color: var(--text-dec-color);
                &-bottom{
                    display: flex;
                }
            }
            &_pic{
                position: relative;
                width: 120px;
                overflow: hidden;
                border-radius: 6px;
                margin-right: 10px;
                .play-icon{
                    opacity: 1;
                }
                .img{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
            &_name{
                color: var(--text-normal-color);
                font-size: 1.3rem;
                padding: 5px 0;
                margin-top: 15px;
            }
            &_category{
                padding: 4px 4px 1px 4px;
                border: 1px solid  var(--el-text-color-primary);
                margin: 6px 0 12px;
                display: inline-block;
            }
            &_count{
                display: flex;
                align-items: center;
                .el-icon{
                    bottom: 2px;
                }
            }
        }
    }
    .private{
        display: flex;
        justify-content: space-between;
        color: var(--text-normal-color);
        &-item{
            flex: 0 0 30%;
            &_pic{
                position: relative;
                width: 100%;
                border-radius: 8px;
                overflow: hidden;
                margin-bottom: 10px;
                .img-icon{
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    background-color: rgba(120, 120, 120, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 0 2px 1px beige;
                    .icon-play{
                        font-size: 18px;
                    }
                }
                .img{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
            &_name{
                font-size: 1.5rem;
            }
        }
    }
</style>
