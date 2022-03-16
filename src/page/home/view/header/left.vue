<template>
  <var-popup position="left" v-model:show="show" @click-overlay="close">
    <div class="block">
      <var-row>
        <var-col>
          <var-button v-if="loginShow" @click="logout">退出登录</var-button>
          <var-button v-if="!loginShow" @click="login">立即登录</var-button>
        </var-col>
      </var-row>
    </div>
  </var-popup>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  show: Boolean,
});

const emits = defineEmits(["update:show"]);
const router = useRouter();
const loginShow = ref<string | null>();

if (document.cookie.match(/token/)) {
  const val = document.cookie.match(/token/);
  if (val) {
    loginShow.value = val["input"];
  }
}

const logout = () => {
  document.cookie = "token=0;expires=" + new Date().toUTCString() + ";path=/";
  router.replace({ name: "login" });
};

const login = () => {
  router.replace({ name: "login" });
};

const close = () => {
  router.back();
};

watch(
  () => props.show,
  () => {
    if (props.show) {
      window.history.pushState(
        {
          title: "title",
          url: "#",
        },
        "",
        "#"
      );
    }
  }
);
</script>

<style scoped>
.block {
  padding: 20px 24px;
  width: 70vw;
}

.var-button {
  width: 100%;
}
</style>
