<template>
  <var-loading type="circle" color="#2979ff" v-show="loading" />
  <div class="set-container">
    <var-app-bar color="transparent" :elevation="false">
      <template #left>
        <var-button class="btn" round text @click="goBack">
          <var-icon name="chevron-left" :size="34" color="#000000" />
        </var-button>
        <span class="title">设置</span>
      </template>
    </var-app-bar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "../../../store";
import model from "../model/index";

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const uid = localStorage.getItem("uid");

console.log(store.state.uid);

model.userBinding(uid).then((res) => {
  console.log(res);
  loading.value = false;
});

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.var-loading {
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translateX(-50%);
  z-index: 102;
}
.set-container {
  position: relative;
  z-index: 101;
  height: 100vh;
  background-color: white;
  min-height: 100vh;
}
.set-container .title {
  color: black;
  font-weight: bold;
  font-size: 18px;
}
</style>
