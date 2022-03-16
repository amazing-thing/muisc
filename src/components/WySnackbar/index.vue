<template>
  <transition name="fade">
    <div>
      <div class="snackbar" v-show="show">{{ title }}</div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    show: boolean;
    title: string;
    duration?: number;
  }>(),
  {
    show: false,
    duration: 2000,
  }
);

const timer: Ref = ref(null);
const emit = defineEmits(["update:show"]);

const updataAfterDuration = () => {
  timer.value = setTimeout(() => {
    emit("update:show", false);
  }, props.duration);
};

watch(
  () => props.show,
  (show) => {
    if (show) {
      updataAfterDuration();
    } else if (show === false) {
      clearTimeout(timer.value);
    }
  }
);
</script>

<script lang="ts">
export default {
  name: "WySnackbar",
};
</script>

<style scoped>
.snackbar {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid white;
  background: white;
  width: 50%;
  text-align: center;
  padding: 10px 0;
  border-radius: 20px;
  font-size: 13px;
  box-shadow: 1px 1px 30px 1px #ccc;
  z-index: 99999;
}
</style>
