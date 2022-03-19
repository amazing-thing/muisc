<template>
  <div class="commend">
    <var-loading v-if="show" type="circle" color="#2979ff" />
    <div v-else>
      <div class="container">
        <var-app-bar color="transparent" :elevation="false">
          <template #left>
            <var-button class="btn" round text @click="goBack">
              <var-icon name="chevron-left" :size="34" />
            </var-button>
          </template>
        </var-app-bar>
        <div class="time">
          <span class="date">{{ date }}</span>
          <span>/</span>
          <span class="month">{{ month }}</span>
        </div>
      </div>
      <div class="play" v-ripple="{ color: '#ccc' }">
        <var-row align="center">
          <var-col span="3">
            <var-icon name="play-circle" color="red" size="32" />
          </var-col>
          <var-col span="15">
            <span class="title">播放全部</span>
          </var-col>
        </var-row>
      </div>
      <wy-play-list-item-rc v-ripple="{ color: '#aaa' }" class="song-class" v-for="item in data" :key="item['id']"
        :showImgPlay="false" :src="item['al']['picUrl']" :name="item['name']" :detail="item['ar']"
        :album="item['al']['name']" :privilege="item['privilege']" albumPosition="bottom" @click="music(item['id'])" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { filterDate } from "../../../../../utils/index";
import model from "../../../model/index";
import { checkMusic } from "../../../../../utils/index";

const data = ref([]);
const router = useRouter();
const store = useStore();
const show = ref(true);

const date = computed(() => {
  let date = new Date();
  let str = filterDate(date.getDate());
  return str;
});
const month = computed(() => {
  let date = new Date();
  let str = filterDate(date.getMonth() + 1);
  return str;
});

const goBack = () => {
  router.back();
};

const request = () => {
  model.recommendSongs().then((res) => {
    data.value = res.data.data.dailySongs;
    show.value = false;
  });
};

if (document.cookie.match(/token/)) {
  request();
} else {
  store.commit("showSnackbar", "需要登录");
  router.back();
}

const music = (id: number) => {
  checkMusic(id).then((res) => {
    if (res.data.success) {
      router.push({ name: "music", params: { id } });
    } else {
      store.commit("showSnackbar", res.data.message);
    }
  });
};
</script>

<style scoped>
.var-loading {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
}
.commend {
  position: relative;
  z-index: 101;
  background-color: white;
  min-height: 100vh;
}
.container {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
  z-index: 1;
  margin-bottom: 10px;
}
.container::after {
  content: "";
  position: absolute;
  top: 0;
  left: -40%;
  width: 180%;
  height: 100%;
  border-radius: 0 0 45% 45%;
  z-index: 1;
  background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
}
.container .btn {
  position: relative;
  z-index: 999;
}
.container .time {
  position: absolute;
  bottom: 20%;
  left: 5%;
  color: white;
  font-weight: bold;
  z-index: 3;
}
.container .time .date {
  font-size: 28px;
}
.container .time .month {
  font-size: 18px;
}
.play {
  padding: 10px;
}
.play .title {
  font-weight: bold;
  font-size: 18px;
}

.song-class {
  padding: 10px;
}
</style>
