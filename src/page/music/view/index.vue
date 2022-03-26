<template>
  <div class="container">
    <div class="top">
      <div v-if="data">
        <div class="header">
          <div class="name">{{ data.name }}</div>
          <div class="ar">{{ add() }}</div>
        </div>
        <div class="main" @click="show = !show">
          <div class="image" v-show="show">
            <var-image :src="require('../../../assets/player-disc.png')" width="235" />
            <var-image :src="data.al.picUrl" width="140" radius="100" />
          </div>
          <div v-show="!show" class="lrc">
            <div
              :class="{
                color:
                  currentTime >= lrcTime[index] &&
                  currentTime < lrcTime[index + 1],
              }"
              :style="{ top: textTop + 'px' }"
              :ref="
                (el) => {
                  if (el) divs[index] = el;
                }
              "
              v-for="(item, index) in lrc"
              :key="index"
            >{{ item }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <audio ref="audioRef" controls autoplay :src="src" hidden></audio>
      <div class="point">
        <var-row align="center">
          <var-col span="4">
            <span>{{ filterTime(currentTime) }}</span>
          </var-col>
          <var-col span="16" class="progress">
            <div
              class="drag"
              @touchmove="touchmoves"
              @touchend="touchend"
              :style="{ left: dragLeft + '%' }"
            ></div>
            <div ref="progressRef">
              <var-progress :value="progressValue"></var-progress>
            </div>
          </var-col>
          <var-col span="4">
            <span class="right">{{ filterTime(duration) }}</span>
          </var-col>
        </var-row>
      </div>
    </div>
    <div class="play">
      <var-icon
        v-if="!likeShow"
        name="heart-outline"
        size="24"
        color="#e29f3e"
        @Click="likeMusic(true)"
      />
      <var-icon v-else name="heart" size="24" color="#e29f3e" @Click="likeMusic(false)" />
      <div class="play-stop">
        <div v-show="playShow" @click="playSong(true)">
          <svg
            t="1646468380724"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4640"
            width="41"
            height="41"
          >
            <path
              d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024z m3.008-92.992a416 416 0 1 0 0-832 416 416 0 0 0 0 832zM383.232 287.616l384 224.896-384 223.104v-448z"
              fill="#e6e6e6"
              p-id="4641"
            />
          </svg>
        </div>
        <div v-show="!playShow" @click="playSong(false)">
          <svg
            t="1646468340738"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3786"
            width="42"
            height="42"
          >
            <path
              d="M413.866667 320c-17.066667 0-32 14.933333-32 32v320c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-320c0-17.066667-14.933333-32-32-32zM605.866667 320c-17.066667 0-32 14.933333-32 32v320c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-320c0-17.066667-14.933333-32-32-32z"
              fill="#e6e6e6"
              p-id="3787"
            />
            <path
              d="M509.866667 32C245.333333 32 32 247.466667 32 512s213.333333 480 477.866667 480S987.733333 776.533333 987.733333 512 774.4 32 509.866667 32z m0 896C281.6 928 96 742.4 96 512S281.6 96 509.866667 96 923.733333 281.6 923.733333 512s-185.6 416-413.866666 416z"
              fill="#e6e6e6"
              p-id="3788"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import model from "../model/index";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { onBeforeUpdate, onMounted, onUnmounted, ref } from "vue";
import { filterTime, filterMusic } from "../../../utils/index";

type arType = {
  id: number;
  name: string;
};

type musicType = {
  name: string;
  ar: arType[];
  al: {
    id: number;
    picUrl: string;
  };
} | null;

const store = useStore();
const route = useRoute();
const data = ref<musicType>(null);
const src = ref("");
const audioRef = ref(null);
const duration = ref<string | number>(""); //总时间
const currentTime = ref<string | number>(""); //当前时间
const show = ref(true); //歌词封面切换
const lrc = ref<string[] | number[]>([]); //歌词
const lrcTime = ref<string[] | number[]>([]);
const progressValue = ref(0); //进度条
const timer = ref<any>(null); //节流
const textTime = ref<any>(null);
const playShow = ref(true); //播放按钮显示
const dragLeft = ref(0);
const textTop = ref(0); //歌词滚动
const progressRef = ref(null);
const progressLeft = ref<string | number>(0);
const progressRight = ref<string | number>(0);
const progressWidth = ref<string | number>(0);
const likeShow = ref(false);
const ids = ref<string[]>([]);
const uid = localStorage.getItem("uid");
const divs = ref<any>([]);

//每次更新前重置ref
onBeforeUpdate(() => {
  divs.value = [];
});

//歌曲信息
model.songDetail(route.params.id).then((res) => {
  data.value = res.data.songs[0];
  add();
});

//歌曲歌词
model.lyricMusic(route.params.id).then((res) => {
  lrc.value = filterMusic(res.data.lrc.lyric)[0];
  lrcTime.value = filterMusic(res.data.lrc.lyric)[1];
});

//歌曲
src.value = model.music(route.params.id);

onMounted(() => {
  if (audioRef.value) {
    const ref = audioRef.value as any;
    ref.addEventListener("canplay", canplay, { passive: true });

    ref.addEventListener("timeupdate", timeupdate, { passive: true });
  }

  if (progressRef.value) {
    const ref = progressRef.value as any;
    const rect = ref.getBoundingClientRect();
    progressLeft.value = rect.left.toFixed(0);
    progressRight.value = rect.right.toFixed(0);
    progressWidth.value = rect.width.toFixed(0);
  }
});

const canplay = () => {
  if (audioRef.value) {
    const ref = audioRef.value as any;
    ref
      .play()
      .then(() => {
        playShow.value = false;
      })
      .catch(() => {
        playShow.value = true;
      });

    duration.value = Math.floor(ref.duration);
  }
};

const timeupdate = () => {
  if (audioRef.value) {
    const ref = audioRef.value as any;
    currentTime.value = Math.floor(ref.currentTime);
    if (!duration.value) {
      duration.value = Math.floor(ref.duration);
    }
    //进度条
    if (!timer.value) {
      timer.value = setTimeout(() => {
        progressValues(currentTime.value, duration.value);
        timer.value = null;
      }, 1000);
    }

    //歌词滚动
    scrollText();
  }
};

//进度换算
const progressValues = (a: string | number, b: string | number) => {
  progressValue.value = Number((Number(a) / Number(b)).toFixed(3)) * 100;
  dragLeft.value = Number((Number(a) / Number(b)).toFixed(3)) * 100;
};

//作者换算
const add = () => {
  let str = "";

  if (data.value?.ar.length === 1) {
    return data.value?.ar[0]["name"];
  } else {
    data.value?.ar.forEach((item, index) => {
      str += item.name + "/";
    });

    return str.slice(0, -1);
  }
};

//是否放歌
const playSong = (play: boolean) => {
  if (audioRef.value) {
    const ref = audioRef.value as any;
    if (play) {
      ref.play();
      playShow.value = false;
    } else {
      ref.pause();
      playShow.value = true;
    }
  }
};

//进度条移动
const touchmoves = (ev: any) => {
  //   dragLeft
  if (
    Number(
      (
        (ev.targetTouches[0].pageX.toFixed(0) - Number(progressLeft.value)) /
        Number(progressWidth.value)
      ).toFixed(2)
    ) < 0
  ) {
    dragLeft.value = 0;
    progressValue.value = 0;
  } else if (
    Number(
      (
        (ev.targetTouches[0].pageX.toFixed(0) - Number(progressLeft.value)) /
        Number(progressWidth.value)
      ).toFixed(2)
    ) > 1
  ) {
    dragLeft.value = 100;
    progressValue.value = 100;
  } else {
    dragLeft.value =
      Number(
        (
          (ev.targetTouches[0].pageX.toFixed(0) - Number(progressLeft.value)) /
          Number(progressWidth.value)
        ).toFixed(2)
      ) * 100;
    progressValue.value =
      Number(
        (
          (ev.targetTouches[0].pageX.toFixed(0) - Number(progressLeft.value)) /
          Number(progressWidth.value)
        ).toFixed(2)
      ) * 100;
  }
};

//调整进度条
const touchend = () => {
  if (audioRef.value) {
    const ref = audioRef.value as any;
    ref.currentTime = Number(duration.value) * (dragLeft.value / 100);
  }
};

//歌词滑动
const scrollText = () => {
  if (!textTime.value) {
    textTime.value = setTimeout(() => {
      lrcTime.value.forEach((item, index) => {
        if (item === currentTime.value) {
          textTop.value = -(index - 4) * 30;
        }
      });
      textTime.value = null;
    }, 1000);
  }
};

//是否喜欢的歌曲
model.likeList(uid).then((res) => {
  ids.value = res.data.ids;

  for (let i = 0; i < ids.value.length; i++) {
    if (ids.value[i] == route.params.id) {
      likeShow.value = true;
      break;
    }
  }
});

//喜欢歌曲
const likeMusic = (like: boolean) => {
  if (!document.cookie.match(/token/)) {
    store.commit("showSnackbar", "需要登录");
    return
  }
  model.likeMusic(route.params.id, like).then((res) => {
    if (like) {
      likeShow.value = true;
    } else {
      likeShow.value = false;
    }
  }
  );
};

onUnmounted(() => {
  if (audioRef.value) {
    const ref = audioRef.value as any;
    ref.removeEventListener("canplay", canplay, false);
    ref.removeEventListener("timeupdate", timeupdate, false);
  }
});
</script>

<style scoped>
.container {
  position: relative;
  z-index: 101;
  height: 100vh;
  background-color: rgb(65, 64, 64);
}
.container .top {
  height: 84vh;
}
.container .header {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 8vh;
  padding-top: 3vh;
}
.container .header .name {
  color: rgb(221, 218, 218);
  font-size: 18px;
}
.container .header .ar {
  color: rgba(148, 146, 146, 0.8);
  font-size: 14px;
}
.container .main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 76vh;
}

@keyframes image {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.container .main .image {
  display: flex;
  align-items: center;
  justify-content: center;
  animation-name: image;
  animation-duration: 30s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.main .lrc {
  height: 50%;
  overflow-y: scroll;
  color: rgb(184, 186, 189);
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main .lrc > div {
  line-height: 30px;
  transition: all 1s ease;
  position: relative;
  width: 70vw;
  display: flex;
  justify-content: center;
  word-break: break-all;
}
.var-image {
  position: absolute;
  z-index: 2;
}
.container .bottom {
  height: 6vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.bottom .point {
  width: 70vw;
}
.bottom .point span {
  font-size: 11px;
  color: rgb(194, 188, 188);
}
.bottom .point .right {
  margin-left: 10px;
  font-size: 10px;
  color: rgb(194, 188, 188);
}
.bottom .point .progress {
  position: relative;
}
.bottom .point .var-progress {
  margin-top: 4px;
  font-size: 10px;
  color: rgb(155, 151, 151);
}

.bottom .point .drag {
  position: absolute;
  left: 0%;
  bottom: -40%;
  background-color: rgb(63, 100, 202);
  transform: translateX(-90%);
  width: 10px;
  height: 10px;
  border-radius: 10px;
  z-index: 5;
  transition: all 0.2s;
}

.container .play {
  height: 10vh;
  display: flex;
  align-items: center;
}

.container .play .var-icon {
  position: absolute;
  left: 25%;
}

.container .play .play-stop {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.color {
  color: rgb(211, 67, 67);
}
</style>
