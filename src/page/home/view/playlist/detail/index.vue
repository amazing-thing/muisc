<template>
  <div class="detail-container">
    <div class="container" :style="{ height: containerHeight + 'px' }">
      <var-app-bar color="transparent" :elevation="false">
        <template #left>
          <var-button class="btn" round text @click="goBack">
            <var-icon name="chevron-left" :size="34" />
          </var-button>
          <span class="title">歌单</span>
        </template>
      </var-app-bar>

      <transition>
        <div v-if="playlist">
          <var-row :style="{ height: height + 'px' }">
            <var-col :span="changeS" class="left">
              <var-image :src="playlist?.coverImgUrl" radius="10%" />
              <div class="playCount" v-if="show">
                <div class="pic">
                  <var-image :src="triangle" width="9" height="9" />
                </div>
                <span style="margin-right: 3px">{{
                  filterCount(playlist.playCount)
                }}</span>
              </div>
            </var-col>
            <var-col :span="changeL" offset="1" class="center">
              <div class="name">
                <span>{{ playlist.name }}</span>
                <var-icon
                  name="chevron-down"
                  :size="26"
                  color="#ffffff"
                  @click="click"
                  v-if="show"
                />
                <var-icon
                  v-else
                  name="chevron-up"
                  :size="26"
                  color="#ffffff"
                  @click="click"
                />
              </div>
              <div class="btn" v-if="show">
                <div class="nickname">
                  <var-image
                    :src="playlist.creator.avatarUrl"
                    radius="50%"
                    width="24"
                    height="24"
                  />
                  <span>{{ playlist.creator.nickname }}</span>
                </div>
                <div
                  class="description"
                  v-ripple="{ color: '#aaa' }"
                  @click="descriptShow = true"
                >
                  <div class="detail" v-if="playlist.description">
                    {{ playlist.description + "" }}
                  </div>
                  <div v-else>介绍: 无</div>
                  <var-icon name="chevron-right" />
                </div>
              </div>
            </var-col>
          </var-row>
          <div class="related" v-if="!show">
            <div class="name">相关歌单推荐</div>
            <var-row :gutter="10" class="row">
              <wy-play-list-item
                v-for="item in relatedData"
                :key="item.id"
                :src="item.coverImgUrl"
                :name="item.name"
                :showPlayCount="false"
                width="90"
                height="90"
                :textMore="false"
                @click="push(item.id)"
              />
            </var-row>
          </div>

          <div class="info var-elevation--3">
            <div class="subscribedCount">
              <var-icon name="plus-circle-outline" />
              <span>{{ filterCount(playlist.subscribedCount) }}</span>
            </div>
            <span>|</span>
            <div class="commentCount" @click="commentRouter">
              <var-icon name="message-text-outline" />
              <span>{{ filterCount(playlist.commentCount) }}</span>
            </div>
            <span>|</span>
            <div class="shareCount">
              <var-icon name="content-copy" />
              <span>{{ filterCount(playlist.shareCount) }}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div v-if="playlist">
      <more :trackCount="playlist.trackCount" />

      <song
        :id="route.params.id"
        :data="playlist.tracks.slice(0, 5)"
        :privileges="privileges"
        :trackCount="playlist.trackCount"
      />

      <descript
        v-model:show="descriptShow"
        :name="playlist.name"
        :description="playlist.description"
        :tags="playlist.tags"
        :coverImgUrl="playlist.coverImgUrl"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Model from "../../../model/index";
import triangle from "../../../../../assets/triangle.png";
import { filterCount } from "../../../../../utils/index";
import More from "./more.vue";
import Song from "./song.vue";
import Descript from "./descript.vue";

type playlistType = {
  coverImgUrl: string;
  playCount: number;
  name: string;
  creator: {
    nickname: string;
    avatarUrl: string;
  };
  description: string;
  subscribedCount: number;
  commentCount: number;
  shareCount: number;
  tracks: [];
  trackCount: number;
  tags: Array<string>;
} | null;

type relatedType = {
  coverImgUrl: string;
  id: string;
  name: string;
  creator: {
    userId: string;
    nickname: string;
  };
};

const route = useRoute();
const router = useRouter();
const playlist = ref<playlistType>(null);
const privileges = ref([]);
const show = ref(true);
const changeS = ref(8);
const changeL = ref(14);
const relatedData = ref<relatedType[]>([]); //相关歌单数据
const height = ref(120);
const containerHeight = ref(250);
const descriptShow = ref(false);

const play = (fn?: any) => {
  Model.playlistDetail(route.params.id)
    .then((res) => {
      playlist.value = res.data.playlist;
      privileges.value = res.data.privileges;
    })
    .finally(() => {
      if (fn) {
        fn();
        relatedData.value = [];
      }
    });
};

play();

const click = () => {
  if (changeS.value === 8) {
    changeS.value = 4;
    changeL.value = 18;
    show.value = false;
    height.value = 80;
    containerHeight.value = 340;
    if (relatedData.value.length === 0) {
      related();
    }
  } else {
    changeS.value = 8;
    changeL.value = 14;
    height.value = 120;
    show.value = true;
    containerHeight.value = 250;
  }
};

//相关歌单推荐
const related = () => {
  Model.relatedPlaylist(route.params.id).then((res) => {
    relatedData.value = res.data.playlists;
  });
};

const push = (id: string) => {
  router.push({ name: "playlistDetail", params: { id } });
};

const goBack = () => {
  router.back();
};

const commentRouter = () => {
  router.push({
    name: "playlistComment",
    params: { id: route.params.id },
  });
};

onMounted(() => {
  if (window.history) {
    window.addEventListener("popstate", callback, { passive: true });
  }
});

const callback = () => {
  if (descriptShow.value) {
    descriptShow.value = false;
  }
};

onBeforeUnmount(() => {
  window.removeEventListener("popstate", callback, false);
});

watch(
  () => route.params.id,
  () => {
    if (route.name === "playlistDetail") {
      play(click);
    }
  }
);
</script>

<style scoped>
.detail-container {
  position: relative;
  min-height: 100vh;
  z-index: 101;
  background-color: white;
}
.container {
  width: 100vw;
  position: relative;
  z-index: 1;
  overflow: hidden;
}
.container::after {
  content: "";
  position: absolute;
  top: 0;
  left: -40%;
  width: 180%;
  height: 90%;
  border-radius: 0 0 40% 40%;
  z-index: -1;
  background-image: linear-gradient(45deg, #93a5cf 0%, #84e6b0 100%);
}
.container .btn {
  position: relative;
  z-index: 999;
}
.container .title {
  font-size: 20px;
}

.container .var-row {
  padding: 0 0 0 20px;
  /* flex-wrap: nowrap; */
  transition: all 0.5s ease;
}

.container .left {
  position: relative;
}
.container .left .playCount {
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  border-radius: 5px;
  color: white;
  padding: 1px 0;
  background: rgba(148, 125, 125, 0.3);
}
.container .left .playCount .pic {
  margin: 0 3px;
}

.container .center {
  position: relative;
  height: 100%;
}

.container .center .name {
  display: flex;
  color: white;
  font-size: 14px;
  font-weight: 540;
  margin-top: 5px;
}
.container .center .name span {
  width: 90%;
}
.container .center .name .var-icon {
  float: right;
}
.container .center .btn {
  position: absolute;
  bottom: 0px;
}
.container .center .nickname {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #6d6969;
  margin-bottom: 5px;
}
.container .center .nickname .var-image {
  margin-right: 5px;
}

.container .center .description {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #6d6969;
}

.container .center .description .detail {
  width: 50vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.related {
  padding: 0 10px 0 0;
}

.related .name {
  padding: 0 20px;
  font-size: 11px;
  color: #e4efe9;
  letter-spacing: 1px;
}

.related .row {
  flex-wrap: nowrap;
  overflow-y: scroll;
}

.var-row::-webkit-scrollbar {
  display: none;
}

.info {
  display: flex;
  justify-content: space-around;
  width: 55vw;
  position: absolute;
  left: 50%;
  bottom: 10%;
  transform: translate(-50%, 50%);
  background: white;
  padding: 10px 10px;
  border-radius: 20px;
  font-size: 13px;
  color: #6b5656;
}
.info .var-icon {
  margin-right: 3px;
}
.info div {
  display: flex;
  align-items: center;
  margin: 0 1px;
}
</style>
