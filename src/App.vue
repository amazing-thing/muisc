<template>
  <router-view></router-view>

  <var-tabs item-direction="vertical" color="#ffffff" active-color="#ef4136" inactive-color="#aaaaaa"
    indicator-size="0px" v-model:active="active" fixed-bottom>
    <var-tab name="1" @click="changeView({ name: 'home' })">
      <var-icon name="home-outline" />
      <div>发现</div>
    </var-tab>
    <var-tab name="3" @click="changeView({ name: 'mine' })">
      <var-icon name="account-circle-outline" />
      <div>我的</div>
    </var-tab>
  </var-tabs>

  <!-- 全局提示 -->
  <wy-snackbar v-model:show="show" :title="title" />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

type routerType = {
  name: string;
};

const active = ref("1");
const router = useRouter();

const changeView = (obj: routerType) => {
  router.push(obj);
};

const store = useStore();

const show = computed(() => store.state.snackbarShow);
const title = computed(() => store.state.snackbarTitle);
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

/* 验证码的输入居中 */
.valid .var-input__input {
  text-align: center;
}
img {
  pointer-events: none;
}

.var-tabs {
  border-top: 1px solid #ccc;
  --tabs-padding: 0;
  z-index: 100;
}
</style>
