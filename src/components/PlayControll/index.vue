<template>
    <div class="play-controll">
        <el-slider v-if="data.sound" class="slider-time" size="small" :format-tooltip="formatTooltip" :step="1" :min="0" :max="data.audio.dt / 1000" v-model="data.currentTime" @change="handleChangeAudioTime"/>
        <div class="audio-info">
            <img class="audio-info_img" :src="data.audio.pic"/>
            <div>
                <div class="audio-info_name">{{data.audio.name}}</div>
                <div class="audio-info_author">{{data.audio.author}}</div>
            </div>
        </div>
        <div class="controll">
            <span class="al-icon icon-prev" @click="handlePrev"></span>
            <span v-if="!data.play" class="al-icon icon-play" @click="handlePlay(data.playId)"></span>
            <span v-else class="al-icon icon-zt" @click="handlePaused"></span>
            <span class="al-icon icon-next" @click="handleNext"></span>
        </div>
        <div class="right-controll">
            <span class="al-icon icon-music-list" @click="handleShowDrawer"></span>
            <span class="al-icon icon-xh" v-if="data.playType === 1" @click="handleChangeType(2)"></span>
            <span class="al-icon icon-sjbf" v-if="data.playType === 2" @click="handleChangeType(3)"></span>
            <span class="al-icon icon-danqu" v-if="data.playType === 3" @click="handleChangeType(1)"></span>
            <span class="al-icon icon-laba" v-if="data.volume" @click="handleMuted"></span>
            <span class="al-icon icon-muted" v-if="data.volume === 0" @click="handleSound"></span>
            <el-slider size="small" :show-tooltip="false" :step="0.01" :min="0" :max="1" v-model="data.volume" @input="handleChangeVolume"/>
        </div>
    </div>
  <el-drawer custom-class="list-drawer" v-model="data.drawer" title="播放列表">
    <div v-if="data.audio.name">
      <div class="title">正在播放</div>
      <div class="audio-info">
        <img class="audio-info_img" :src="data.audio.pic"/>
        <div>
          <div class="audio-info_name">{{data.audio.name}}</div>
          <div class="audio-info_author">{{data.audio.author}}</div>
        </div>
        <span class="time">{{dayjs(data.audio.dt).format('mm:ss')}}</span>
      </div>
    </div>
    <div class="title">即将播放</div>
    <ul class="play-list">
      <li class="play-list_item" v-for="item in tracks" :key="item.id" @dblclick="handlePlay(item.id)">
        <img v-lazyImg="item.al.picUrl" class="play-list_item-img"/>
        <div class="play-list_item-info">
          <div class="name">{{item.name}}</div>
          <div class="ar">{{item.ar.map(i=>i.name).join('&')}}</div>
        </div>
        <span class="time">{{dayjs(item.dt).format('mm:ss')}}</span>
      </li>
    </ul>
  </el-drawer>
</template>
<script setup>
  import {Howl, Howler} from 'howler';
  import { reactive, toRaw, getCurrentInstance, onMounted } from 'vue'
  import { getAction } from '@/api/api';
  import { useMapState } from '@/utils/useMapState'
  import dayjs from 'dayjs'
  import { ElMessage } from 'element-plus'
  let { proxy } = getCurrentInstance()
  const shuffleArr = (arr) => {
    const copyArr = JSON.parse(JSON.stringify(arr))
    let n = copyArr.length, random;
    while(0!=n){
      random =  (Math.random() * n--) >>> 0; // 无符号右移位运算符向下取整
      //或者改写成 random = Math.floor(Math.random() * n--)
      [copyArr[n], copyArr[random]] = [copyArr[random], copyArr[n]] // ES6的解构赋值实现变量互换
    }
    return copyArr;
  }
  onMounted(()=>{
    proxy.$mitt.on('playSong',(id)=>{
      handlePlay(id)
    })
  })
  const {tracks} = useMapState(['tracks'])
    const data = reactive({
      drawer: false,
      play: false,
      sliderTime: null,
      volume: 0.5,
      jlvolume: 0.5,
      currentTime: 0,
      sound: null,
      audio:{
        name: '',
        author: '',
        pic: '',
        dt: 0
      },
      playId: null,
      playType: 1,
      playIndex: 0
    })
    const handleShowDrawer = ()=>{
      data.drawer = true
    }
    const formatTooltip = (value)=>{
      return dayjs(value * 1000).format('mm:ss')
    }
    const handleChangeAudioTime = ()=>{
      data.sound && data.sound.seek([data.currentTime])
    }
    const handleChangeType = (type)=>{
      data.playType = type
        // switch (type) {
        //   case 1:
        //     break
        //   case 2:
        //     break
        //   case 3:
        //     break
        // }
    }
    const handlePrev = ()=>{
      const index = toRaw(tracks.value).findIndex(i=>i.id === data.playId)
      if(index === 0){
        ElMessage({
          message: '已经是第一首了~',
          type: 'warning',
        })
        return
      }
      switch (data.playType) {
        case 2:
          const shuffle = shuffleArr(toRaw(tracks.value))
          handlePlay(shuffle[0].id, 'prev')
          break
        default:
          data.playIndex--
          handlePlay(toRaw(tracks.value)[data.playIndex].id, 'prev')
      }
    }
    const handleNext = ()=>{
      const index = toRaw(tracks.value).findIndex(i=>i.id === data.playId)
      if(toRaw(tracks.value).length <= 1){
        ElMessage({
          message: '播放列表里没歌啦~，再添加几首吧',
          type: 'warning',
        })
        return
      }
      if(index === tracks.value.length){
        data.playIndex = -1
      }
      switch (data.playType) {
        case 2:
          const shuffle = shuffleArr(toRaw(tracks.value))
          handlePlay(shuffle[0].id)
          break
        default:
          data.playIndex++
          handlePlay(toRaw(tracks.value)[data.playIndex].id)
      }
    }
    const handleMuted = ()=>{
      data.volume = 0
      Howler.volume(data.volume);
    }
    const handleSound = ()=>{
      data.volume = data.jlvolume || 0.5
      Howler.volume(data.volume);
    }
    const handleChangeVolume = (e)=>{
      data.jlvolume = e
      Howler.volume(e);
    }
    const handlePaused = ()=>{
      clearInterval(data.sliderTime)
      data.play = false
      data.sound && data.sound.pause()
    }
    const changeJDSlider = ()=>{
      data.currentTime = data.sound.seek()
      data.sliderTime = setInterval(()=>{
        data.currentTime = data.sound.seek()
      },1000)
    }
    const handlePlay = (id, type)=>{
      if(data.sound && !data.sound.playing() && data.playId===id){
        data.sound.play()
        data.play = true
        changeJDSlider()
        return
      }
      data.sound && data.sound.stop()
      data.playId = id
      const index = toRaw(tracks.value).findIndex(i=>i.id === id)
      data.playIndex = index
      getAction('/song/detail',{
        ids: id
      }).then(res=>{
        const info = res.data.songs[0]
        if([1, 4].includes(info.fee)){
          ElMessage({
            message: '暂无版权~',
            type: 'warning',
          })
          if(type === 'prev'){
            handlePrev()
            return
          }
          handleNext()
          return
        }
        data.audio.name = info.name
        data.audio.author = info.ar.map(item=>item.name).join('&')
        data.audio.pic = info.al.picUrl
        data.audio.dt = info.dt
        getAction('/song/url',{
          id
        }).then(res=>{
          const songInfo = res.data.data
          let url = songInfo[0].url
          data.sound = new Howl({
            src: [url],
            format: ['mp3', '.'],
            html5: true,
            usingWebAudio: true
          });
          data.sound.once('load', function(){
            Howler.volume(data.volume);
            data.currentTime = 0
            data.sound.play();
            data.play = true
            clearInterval(data.sliderTime)
            changeJDSlider()
          });
          data.sound.on('end', function(){
            data.play = false
            console.log('播放结束~');
            switch (data.playType) {
              case 1:
                if(!toRaw(tracks.value).length){
                  return
                }
                if(data.playIndex === toRaw(tracks.value).length){
                  data.playIndex = -1
                }
                data.playIndex++
                handlePlay(toRaw(tracks.value)[data.playIndex].id)
                break
              case 2:
                if(!toRaw(tracks.value).length){
                  return
                }
                const shuffle = shuffleArr(toRaw(tracks.value))
                handlePlay(shuffle[0].id)
                break
              case 3:
                handlePlay(data.playId)
                break
            }
          });
        })
      })
  }
</script>
<script>
  import { defineComponent } from 'vue'
  export default defineComponent( {
    name: 'PlayControll'
  })
</script>

<style lang="scss" scoped>
.play-controll{
    position: absolute;
    bottom: 0;
    height: 8vh;
    width: 100%;
    z-index: 99;
    color: var(--text-normal-color);
    backdrop-filter: saturate(180%) blur(30px);
    background-color: var(--color-navbar-bg);
    /*border-top: 1px solid seagreen;*/
    display: flex;
    align-items: center;
    .slider-time{
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      height: 2px;
      :deep .el-slider{
        &__button-wrapper{
          height: 32px;
        }
        &__bar{
          height: 2px;
        }
        &__runway{
          height: 2px;
        }
        &__button{
          width: var(--el-slider-time-button);
          height: var(--el-slider-time-button);
        }
      }
    }
    .audio-info{
        display: flex;
        height: 70%;
        &_img{
            width: 55px;
            margin: 0 15px;
            border-radius: 5px;
            box-shadow: 0 6px 8px -2px rgb(0 0 0 / 16%);
            cursor: pointer;
        }
        &_name{
            font-size: 1.5rem;
            margin-top: 5px;
        }
        &_author{
            color: var(--text-dec-color);
            margin-top: 10px;
        }
    }
    .controll{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .al-icon{
            font-size: 32px;
            cursor: pointer;
            padding: 8px;
            background: transparent;
            border-radius: 25%;
            transition: .2s;
            &:hover{
                background-color: hsla(0,0%,100%,0.08);
            }
        }
        .icon-play{
            position: relative;
            margin: 0 25px;
            bottom: 1px;
        }
        .icon-zt{
            margin: 0 25px;
        }
    }
    .right-controll{
        position: absolute;
        right: 10%;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        width: 15%;
        .al-icon{
            font-size: 20px;
            cursor: pointer;
            padding: 4px;
            margin: 0 6px;
            background: transparent;
            border-radius: 25%;
            transition: .2s;
            &:hover{
                background-color: hsla(0,0%,100%,0.08);
            }
        }
        .icon-music-list{
            position: relative;
            font-size: 24px;
            top: 2px;
        }
        .el-slider{
            width: 40%;
            margin-left: 3px;
        }
    }
}

.list-drawer {
  .title{
    font-size: 1.5rem;
    font-weight: bold;
  }
  .audio-info{
    display: flex;
    align-items: center;
    color: #fffaff;
    background-color: #72949a;
    padding: 10px;
    border-radius: 8px;
    margin: 10px 0;
    position: relative;
    &_img{
      width: 40px;
      height: 40px;
      border-radius: 4px;
      margin-right: 5px;
    }
    &_name{
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 3px;
    }
  }
  .time{
    position: absolute;
    right: 2%;
    top: 50%;
    transform: translateY(-50%);
  }
  .play-list{
    color: #fffaff;
    &_item{
      display: flex;
      align-items: center;
      padding: 10px;
      cursor: pointer;
      margin: 2px;
      position: relative;
      &:hover{
        box-shadow: 0 0 3px 1px slategray;
        background-color: #323232;
      }
      &:nth-child(2n){
        background-color: #323232;
      }
      &-img{
        width: 40px;
        height: 40px;
        border-radius: 4px;
        margin-right: 5px;
      }
      &-info{
        .name{
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 3px;
        }
        .time{
          justify-self: flex-end;
        }
      }
    }
  }
}
</style>
