<template>
  <!--   -->
  <var-swipe class="swipe" :autoplay="2000">
    <var-swipe-item v-for="item in bannerList" :key="item.targetId"
      @click="bannerClick(item.targetId, item.targetType)">
      <img class="swipe-item" :src="item.pic" />
      <var-chip v-if="item.titleColor === 'blue'" type="primary" size="small" :round="false">{{ item.typeTitle }}
      </var-chip>
      <var-chip v-else type="danger" size="small" :round="false">{{
        item.typeTitle
      }}</var-chip>
    </var-swipe-item>
  </var-swipe>
</template>

<script lang="ts">
export default {
  name: "banner",
};
</script>

<script setup lang="ts">
import { ref } from "vue";
import model from "../../model/index";
import { useRouter } from "vue-router";

type bannerType = {
  pic: string; //图片
  typeTitle: string; //歌曲类型
  titleColor: string; //歌曲类型颜色
  targetId: string; //歌曲id
  targetType: number; //类型 3000数字专辑//1歌曲
};

const bannerList = ref<bannerType[]>([]);
const router = useRouter();

model.banner().then((res) => {
  bannerList.value = res.data.banners;
});

const bannerClick = (targetId: string, targetType: number) => {
  if (targetType === 1) {
    router.push({ name: "music", params: { id: targetId } });
  }
};
</script>

<style scoped>
.swipe {
  position: relative;
  height: 160px;
  border-radius: 15px;
  margin: 10px 20px;
}

.swipe-item {
  width: 100%;
  height: 100%;
  object-fit: fill;
  box-sizing: border-box;
}

.var-chip {
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 12px 0 0 0;
}
</style>
