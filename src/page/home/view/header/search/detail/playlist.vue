<!-- 歌单 -->
<template>
  <var-list :finished="finished" v-model:loading="loading" @load="load" offset="20">
    <var-cell v-ripple="{ color: '#aaa' }" v-for="item in data" :key="item.id">
      <wy-play-list-new class="playlist-item" :src="item.coverImgUrl" :name="item.name"
        :nickname="item.creator.nickname" :trackCount="item.trackCount" :playCount="item.playCount"
        @click="click(item.id)" />
    </var-cell>
  </var-list>
</template>

<script setup lang="ts">
import { ref } from "vue";
import model from "../../../../model/index";
import { useRouter } from "vue-router";

type playlist = {
  id: number;
  coverImgUrl: string;
  name: string;
  creator: { nickname: string };
  trackCount: number;
  playCount: number;
};

const props = defineProps<{
  value: string;
}>();

const offset = ref(0); //分页
const data = ref<playlist[]>([]); //歌曲数据
const loading = ref(false);
const finished = ref(false);
const router = useRouter();

const load = () => {
  setTimeout(() => {
    model.searcCloudsearch(props.value, "1000", offset.value).then((res) => {
      offset.value += 30;
      data.value = [...data.value, ...res.data.result.playlists] as any;

      if (data.value.length === res.data.result.playlistCount) {
        finished.value = true;
      }

      loading.value = false;
    });
  }, 1000);
};

const click = (id: number) => {
  //点击图片
  router.push({ name: "playlistDetail", params: { id } });
};
</script>

<style scoped>
.var-list {
  background-color: white;
}
.playlist-item {
  padding: 0 10px;
}
</style>
