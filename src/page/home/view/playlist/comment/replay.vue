<template>
  <var-popup
    position="bottom"
    v-model:show="show"
    @click-overlay="close"
    @closed="closed"
  >
    <div class="block">
      <div>
        <var-sticky :css-mode="true">
          <var-app-bar color="white" :elevation="false">
            <template #left>
              <var-button class="btn" round text @click="close">
                <var-icon name="chevron-left" :size="34" color="#000000" />
              </var-button>
              <span class="title">回复({{ totalCount }})</span>
            </template>
          </var-app-bar>
        </var-sticky>
        <div class="owner-comment" v-if="ownerComment">
          <wy-comment
            :src="ownerComment.user.avatarUrl"
            :nickname="ownerComment.user.nickname"
            :time="ownerComment.timeStr"
            :likedCount="ownerComment.likedCount"
            :liked="ownerComment.liked"
            :content="ownerComment.content"
            :showReplyCount="false"
            :showHr="false"
          />
        </div>
        <div class="line"></div>
        <div class="best-comments" v-if="bestComments.length > 0">
          <div class="pad">
            <div class="title">最赞回复</div>
            <wy-comment
              :src="bestComments[0].user.avatarUrl"
              :nickname="bestComments[0].user.nickname"
              :time="bestComments[0].timeStr"
              :likedCount="bestComments[0].likedCount"
              :liked="bestComments[0].liked"
              :content="bestComments[0].content"
              :showReplyCount="false"
              :showHr="false"
            />
          </div>
          <div class="line"></div>
        </div>

        <div class="comments">
          <div class="title">全部回复</div>
          <var-list
            :finished="finished"
            :finishedText="finishedText"
            v-model:loading="loading"
            @load="load"
            offset="30"
          >
            <var-cell v-for="(item, i) in comments" :key="item.commentId">
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
                :showReplyCount="false"
                @lickClick="lickClick($event, item.commentId, i)"
              />
            </var-cell>
          </var-list>
        </div>
      </div>
    </div>
  </var-popup>
</template>

<script setup lang="ts">
import model from "../../../model/index";
import { useRoute, useRouter } from "vue-router";
import { onBeforeUpdate, ref } from "vue";
import { useStore } from "vuex";

type ownerCommentType = {
  user: {
    userId: number;
    nickname: string;
    avatarUrl: string;
  };
  commentId: number;
  content: string;
  timeStr: string;
  liked: boolean;
  likedCount: number;
} | null;

type commentsType = {
  user: {
    userId: number;
    nickname: string;
    avatarUrl: string;
  };
  commentId: number;
  content: string;
  timeStr: string;
  parentCommentId: number;
  likedCount: number;
  liked: boolean;
};

const props = defineProps<{
  show: boolean;
  commentId: number;
}>();

const store = useStore();
const router = useRouter();
const route = useRoute();
const ownerComment = ref<ownerCommentType>(null);
const comments = ref<commentsType[]>([]);
const bestComments = ref<commentsType[]>([]);
const totalCount = ref(0);
const time = ref(0);
//分页
const loading = ref(false);
const finished = ref(false);
const finishedText = ref("没有更多了");
const divs = ref<any>([]);
const xtrTrue = ref(true); //分页时是否再次赋值

const request = () => {
  model
    .commentFloor(route.params.id, 2, props.commentId, time.value)
    .then((res) => {
      console.log(res);
      if (xtrTrue.value) {
        ownerComment.value = res.data.data.ownerComment;
        bestComments.value = res.data.data.bestComments;
        totalCount.value = res.data.data.totalCount;
        xtrTrue.value = false;
      }

      comments.value = [...comments.value, ...res.data.data.comments];

      time.value = res.data.data.time;

      if (!res.data.data.hasMore) {
        console.log(1);

        finished.value = true;
      }

      loading.value = false;
    });
};

const load = () => {
  setTimeout(() => {
    request();
  }, 1000);
};

const lickClick = (ev: any, commentId: number, i: number) => {
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

const close = () => {
  router.back();
};

const closed = () => {
  ownerComment.value = null;
  bestComments.value = [];
  totalCount.value = 0;
  xtrTrue.value = true;
  comments.value = [];
  time.value = 0;
};

//每次更新前重置ref
onBeforeUpdate(() => {
  divs.value = [];
});
</script>

<style scoped>
.block {
  height: 92vh;
}

.block .title {
  color: black;
}

.owner-comment {
  padding: 0 20px;
}

.best-comments {
}
.best-comments .pad {
  padding: 0 20px;
}

.best-comments .pad .title {
  font-size: 12px;
  margin-bottom: 10px;
  font-weight: bold;
}

.comments .title {
  font-size: 12px;
  margin-bottom: 10px;
  padding: 0 20px;
  font-weight: bold;
}
.line {
  background-color: rgba(245, 243, 243, 0.904);
  height: 8px;
  margin: 10px 0;
}
</style>
