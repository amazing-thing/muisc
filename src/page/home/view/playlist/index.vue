<template>
  <div class="playlist-container">
    <wy-play-list title="推荐歌单" @rightBtn="common.clickBtn" model="row">
      <wy-play-list-item
        v-for="item in common.list.value"
        :key="item.id"
        :src="item.picUrl"
        :name="item.name"
        :playCount="item.playcount | item.playCount"
        @click="common.click(item)"
        width="100"
        height="100"
      />
    </wy-play-list>
  </div>

  <div class="playlist-container2">
    <div class="title">推荐新音乐</div>
    <div class="song-class1" v-for="item in newSong" :key="item.id">
      <wy-play-list-item-rc
        v-ripple="{ color: '#aaa' }"
        :showImgPlay="false"
        :src="item.picUrl"
        :name="item.name"
        :detail="item.song.artists"
        :album="item.song.album.name"
        :privilege="item.song.privilege"
        albumPosition="bottom"
        @click="music(item.id)"
      ></wy-play-list-item-rc>
    </div>
    <!--   -->
  </div>
</template>

<script setup lang="ts">
//推荐歌单 分登录与未登录
import { ref } from "vue";
import model from "../../model/index";
import Personalized from "../../../../hooks/playList/Personalized";
import RecommendResource from "../../../../hooks/playList/RecommendResource";
import { checkMusic } from "../../../../utils/index";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

let common: any;

const emits = defineEmits(["playlist"]);

if (document.cookie) {
  common = RecommendResource(emits);
} else {
  common = Personalized(emits);
}

type newsongType = {
  id: number;
  name: string;
  picUrl: string;
  song: {
    album: {
      name: string;
    };
    privilege: {};
    artists: [];
  };
};

const newSong = ref<newsongType[]>([]);
const store = useStore();
const router = useRouter();

model.personalizedSongs().then((res) => {
  newSong.value = res.data.result;
});

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
.playlist-container {
  height: 29vh;
  margin-top: 0.1vh;
  border-bottom: 1px solid white;
  border-radius: 0 0 10px 10px;
}
.playlist-container2 {
  margin-top: 5px;
  padding: 0px 15px;
  margin-bottom: 10vh;
}
.playlist-container2 .title {
  font-weight: bold;
  font-size: 18px;
}
.playlist-container2 .song-class1 {
  padding: 8px 0;
}
</style>
