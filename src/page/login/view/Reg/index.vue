<template>
  <var-app-bar title="昵称编辑" color="white" :elevation="false">
    <template #left>
      <var-button
        round
        text
        color="transparent"
        text-color="black"
        @click="goBack"
      >
        <var-icon name="chevron-left" :size="24" />
      </var-button>
    </template>
  </var-app-bar>
  <div class="center">
    <var-image :src="Reg" width="150" height="150" />
    <div>你希望大家怎么称呼你呢？</div>
  </div>
  <div class="input">
    <var-input v-model="nickname" clearable />
  </div>
  <div class="reg">
    <var-button class="phone-reg" @click="reg">开启云音乐</var-button>
  </div>

  <!-- 加载动画 -->
  <var-loading type="circle" color="#2979ff" v-show="showLoading" />

  <!-- 提示框 -->
  <wy-snackbar :title="title" v-model:show="show"></wy-snackbar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register, loginCellphone } from "../../model/index";
import Reg from "../../../../assets/reg.png";
import { useStore } from "vuex";

const props = defineProps<{
  phone: string;
  captcha: string;
}>();

const router = useRouter(); //路由
const nickname = ref(""); //昵称
const store = useStore(); //全局数据
const show = ref(false); //提示信息展示隐藏
const title = ref(""); //弹框文字
const showLoading = ref(false); //loading展示

const goBack = () => {
  //返回登录页
  router.replace({
    name: "login",
  });
};

const tipReload = (titles: string) => {
  //提示重用
  show.value = true;
  title.value = titles;
};

const reg = () => {
  //初始化名称
  showLoading.value = true;
  register(props.phone, props.captcha, nickname.value).then(
    (res) => {
      if (res.status === 200) {
        //注册成功
        loginCellphone(props.phone, props.captcha).then(
          (res) => {
            if (res.status === 200) {
              document.cookie = encodeURIComponent(res.data.cookie) + ";path=/";
              store.commit("configUserId", res.data.account.id);
              tipReload("注册成功!");
              showLoading.value = false;
              router.push({
                name: "home",
              });
            }
          },
          (err) => {
            showLoading.value = false;
          }
        );
      }
    },
    (err) => {
      router.push({
        name: "login",
      });
      showLoading.value = false;
    }
  );
};
</script>

<style scoped>
.var-app-bar {
  --app-bar-text-color: black;
}

.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  letter-spacing: 1px;
  color: rgb(99, 96, 96);
}

.input {
  padding: 15px;
}

.reg {
  margin: 15px;
}
.phone-reg {
  width: 100%;
  border: none;
  padding: 10px 0;
  font-size: 14px;
  color: white;
  background: #db2b1f;
  font-weight: bold;
  border-radius: 20px;
  box-shadow: none;
}
</style>
