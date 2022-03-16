<template>
  <var-row align="center">
    <var-col :span="2" :offset="1">
      <var-icon name="menu" :size="32" @click="leftClick" />
    </var-col>
    <var-col :span="16" :offset="1">
      <var-input
        :hint="false"
        :line="false"
        :placeholder="placeholder"
        @focus="search"
      >
        <template #prepend-icon>
          <var-icon name="magnify" />
        </template>
      </var-input>
    </var-col>
    <var-col :span="2" :offset="1">
      <var-icon name="fire" :size="32" />
    </var-col>
  </var-row>

  <left v-model:show="leftShow" />
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import model from "../../model/index";
import { useRouter } from "vue-router";
import Left from "./left.vue";
import { onBeforeUnmount } from "vue";

const router = useRouter();
const placeholder = ref(""); //输入框初始值
const realkeyword = ref("");
const leftShow = ref(false);

const search = () => {
  router.push({
    name: "search",
    query: {
      placeholder: placeholder.value,
      realkeyword: realkeyword.value,
    },
  });
};

const leftClick = () => {
  leftShow.value = true;
};

model.searchDefault().then((res) => {
  placeholder.value = res.data.data.showKeyword;
  realkeyword.value = res.data.data.realkeyword;
});

const callback = () => {
  if (leftShow.value) {
    leftShow.value = false;
  }
};

window.addEventListener("popstate", callback, { passive: true });
onBeforeUnmount(() => {
  window.removeEventListener("popstate", callback, false);
});
</script>

<style scoped>
.var-input {
  border: none;
  width: 100%;
  height: 34px;
  border-radius: 100px;
  border: 1px solid #cccccc;
  background: white;
  padding: 0 4px;
  font-size: 14px;
  --input-placeholder-size: 14px;
}
</style>
