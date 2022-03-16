<template>
  <div class="new-container">
    <div class="image">
      <var-image :src="src" width="50" radius="10" />
    </div>
    <div class="main">
      <div class="name">{{name}}</div>
      <div class="info">{{filterInfo()}}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { filterCount } from "../../../utils";
const props = defineProps<{
  src: string;
  name: string;
  nickname: string;
  trackCount: number;
  playCount: number;
}>();

const filterInfo = () => {
  let str = "";
  str += props.trackCount + "首,";
  str += "by " + props.nickname + ",";
  str += "播放" + filterCount(props.playCount, 1) + "次";

  return str;
};
</script>

<script lang="ts">
export default {
  name: "WyPlayListNew",
};
</script>

<style scoped>
.new-container {
  display: flex;
  align-items: center;
}
.new-container .image {
  margin-right: 10px;
}
.new-container .main {
}
.new-container .main .name {
  font-size: 14px;
}
.new-container .main .info {
  font-size: 11px;
  color: rgb(163, 162, 162);
}
</style>