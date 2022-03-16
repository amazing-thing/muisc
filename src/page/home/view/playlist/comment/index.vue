<template>
  <div class="comment-container">
    <var-app-bar color="transparent" :elevation="false">
      <template #left>
        <var-button class="btn" round text @click="goBack">
          <var-icon name="chevron-left" :size="34" color="#000000" />
        </var-button>
        <span class="title" v-if="totalCounts">评论({{ totalCounts }})</span>
      </template>
    </var-app-bar>
    <div class="comment">
      <div class="title">评论区</div>
      <var-tabs v-model:active="active" :indicator-size="0">
        <var-tab name="1">推荐</var-tab>
        <var-tab name="2">最热</var-tab>
        <var-tab name="3">最新</var-tab>
      </var-tabs>
    </div>
    <div class="main">
      <var-list
        :finished="finished"
        :finishedText="finishedText"
        v-model:loading="loading"
        @load="load"
      >
        <var-cell v-for="(item, i) in comment" :key="item.commentId">
          <wy-comment
            :ref="
              (el) => {
                if (el) divs[i] = el;
              }
            "
            class="wy-comment"
            :src="item.user.avatarUrl"
            :nickname="item.user.nickname"
            :time="item.timeStr"
            :likedCount="item.likedCount"
            :liked="item.liked"
            :content="item.content"
            :replyCount="item.showFloorComment.replyCount"
            :showReplyCount="item.showFloorComment.showReplyCount"
            @lickClick="lickClick($event, item.commentId, i)"
            @replayClick="replayClick(item.commentId)"
            @allClick="allClick(item.user.nickname, item.commentId)"
          />
        </var-cell>
      </var-list>
    </div>

    <div class="botton">
      <mail ref="emailRef" @emailClick="emailClick" />
    </div>

    <div class="more">
      <replay v-model:show="replayShow" :commentId="commentId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import model from "../../../model/index";
import { useRoute, useRouter } from "vue-router";
import { onBeforeUnmount, onBeforeUpdate, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import Mail from "./mail.vue";
import Replay from "./replay.vue";

type commentType = {
  content: string; //内容
  commentId: number; //评论id
  liked: boolean; //是否点赞
  likedCount: number; //点赞人数
  timeStr: string; //时间
  showFloorComment: {
    //评论回复数据
    replyCount: number; //评论回复数
    showReplyCount: boolean; //是否展示
  };
  user: {
    //评论人
    avatarUrl: string; //图片
    nickname: string; //名称
    userId: number; //评论人id
  };
};

const divs = ref<any>([]);
const active = ref("1");
const route = useRoute();
const router = useRouter();
const comment = ref<commentType[]>([]);
const totalCounts = ref(0);
const pageNo = ref(1); //分页
const loading = ref(false);
const finished = ref(false);
const cursor = ref("");
const store = useStore();
const finishedText = ref("没有更多了");
const replayShow = ref(false);
const commentId = ref(0);
const emailRef = ref(null);

const load = () => {
  setTimeout(() => {
    model
      .commentPlaylist(
        route.params.id,
        2,
        active.value,
        pageNo.value,
        cursor.value
      )
      .then((res) => {
        pageNo.value++;
        totalCounts.value = res.data.data.totalCount;
        comment.value = [...comment.value, ...res.data.data.comments];
        if (comment.value.length === 0) {
          finishedText.value = "暂无评论,欢迎抢沙发";
        } else {
          finishedText.value = "没有更多了";
        }
        if (res.data.data.comments.length === 0) {
          finished.value = true;
        }
        if (active.value === "3") {
          cursor.value = res.data.data.cursor;
        }
        loading.value = false;
      });
  }, 1000);
};

const goBack = () => {
  router.back();
};

//点赞
const lickClick = (ev: Event, commentId: number, i: number) => {
  if (!document.cookie.match(/token/)) {
    store.commit("showSnackbar", "需要登录");
    return;
  }

  if (!ev) {
    //点赞
    model.commentLike(route.params.id, 2, commentId, 1).then(() => {
      divs.value[i].change(); //点赞
      store.commit("showSnackbar", "点赞成功");
    });
  } else {
    model.commentLike(route.params.id, 2, commentId, 0).then(() => {
      divs.value[i].change();
      store.commit("showSnackbar", "取消成功");
    });
  }
};

//每次更新前重置ref
onBeforeUpdate(() => {
  divs.value = [];
});

//回复量
const replayClick = (id: number) => {
  window.history.pushState({}, "", `#`);
  commentId.value = id;
  replayShow.value = true;
};

//点击某个评论
const allClick = (nickname: string, commentId: number) => {
  let t = emailRef.value as any;
  t.focusClick(nickname, commentId);
};

//发送消息
const emailClick = (content: string, commentId?: number) => {
  if (commentId === 0) {
    model.comment(route.params.id, 2, 1, content).then((res) => {
      comment.value = [];
      loading.value = true;
      finished.value = false;
      pageNo.value = 1;
      load();
      store.commit("showSnackbar", "发表成功");
    });
  } else {
    let t = emailRef.value as any;
    model.comment(route.params.id, 2, 2, content, commentId).then((res) => {
      comment.value = [];
      loading.value = true;
      finished.value = false;
      pageNo.value = 1;
      load();
      store.commit("showSnackbar", "回复成功");
    });
    t.clear();
  }
};

//返回
onMounted(() => {
  if (window.history) {
    window.addEventListener("popstate", callback, { passive: true });
  }
});

const callback = () => {
  if (replayShow.value) {
    replayShow.value = false;
  }
};

onBeforeUnmount(() => {
  window.removeEventListener("popstate", callback, false);
});

watch(active, () => {
  comment.value = [];
  loading.value = true;
  finished.value = false;
  pageNo.value = 1;
  load();
});
</script>

<style scoped>
.comment-container {
  position: relative;
  z-index: 105;
  background-color: white;
  min-height: 100vh;
}
.title {
  color: rgb(2, 2, 2);
  font-size: 18px;
  font-weight: bold;
}

.comment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.comment .title {
  font-size: 12px;
}
.comment .var-tabs {
  --tabs-padding: 0;
}
.comment .var-tabs .var-tab {
  --tab-padding: 10px;
  --tab-font-size: 12px;
}

.main {
  margin-bottom: 40px;
}

.var-list {
  --list-finished-height: 50px;
}
.var-cell {
  padding: 0;
}
.main .wy-comment {
  padding: 0px 20px;
  padding-top: 10px;
}

.botton {
  position: fixed;
  bottom: 0;
  z-index: 999;
}

.more {
  position: relative;
  z-index: 100;
}
</style>
