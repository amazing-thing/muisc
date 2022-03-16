<template>
  <var-col :span="4" style="margin-top: 12px">
    <div class="position">
      <div class="bd"></div>
      <var-image :src="src" :width="width" :height="height" radius="10" />
      <div
        :class="{ name: textMore, 'name-one': !textMore }"
        :style="{ width: width + 'px' }"
      >
        {{ name }}
      </div>
      <div class="playCount" v-if="showPlayCount">
        <div class="pic">
          <var-image :src="triangle" width="9" height="9" />
        </div>
        <span style="margin-right: 3px">{{ filterCount(playCount) }}</span>
      </div>
    </div>
  </var-col>
</template>

<script setup lang="ts">
import { filterCount } from "../../../utils/index";
import triangle from "../../../assets/triangle.png";

const props = withDefaults(
  defineProps<{
    src: string;
    name: string;
    playCount?: number;
    showPlayCount?: boolean;
    width?: string;
    height?: string;
    textMore?: boolean;
  }>(),
  {
    width: "106",
    height: "106",
    showPlayCount: true,
    playCount: 0,
    textMore: true,
  }
);

const theme = {
  width: props.width,
};
</script>

<script lang="ts">
export default {
  name: "WyPlayListItem",
};
</script>

<style scoped>
.position {
  position: relative;
}
.position .bd {
  position: absolute;
  width: 90%;
  height: 20px;
  top: -4px;
  left: 50%;
  border-radius: 7px;
  transform: translateX(-50%);
  background: rgb(240, 233, 233);
  z-index: -99999;
}
.position .name {
  font-size: 12px;
  margin-top: 4px;
  height: 34px;
  overflow: hidden;
  text-overflow: ellipsis;
  /* webkit内核私有属性，一般移动端浏览器是这种内核，所以在这不用做过多适配 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.position .name-one {
  font-size: 12px;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.position .playCount {
  position: absolute;
  top: 5px;
  right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  border-radius: 5px;
  color: white;
  padding: 1px 0;
  background: rgba(148, 125, 125, 0.3);
}
.position .playCount .pic {
  margin: 0 3px;
}
</style>
