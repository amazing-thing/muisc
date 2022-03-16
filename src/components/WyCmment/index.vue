<template>
  <var-row class="wy-comment" v-ripple="{ color: '#aaa' }" @click="allClick">
    <var-col :span="3">
      <div class="img">
        <var-image :src="src" width="38" height="38" radius="100%" />
      </div>
    </var-col>
    <var-col :span="21">
      <var-row>
        <var-col class="info">
          <div class="left">
            <div class="title">{{ nickname }}</div>
            <div class="time">{{ time }}</div>
          </div>
          <div class="right" @click="lickClick">
            <div class="like" v-show="likeC">
              {{ filterCount(likeC, 1) }}
            </div>
            <var-icon name="star-outline" v-show="!like" />
            <var-icon name="star" color="red" v-show="like" />
          </div>
        </var-col>
        <var-col>
          <div class="content">{{ content }}</div>
        </var-col>
        <var-col class="btn" v-if="showReplyCount">
          <div style="display: flex" @click.stop="replayClick">
            <div class="replyCount">{{ replyCount }}条回复</div>
            <var-icon name="chevron-right" />
          </div>
        </var-col>
        <var-col>
          <div v-if="showHr" class="hr"></div>
        </var-col>
      </var-row>
    </var-col>
  </var-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { filterCount } from "../../utils/index";

const props = withDefaults(
  defineProps<{
    src: string;
    nickname: string;
    time: string;
    likedCount: number;
    liked: boolean;
    content: string;
    replyCount?: number;
    showReplyCount?: boolean;
    showHr?: boolean;
  }>(),
  {
    replyCount: 0,
    showHr: true,
    showReplyCount: true,
  }
);

const emits = defineEmits(["lickClick", "replayClick", "allClick"]);

const likeC = ref(props.likedCount);
const like = ref(props.liked);

const allClick = () => {
  emits("allClick");
};

const lickClick = () => {
  emits("lickClick", like.value);
};
const replayClick = () => {
  emits("replayClick");
};

const change = () => {
  if (like.value) {
    likeC.value--;
    like.value = !like.value;
  } else {
    likeC.value++;
    like.value = !like.value;
  }
};

defineExpose({
  change,
});
</script>

<script lang="ts">
export default {
  name: "WyComment",
};
</script>

<style scoped>
.var-row {
  position: relative;
  z-index: 2;
}
.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info .left {
  font-size: 10px;
  color: rgb(116, 114, 114);
}
.info .left .title {
  font-size: 12px;
  margin: 2px 0;
}
.info .left .time {
}

.info .right {
  display: flex;
  align-items: center;
}
.info .right .like {
  font-size: 11px;
  color: rgb(112, 111, 111);
  margin-right: 5px;
}

.content {
  margin: 8px 0 3px;
  letter-spacing: 0.8px;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  white-space: normal;
}

.btn {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: rgb(22, 93, 151);
}

.hr {
  padding-bottom: 8px;
  border-bottom: 1px solid #eeebeb;
}
</style>
