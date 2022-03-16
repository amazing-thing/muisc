<template>
  <div class="header">
    <wy-header />
    <wy-banner />
    <wy-list />
  </div>
  <wy-playlist />
</template>

<script setup lang="ts">
import wyHeader from "./view/header/index.vue";
import wyBanner from "./view/banner/index.vue";
import wyList from "./view/list/index.vue";
import wyPlaylist from "./view/playlist/index.vue";
</script>

<style scoped>
.header {
  background: linear-gradient(to bottom, #ebe4e4, white);
  width: 100%;
  height: auto;
  padding-top: 5px;
}
</style>
