<template>
  <!-- 与你共赴黑暗 -->
  <var-tabs v-model:active="active">
    <var-tab name="1018">综合</var-tab>
    <var-tab name="1">单曲</var-tab>
    <var-tab name="1000">歌单</var-tab>
    <!-- <var-tab name="1014">视频</var-tab> -->
    <!-- <var-tab name="100">歌手</var-tab> -->
    <!-- <var-tab name="1006">歌词</var-tab> -->
    <!-- <var-tab name="10">专辑</var-tab>
    <var-tab name="1002">用户</var-tab> -->
  </var-tabs>

  <var-tabs-items v-model:active="active" :can-swipe="false">
    <var-tab-item name="1018">
      <common v-model:active="active" :value="value" />
    </var-tab-item>
    <var-tab-item name="1">
      <song :value="value" />
    </var-tab-item>
    <var-tab-item name="1000">
      <playlist :value="value" />
    </var-tab-item>
    <!-- <var-tab-item name="100">
      <artist :value="value" />
    </var-tab-item> -->
    <!-- <var-tab-item name="1006">
      {{ active }}
    </var-tab-item> -->
    <!-- <var-tab-item name="10">
      <album :value="value" />
    </var-tab-item>
    <var-tab-item name="1002">
      <user :value="value" />
    </var-tab-item> -->
  </var-tabs-items>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import Album from "./album.vue";
// import Artist from "./artist.vue";
import Playlist from "./playlist.vue";
import Song from "./song.vue";
// import User from "./user.vue";
import Common from "./common.vue";

const active = ref("1018");

defineProps<{
  value: string;
}>();
</script>

<style scoped>
.var-tab {
  padding: 0;
}
</style>
