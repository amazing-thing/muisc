<template>
  <var-row>
    <var-col class="suggest-col" v-for="item in data" :key="item['keyword']" @click="click(item['keyword'])"
      v-ripple="{ color: '#aaa' }">
      <div class="suggest-container">
        <var-icon name="magnify-plus-outline" size="22" />
        <div class="keyword">{{ item["keyword"] }}</div>
      </div>
    </var-col>
  </var-row>
  <var-loading type="circle" color="#2979ff" v-show="loading" />
</template>

<script setup lang="ts">
import model from "../../../model/index";
import { ref, watch } from "vue";

const data = ref([]);
const props = defineProps<{
  value: string;
}>();

const loading = ref(false);
const emit = defineEmits(["click"]);
const timer = ref<any>(null); //防抖

const click = (keyword: string) => {
  emit("click", keyword);
};

const fun = () => {
  clearTimeout(timer.value);
  timer.value = setTimeout(() => {
    loading.value = true;
    model
      .searchSuggest(props.value)
      .then((res) => {
        data.value = res.data.result.allMatch;
      })
      .finally(() => {
        loading.value = false;
      });
  }, 500);
};

watch(
  () => props.value,
  () => {
    fun();
  },
  { immediate: true }
);
</script>

<style scoped>
.suggest-container {
  display: flex;
  align-items: center;
  height: 30px;
  margin-top: 10px;
  padding: 0 0 0 20px;
}

.suggest-container .keyword {
  flex: 1;
  margin-left: 10px;
  padding-bottom: 3px;
  border-bottom: 1px solid rgb(247, 243, 243);
}

.var-loading {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-60%);
}
</style>
