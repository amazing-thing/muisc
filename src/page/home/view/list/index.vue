<template>
  <var-row>
    <var-col
      :span="4"
      @click="listClick(item.name)"
      v-for="item in data"
      :key="item.title"
    >
      <div class="bg">
        <var-image :src="item.src" width="30" height="30" />
        <span class="today" v-if="item.title === '每日推荐'">{{ today }}</span>
      </div>
      <div>{{ item.title }}</div>
    </var-col>
  </var-row>
</template>

<script setup lang="ts">
import rili from "../../../../assets/rili.png";
import gedan from "../../../../assets/gedan.png";
import paihangbang from "../../../../assets/paihangbang.png";
import sanyecao from "../../../../assets/sanyecao.png";
import shoucang from "../../../../assets/shoucang.png";
import shouyinjin from "../../../../assets/shouyinji.png";
import youxi from "../../../../assets/youxi.png";
import zhibo from "../../../../assets/zhibo.png";
import zhuanji from "../../../../assets/zhuanji.png";
import { ref } from "vue";
import { useRouter } from "vue-router";

const data = [
  { title: "每日推荐", src: rili, name: "recommend" },
  { title: "私人FM", src: shouyinjin, name: "recommond" },
  { title: "歌单", src: gedan, name: "recommond" },
  { title: "排行榜", src: paihangbang, name: "recommond" },
  { title: "直播", src: zhibo, name: "recommond" },
  { title: "数字专辑", src: zhuanji, name: "recommond" },
  { title: "专注冥想", src: sanyecao, name: "recommond" },
  { title: "歌房", src: shoucang, name: "recommond" },
  { title: "游戏专区", src: youxi, name: "recommond" },
];

let router = useRouter();

const today = ref(new Date().getDate());

const listClick = (name: string) => {
  router.push({ name });
};
</script>

<style scoped>
.var-row {
  flex-wrap: nowrap;
  overflow-y: scroll;
  font-size: 13px;
  padding: 0 0 10px 15px;
}

.var-row::-webkit-scrollbar {
  display: none;
}

.var-col {
  margin-right: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bg {
  position: relative;
  width: 40px;
  height: 40px;
  background: #fcd5d5;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3px;
}
.today {
  position: absolute;
  color: white;
  top: 39%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  font-size: 11px;
  font-weight: 500;
}
</style>
