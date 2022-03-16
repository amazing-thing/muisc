<!-- 单曲 -->
<template>
  <var-list :finished="finished" v-model:loading="loading" @load="load" offset="20">
    <var-cell v-ripple="{ color: '#aaa' }" v-for="item in songData" :key="item['id']">
      <wy-play-list-item-rc class="song-class" :showImgPlay="false" :showImg="false" :src="item['al']['picUrl']"
        :name="item['name']" :detail="item['ar']" :album="item['al']['name']" :privilege="item['privilege']"
        albumPosition="bottom" @click="musicRouter(item['id'])" />
    </var-cell>
  </var-list>
</template>

<script setup lang="ts">
import { ref } from "vue";
import model from "../../../../model/index";
import { useRouter } from "vue-router";
import { checkMusic } from "../../../../../../utils/index";
import { useStore } from "vuex";

const props = defineProps<{
  value: string;
}>();

const offset = ref(0); //分页
const songData = ref([]); //歌曲数据
const loading = ref(false);
const finished = ref(false);
const router = useRouter();
const store = useStore();

const load = () => {
  setTimeout(() => {
    model.searcCloudsearch(props.value, "1", offset.value).then((res) => {
      offset.value += 30;
      songData.value = [...songData.value, ...res.data.result.songs] as any;

      if (songData.value.length === res.data.result.songCount) {
        finished.value = true;
      }

      loading.value = false;
    });
  }, 1000);
};

const musicRouter = (musicId: number) => {
  checkMusic(musicId).then((res) => {
    if (res.data.success) {
      router.push({ name: "music", params: { id: musicId } });
    } else {
      store.commit("showSnackbar", res.data.message);
    }
  });
};
</script>

<style scoped>
.var-list {
  background-color: white;
}
.var-cell {
  padding: 0;
}

.song-class {
  padding: 10px 10px;
  margin: 5px 20px;
  border-bottom: 1px solid rgb(241, 234, 234);
}

.play {
  padding: 10px 20px 0 20px;
}
.play .title {
  font-weight: bold;
  font-size: 18px;
}
</style>
