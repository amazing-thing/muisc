<!-- 综合 -->
<template>
  <div class="common-container">
    <var-loading type="circle" color="#2979ff" v-show="show1 || show2" />
    <div class="container" v-show="!show1 && !show2">
      <!-- <var-card subtitle="你可能感兴趣" v-if="hobby.length > 0">
      <template #description>
        <div class="hobby">
          <var-image :src="hobby[0]['picUrl']" width="64" height="64" radius="50%" fit="cover" />
          <div class="body">
            <div class="detail">
              <span class="song">歌手: </span>
              <span class="artist">{{ hobby[0]["name"] }}</span>
              <span class="alias">({{ hobby[0]["alias"][0] }})</span>
            </div>
            <div class="info">
              <span class="fansSize">粉丝: {{ filterCount(hobby[0]["fansSize"]) }}</span>
              <span class="musicSize">歌曲: {{ hobby[0]["musicSize"] }}</span>
            </div>
          </div>
        </div>
      </template>
      </var-card>-->
      <var-card class="songCard">
        <template #title>
          <div class="title">单曲</div>
        </template>
        <template #description>
          <div v-ripple="{ color: '#aaa' }" v-for="item in songData?.songs" :key="item['id']">
            <wy-play-list-item-rc
              class="song-class"
              :showImgPlay="false"
              :showImg="false"
              :src="item['al']['picUrl']"
              :name="item['name']"
              :detail="item['ar']"
              :album="item['al']['name']"
              :privilege="item['privilege']"
              albumPosition="bottom"
              @click="musicRouter(item['id'])"
            />
          </div>
          <div class="more" v-ripple="{ color: '#aaa' }" @click="More('1')">
            <span>查看更多歌曲</span>
            <var-icon name="chevron-right" />
          </div>
        </template>
      </var-card>
      <var-card class="playlistCard">
        <template #title>
          <div class="title">歌单</div>
        </template>
        <template #description>
          <!-- <div v-ripple="{ color: '#aaa' }" v-for="item in songData?.songs" :key="item['id']">
          <wy-play-list-item-rc class="song-class" :showImgPlay="false" :showImg="false" :src="item['al']['picUrl']"
            :name="item['name']" :detail="item['ar']" :album="item['al']['name']" :privilege="item['privilege']"
            albumPosition="bottom" @click="musicRouter(item['id'])" />
          </div>-->
          <div class="playlist" v-if="playlistData.length > 0">
            <wy-play-list-new
              class="playlist-item"
              v-ripple="{ color: '#aaa' }"
              v-for="item in playlistData"
              :key="item.id"
              :src="item.coverImgUrl"
              :name="item.name"
              :nickname="item.creator.nickname"
              :trackCount="item.trackCount"
              :playCount="item.playCount"
              @click="click(item.id)"
            />
          </div>
          <div class="more" v-ripple="{ color: '#aaa' }" @click="More('1000')">
            <span>{{ playlistMoretext }}</span>
            <var-icon name="chevron-right" />
          </div>
        </template>
      </var-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import model from "../../../../model/index";
// import { filterCount } from "../../../../../../utils/index";
import { useRouter } from "vue-router";
import { checkMusic } from "../../../../../../utils/index";
import { useStore } from "vuex";

type song = {
  songs: [];
} | null;

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
  active: string;
}>();

const eimts = defineEmits(["update:active"]);

const hobby = ref([]);
const router = useRouter();
const store = useStore();
const show1 = ref(true);
const show2 = ref(true);

const songData = ref<song>(null); //歌曲数据
const playlistData = ref<playlist[]>([]); //歌单数据
const playlistMoretext = ref("");
// const artistData = ref([]); //歌手数据

model.searcMultimatch(props.value).then((res) => {
  if (res.data.result.artist) {
    hobby.value = res.data.result.artist;
  }

  show1.value = false;
});

model.search(props.value, "1018").then((res) => {
  songData.value = res.data.result.song;
  playlistData.value = res.data.result.playList.playLists;
  playlistMoretext.value = res.data.result.playList.moreText;

  show2.value = false;

  // artistData.value = res.data.result.artist;
});

const musicRouter = (musicId: number) => {
  checkMusic(musicId).then((res) => {
    if (res.data.success) {
      router.push({ name: "music", params: { id: musicId } });
    } else {
      store.commit("showSnackbar", res.data.message);
    }
  });
};

const click = (id: number) => {
  //点击图片
  router.push({ name: "playlistDetail", params: { id } });
};

const More = (str: string) => {
  eimts("update:active", str);
};
</script>

<style scoped>
.common-container{
   background-color: white;
}
.var-card {
  margin-top: 20px;
}
.var-card.songCard {
  padding: 0;
}
.var-card.playlistCard {
  padding: 0;
}
.container {
  padding: 0 20px;
}
.hobby {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 0 20px;
}

.hobby .var-image {
  margin-right: 10px;
}

.hobby .body {
}
.hobby .body .detail {
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.hobby .body .detail .song {
  font-weight: bold;
}
.hobby .body .detail .artist {
  color: rgb(10, 113, 209);
  font-weight: bold;
  margin-right: 5px;
}
.hobby .body .detail .alias {
  color: rgb(138, 136, 136);
}
.hobby .body .info {
  color: rgb(175, 172, 172);
  font-size: 15px;
  margin-top: 5px;
}
.hobby .body .info .fansSize {
  margin-right: 4px;
}

.container .title {
  font-size: 20px;
  font-weight: bold;
  padding: 10px 0;
  margin: 0 10px;
  border-bottom: 1px solid rgb(241, 234, 234);
}
.container .song-class {
  padding: 10px 0px;
  margin: 0 20px;
  border-bottom: 1px solid rgb(241, 234, 234);
}

.container .more {
  font-size: 14px;
  text-align: center;
  padding: 10px 0;
}

.playlistCard {
}
.playlistCard .playlist {
  padding: 5px 20px;
}

.playlistCard .playlist .playlist-item {
  padding: 10px 0px;
}
</style>
