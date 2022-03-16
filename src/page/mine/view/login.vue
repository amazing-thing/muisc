<template>
  <div class="block">
    <div v-if="!loginShow" @click="login">
      立即登录 <var-icon name="chevron-right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

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
</script>

<style scoped>
.block {
  display: flex;
  justify-content: center;
}

.var-button {
  width: 100%;
}
</style>
