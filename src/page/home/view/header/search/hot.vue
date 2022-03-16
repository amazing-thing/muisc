<template>
  <var-loading v-show="loading" type="circle" color="#2979ff" />
  <div class="container" v-show="!loading">
    <div class="title">热搜榜</div>
    <var-card v-if="data.length > 0">
      <template #description>
        <var-row>
          <var-col
            span="12"
            v-for="(item, index) in datas"
            :key="item['alg']"
            style="display: flex; align-items: center"
            v-ripple="{ color: '#aaa' }"
            @click="find(item['searchWord'])"
          >
            <span :class="['index', { bg: index < 3 }]">{{ index + 1 }}</span>
            <span :class="['descript', { tt: index < 3 }]">{{
              item["searchWord"]
            }}</span>
            <span class="icon">
              <var-image
                v-if="item['iconUrl']"
                :src="item['iconUrl']"
                width="17"
                height="17"
              />
            </span>
          </var-col>
          <var-col>
            <div
              class="more"
              v-ripple="{ color: '#aaa' }"
              @click="more"
              v-show="datas.length === 10"
            >
              <span class="detail">展开更多热搜</span>
              <var-icon name="chevron-down" />
            </div>
          </var-col>
        </var-row>
      </template>
    </var-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import model from "../../../model/index";
const data = ref([]);
const datas = ref([]);
const emit = defineEmits(["click"]);
const loading = ref(true);

model.searchHotDetail().then((res) => {
  data.value = res.data.data;
  datas.value = data.value.slice(0, 10);
  loading.value = false;
});

const more = () => {
  datas.value = data.value;
};

const find = (searchWord: string) => {
  emit("click", searchWord);
};
</script>

<style scoped>
.container {
  margin: 10px 20px;
}
.container .title {
  margin-bottom: 15px;
  font-weight: bold;
}

.var-card {
  padding: 10px 20px 0;
}
.var-col {
  margin: 5px 0;
  width: 147px;
}
.index {
  width: 30px;
  color: #aaa;
}
.index.bg {
  color: red;
  font-weight: bold;
}
.tt {
  font-weight: bold;
}

.descript {
  margin-right: 8px;
  font-size: 14px;
  max-width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.more {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  color: rgb(158, 154, 154);
  font-weight: 520;
}

.more .detail {
}
</style>
