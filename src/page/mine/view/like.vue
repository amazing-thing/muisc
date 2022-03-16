<template>
  <div class="like-container">
    <var-app-bar color="transparent" :elevation="false">
      <template #left>
        <var-button class="btn" round text @click="goBack">
          <var-icon name="chevron-left" :size="34" color="#000000" />
        </var-button>
        <span class="title">歌单</span>
      </template>
    </var-app-bar>

    <var-loading type="circle" color="#2979ff" v-show="loading" />

    <wy-play-list-item-rc
      v-ripple="{ color: '#aaa' }"
      v-for="(item, index) in data"
      :key="item.id"
      class="song-class"
      :showImgPlay="false"
      :src="item.al.picUrl"
      :name="item.name"
      :detail="item.ar"
      :album="item.al.name"
      :privilege="allPrivileges[index]"
      albumPosition="bottom"
      :showImg="false"
      @click="music(item.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import model from "../model/index";
import { checkMusic } from "../../../utils/index";

type songType = {
  id: number;
  al: {
    picUrl: string;
    name: string;
  };
  name: string;
  ar: [];
};

type privilegeType = {
  id: string;
};

const router = useRouter();
const store = useStore();
const loading = ref(true);
const data = ref<songType[]>([]);
const allPrivileges = ref<privilegeType[]>([]);
const uid = localStorage.getItem("uid");

model.likeList(uid).then((res) => {
  songDetail(res.data.ids);
});

const songDetail = (uid: string[]) => {
  model.songDetail(uid).then((res) => {
    data.value = res.data.songs;
    allPrivileges.value = res.data.privileges;
    loading.value = false;
  });
};

const music = (musicId: number) => {
  checkMusic(musicId).then((res) => {
    if (res.data.success) {
      router.push({ name: "music", params: { id: musicId } });
    } else {
      store.commit("showSnackbar", res.data.message);
    }
  });
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.var-loading {
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translateX(-50%);
  z-index: 102;
}
.like-container {
  position: relative;
  z-index: 101;
  min-height: 100vh;
  background-color: white;
}
.like-container .title {
  color: black;
  font-weight: bold;
  font-size: 18px;
}
.song-class {
  padding: 10px 30px;
}
</style>
