<template>
  <div class="search-container">
    <var-sticky>
      <var-app-bar :elevation="false" color="white">
        <template #left>
          <var-button round text @click="goBack">
            <var-icon name="chevron-left" :size="34" color="black" />
          </var-button>
        </template>
        <!-- @click="search" /> -->

        <var-input v-model="value" :placeholder="placeholder" :hint="false" @keyup.enter="search" @clear="clear"
          :clearable="true" @input="input" />
      </var-app-bar>
    </var-sticky>

    <suggest v-if="suggestShow" :value="value" @click="suggestSearch" />
    <div v-else>
      <hot @click="changeValue" v-if="show" />
      <detail v-else :value="value" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Hot from "./hot.vue";
import Detail from "./detail/index.vue";
import Suggest from "./suggest.vue";

const router = useRouter();
const route = useRoute();
const value = ref("");
const show = ref(true);
const suggestShow = ref(false);

//展示关键字
const placeholder = computed(() => {
  if (route.query.placeholder) {
    return route.query.placeholder;
  }

  return "";
});

//搜索建议
const input = () => {
  if (value.value === "") {
    suggestShow.value = false;
    show.value = true;
  } else {
    suggestShow.value = true;
  }
};

//搜索关键字
const realkeyword = computed(() => {
  if (route.query.realkeyword) {
    return route.query.realkeyword;
  }

  return "";
});

//搜索
const search = () => {
  if (value.value === "") {
    value.value = realkeyword.value as any;
  }
  show.value = false;
  suggestShow.value = false;
};

//清除
const clear = () => {
  show.value = true;
  suggestShow.value = false;
};

const suggestSearch = (keyword: string) => {
  value.value = keyword;
  search();
};

//点击热搜榜搜索
const changeValue = (searchWord: string) => {
  value.value = searchWord;
  search();
};

//返回上一级
const goBack = () => {
  router.back();
};
</script>

<style scoped>
.search-container {
  position: relative;
  z-index: 101;
  height: 100vh;
  background-color: white;
}
.var-input {
  width: 80vw;
}
</style>
