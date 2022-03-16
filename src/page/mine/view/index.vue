<template>
  <div class="container">
    <var-loading v-show="loading" type="circle" color="#2979ff" />
    <div v-show="!loading">
      <div class="info">
        <var-card>
          <template #description>
            <div class="img">
              <div class="img-container" v-if="!loginShow">
                <svg
                  t="1646644518768"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2200"
                  width="72"
                  height="72"
                >
                  <path
                    d="M512 0a512 512 0 1 0 512 512A512 512 0 0 0 512 0zM213.333 832A298.667 298.667 0 0 1 512 533.333a170.667 170.667 0 1 1 170.667-170.666A170.667 170.667 0 0 1 512 533.333 298.667 298.667 0 0 1 810.667 832z"
                    p-id="2201"
                    fill="#1296db"
                  ></path>
                </svg>
              </div>
              <var-image
                v-if="profile"
                :src="profile.avatarUrl"
                width="72"
                heigth="72"
                radius="72"
              />
            </div>

            <div class="bottom">
              <div class="nickname">{{ profile?.nickname }}</div>
              <login />
            </div>
          </template>
        </var-card>
      </div>
      <div class="like">
        <var-cell
          title="我喜欢的音乐"
          v-ripple="{ color: '#ccc' }"
          @click="routerLink('like')"
        >
          <template #icon>
            <var-icon name="heart" color="red" />
          </template>
        </var-cell>
        <var-cell
          title="最近播放"
          v-ripple="{ color: '#ccc' }"
          @click="routerLink('record')"
        >
          <template #icon>
            <var-icon name="play-circle" color="red" />
          </template>
        </var-cell>
        <!-- <var-cell
          title="设置"
          v-ripple="{ color: '#ccc' }"
          @click="routerLink('set')"
        >
          <template #icon>
            <var-icon name="cog" color="red" />
          </template>
        </var-cell> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import login from "./login.vue";
import model from "../model/index";
import { useRouter } from "vue-router";
import { ref } from "vue";
import store from "../../../store";

type profileType = {
  avatarUrl: string; //头像
  nickname: string;
} | null;

const profile = ref<profileType>(null);
const loginShow = ref(false);
const loading = ref(true);
const router = useRouter();

if (document.cookie.match(/token/)) {
  loginShow.value = true;
  model.userCount().then((res) => {
    profile.value = res.data.profile;
    loading.value = false;
  });
} else {
  loading.value = false;
}

const routerLink = (name: string) => {
  if (document.cookie.match(/token/)) {
    router.push({ name });
  } else {
    store.commit("showSnackbar", "需要登录");
  }
};
</script>

<style scoped>
.container {
  padding: 0 20px;
  height: 100vh;
}
.container .var-loading {
  position: absolute;
  left: 50%;
  top: 10vh;
  transform: translateX(-50%);
  z-index: 3;
}
.container .info {
  margin-top: 100px;
  position: relative;
}

.container .info .img {
  position: absolute;
  left: 50%;
  top: -50%;
  transform: translateX(-50%);
  background-color: white;
}
.container .info .img .img-container {
  text-align: center;
}
.container .info .bottom {
  text-align: center;
  margin-top: 6vh;
  font-size: 16px;
  font-weight: bold;
}

/* like */
.container .like {
  margin-top: 30px;
}
</style>
