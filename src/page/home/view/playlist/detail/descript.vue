<template>
  <var-popup
    :overlay-style="{
      backgroundColor: '#424249',
    }"
    v-model:show="show"
  >
    <div class="block" @click="close">
      <div class="scrool">
        <div class="image">
          <var-image :src="coverImgUrl" width="170" height="170" radius="10%" />
        </div>
        <div class="name">{{ name }}</div>
        <div class="tags">
          <span class="tag">标签:</span>
          <span class="info-0" v-if="tags.length === 0">无</span>
          <span v-for="item in tags" :key="item" class="info" v-else>
            {{ item }}</span
          >
        </div>
        <div class="descript" style="white-space: pre-wrap" v-if="description">
          {{ description }}
        </div>
        <div class="descript" v-else>暂无描述</div>
      </div>
    </div>

    <div class="download" @click.stop="download">保存封面</div>
  </var-popup>
</template>

<script setup lang="ts">
import { v4 as uuid4 } from "uuid";
import { watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const emits = defineEmits(["update:show", "update:backState"]);
const props = defineProps<{
  show: boolean;
  description: string | null;
  tags: Array<string>;
  name: string;
  coverImgUrl: string;
}>();

const download = () => {
  const uuid = uuid4();
  const cover = props.coverImgUrl;
  const u = cover.split("").reverse();
  let str = "";
  for (let i = 0; i < u.length; i++) {
    str += u[i];

    if (u[i] == ".") {
      break;
    }
  }
  str = str.split("").reverse().join("");

  let x = new XMLHttpRequest();
  x.open("GET", props.coverImgUrl, true);
  x.responseType = "blob";
  x.send();
  x.onload = () => {
    let url = window.URL.createObjectURL(x.response);
    let a = document.createElement("a");
    console.log(url);

    a.href = url;
    a.download = uuid + str;
    a.click();
  };
};

const close = () => {
  router.back();
};

function pushHistroy() {
  let state = {
    title: "title",
    url: "#",
  };

  window.history.pushState(state, "title", "#");
}

watch(
  () => props.show,
  () => {
    if (props.show) {
      pushHistroy();
    }
  }
);
</script>

<style scoped>
.var-popup {
  --popup-content-background-color: none;
}

.block {
  width: 100vw;
  height: 100vh;
}
.block .scrool {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  height: 89vh;
  overflow-y: scroll;
}

.block .image {
  margin-top: 50px;
}

.block .image .var-image {
  overflow: hidden;
}

.block .name {
  color: rgb(224, 218, 218);
  margin-top: 15px;
}

.block .tags {
  margin-top: 30px;
  margin-left: 20px;
  align-self: flex-start;
  color: rgb(224, 218, 218);
}
.block .tags .tag {
  font-size: 14px;
  margin-right: 10px;
}

.block .tags .info {
  background-color: rgb(109, 101, 101);
  margin-right: 5px;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 20px;
}

.block .tags .info-0 {
  font-size: 12px;
}
.block .descript {
  margin-top: 20px;
  margin-left: 20px;
  align-self: flex-start;
  color: rgb(224, 218, 218);
  font-size: 12px;
}
.download {
  position: fixed;
  left: 50%;
  bottom: 5%;
  transform: translateX(-50%);
  color: rgb(224, 218, 218);
  border: 1px solid #ccc;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 12px;
}
</style>
