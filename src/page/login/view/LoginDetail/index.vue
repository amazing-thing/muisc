<template>
  <div class="login-container">
    <div v-if="!regShow">
      <var-app-bar title="手机号登录" color="white" :elevation="false">
        <template #left>
          <var-button
            round
            text
            color="transparent"
            text-color="black"
            @click="goBack"
          >
            <var-icon name="window-close" :size="24" />
          </var-button>
        </template>
      </var-app-bar>
      <div class="step1" v-if="step">
        <div class="center">
          <div class="text">登录体验更多精彩</div>
          <div class="tip">未注册手机号登录后将自动创建账号</div>
        </div>
        <div class="container">
          <var-input v-model="phone">
            <template #prepend-icon>
              <span style="font-size: 15px; color: black">+86</span>
              <var-divider vertical />
            </template>
          </var-input>
          <var-button class="phone-login" @click="nextOne">下一步</var-button>
        </div>
      </div>
      <div class="step2" v-else>
        <div class="center">
          <div class="text">请输入验证码</div>
          <div class="tip">
            <span>已发送至+86 {{ phone }}</span>
            <var-countdown :time="60000" @end="end" v-show="reloadShow">
              <template #default="timeData">
                <span class="block">{{ timeData.seconds }}</span>
              </template>
            </var-countdown>
            <span class="reload" @click="nextOne" v-show="!reloadShow"
              >重新获取</span
            >
          </div>
          <div class="valid">
            <var-input v-model.trim="valide" @input="validChange" />
          </div>
        </div>
      </div>
    </div>
    <!-- 注册 -->
    <div v-else>
      <wy-reg :phone="phone" :captcha="valide" />
    </div>

    <!-- 加载动画 -->
    <var-loading type="circle" color="#2979ff" v-show="showLoading" />

    <!-- 提示框 -->
    <wy-snackbar :title="title" v-model:show="show"></wy-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { sentCaptch, checkCellphone, loginCellphone } from "../../model/index";
import WyReg from "../Reg/index.vue";

const store = useStore(); //全局数据
const router = useRouter(); //路由
const phone = ref(""); //手机号数据
const show = ref(false); //提示信息展示隐藏
const title = ref(""); //弹框文字
const step = ref(true); //第一步第二步显示
const reloadShow = ref(true); //重新发送显示
const valide = ref(""); //验证码
const showLoading = ref(false); //loading展示
const regShow = ref(false); //注册页面显示

const goBack = () => {
  //上一页
  router.back();
};

const tipReload = (titles: string) => {
  //提示重用
  show.value = true;
  title.value = titles;
};

const nextOne = () => {
  //  下一步/重新获取
  if (phone.value.length < 11) {
    tipReload("请输入11位数字的电话号");
    return;
  }

  showLoading.value = true;
  sentCaptch(phone.value).then(
    (res) => {
      if (res.status === 200) {
        if (res.data.data === false) {
          tipReload(res.data.message);
        } else {
          tipReload("发送成功，请查收");
          step.value = false;
        }

        showLoading.value = false;
        valide.value = "";
        return;
      }
    },
    (err) => {
      showLoading.value = false;
    }
  );
};

const end = () => {
  //重新发送显示
  reloadShow.value = false;
};

const validChange = () => {
  //登录校验
  if (valide.value.length === 4) {
    showLoading.value = true;
    //检查手机号是否已经注册
    checkCellphone(phone.value).then(
      (res) => {
        if (res.data.hasPassword) {
          //正式登陆
          loginCellphone(phone.value, valide.value).then(
            (res) => {
              if (res.status === 200) {
                document.cookie =
                  "token" +
                  "=" +
                  encodeURIComponent(res.data.cookie) +
                  ";path=/";

                store.commit("configUserId", res.data.account.id);
                localStorage.setItem("uid", res.data.account.id);
                tipReload("登陆成功!");
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
        } else {
          showLoading.value = false;
          regShow.value = true;
        }
      },
      (err) => {
        showLoading.value = false;
      }
    );
  }
};
</script>

<style scoped>
.login-container {
  position: relative;
  z-index: 101;
  width: 100vw;
  height: 100vh;
  background-color: white;
}
.var-app-bar {
  --app-bar-text-color: black;
}

.center {
  margin-left: 15px;
  margin-right: 15px;
  margin-top: 15px;
  letter-spacing: 1px;
  font-size: 17px;
}

.tip {
  font-size: 12px;
  color: #bbb;
}

.container {
  padding: 10px 10px;
  font-size: 14px;
}

.container {
  font-size: 15px;
}

.step2 .tip {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.step2 .tip .reload {
  font-size: 16px;
  color: blue;
}

.container .phone-login {
  margin-top: 30px;
  width: 100%;
  border: none;
  padding: 10px 0;
  font-size: 14px;
  background: #f74336;
  color: white;
  font-weight: bold;
  border-radius: 20px;
  box-shadow: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.valid {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.valid .var-input {
  width: 80px;
}
</style>
