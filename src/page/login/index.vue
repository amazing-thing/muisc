<template>
  <div class="bg">
    <var-image class="title" :src="title" width="60%" />
    <div class="bar-container">
      <var-image class="bar" :src="bar" />
      <div class="ctn">此项目仅以学习为目的,请支持正版</div>
    </div>
    <div v-if="cookie">
      <var-countdown :time="6000" @end="end" @click="tick">
        <template #default="timeData">
          <span class="block">{{ timeData.seconds }} 秒</span>
        </template>
      </var-countdown>
    </div>
    <div v-else>
      <var-button class="phone-login" @click="click">手机号登录</var-button>
      <var-button class="trying" @click="tick">立即体验</var-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import title from "../../assets/title.png";
import bar from "../../assets/bar.png";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter(); //路由
const cookie = ref(document.cookie);

const click = () => {
  //手机号登录
  router.push({
    name: "loginDetail",
  });
};

const end = () => {
  //倒计时结束触发
  router.push({
    name: "home",
  });
};

const tick = () => {
  //点击跳转时触发
  router.push({
    name: "home",
  });
};
</script>

<style scoped>
.bg {
  position: relative;
  z-index: 101;
  width: 100vw;
  height: 100vh;
  background: #db2b1f;
}

.title {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
}

.bar-container {
  position: absolute;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
}
.bar-container .ctn {
  position: absolute;
  top: -40%;
  font-size: 13px;
  white-space: nowrap;
}

.phone-login {
  position: absolute;
  top: 75%;
  left: 50%;
  width: 65%;
  transform: translateX(-50%);
  border: none;
  padding: 10px 0;
  font-size: 14px;
  color: #db2b1f;
  font-weight: bold;
  border-radius: 20px;
  box-shadow: none;
}

.trying {
  position: absolute;
  top: 82%;
  left: 50%;
  width: 65%;
  transform: translateX(-50%);
  border: none;
  padding: 10px 0;
  font-size: 14px;
  color: white;
  font-weight: bold;
  border: 0.1vw solid rgba(238, 237, 237, 0.3);
  border-radius: 20px;
  box-shadow: none;
  background: #db2b1f;
}

.block {
  position: absolute;
  top: 1%;
  right: 5%;
  display: inline-block;
  width: 60px;
  padding: 6px 0;
  text-align: center;
  background: white;
  border-radius: 20px;
}
</style>
