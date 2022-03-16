<template>
  <div v-if="data && privileges" class="songContainer">
    <template v-if="show">
      <wy-play-list-item-rc
        v-ripple="{ color: '#aaa' }"
        class="song-class1"
        v-for="(item, index) in data"
        :key="item.id"
        :showImgPlay="false"
        :src="item.al.picUrl"
        :name="item.name"
        :detail="item.ar"
        :album="item.al.name"
        :privilege="privileges[index]"
        albumPosition="bottom"
        :showImg="false"
        @click="music(item.id)"
      ></wy-play-list-item-rc
    ></template>
    <template v-else>
      <var-list
        :finished="finished"
        v-model:loading="loading"
        @load="load"
        offset="20"
      >
        <var-cell
          v-ripple="{ color: '#aaa' }"
          v-for="(item, index) in song"
          :key="item.id"
        >
          <wy-play-list-item-rc
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
        </var-cell>
      </var-list>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import model from "../../../model/index";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import router from "../../../../../router";
import { checkMusic } from "../../../../../utils/index";

type privilegeType = {
  id: string;
};

type songType = {
  id: number;
  al: {
    picUrl: string;
    name: string;
  };
  name: string;
  ar: [];
};

const props = defineProps<{
  id: string | string[];
  data: Array<songType>;
  privileges: Array<privilegeType>;
  trackCount: number;
}>();

const song = ref<songType[]>([]);
const store = useStore();
const offset = ref(0); //分页
const loading = ref(false);
const finished = ref(false);
const show = ref(true);
const once = ref(true);
const response = ref([]);
const allPrivileges = ref<privilegeType[]>([]);
const route = useRoute();

if (document.cookie.match(/token/)) {
  show.value = false;
} else {
  store.commit("showSnackbar", "登录以获取完整歌单");
}

const load = () => {
  //登陆时加载数据
  setTimeout(async () => {
    if (once.value) {
      const res = await model.playlistTrackAll(props.id);

      response.value = res.data.songs;
      allPrivileges.value = res.data.privileges;

      once.value = false;
    }

    if (!response.value) {
      store.commit("showSnackbar", "参数错误,请稍后再试");
      loading.value = false;
      return;
    }

    offset.value++;
    song.value = response.value.slice(0, 20 * offset.value);

    if (song.value.length >= props.trackCount) {
      finished.value = true;
    }

    loading.value = false;
  }, 1000);
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

watch(
  () => route.params.id,
  () => {
    if (route.name === "playlistDetail") {
      song.value = [];
      finished.value = false;
      loading.value = true;
      once.value = true;
      load();
    }
  }
);
</script>

<style scoped>
.songContainer {
  padding: 0px 16px;
}

.song-class1 {
  padding: 10px;
}
</style>
