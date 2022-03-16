<template>
  <div class="mail-container">
    <var-row>
      <var-col :span="18" class="mail-row">
        <textarea
          class="text"
          :placeholder="placeholder"
          :rows="rows"
          ref="text"
          v-model="value"
          @input="input"
          :style="{ height: changeHeight + 'px' }"
          @focus="focusClick()"
          @blur="blurClick"
        ></textarea>
      </var-col>
      <var-col :span="2"></var-col>
      <var-col :span="4">
        <var-button text :disabled="disabled" @click="emailClick"
          >发送</var-button
        >
      </var-col>
    </var-row>
  </div>

  <div class="bd" v-show="show" @click="bdClick"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import { useStore } from "vuex";

const value = ref("");
const rows = ref(1);
const text = ref(null);
const height = ref(0);
const changeHeight = ref(0);
const store = useStore();
const disabled = ref(true);
const placeholder = ref("写评论...");
const cmtId = ref(0);
const show = ref(false);

onMounted(() => {
  if (text.value) {
    const t = text.value as any;
    height.value = t.scrollHeight;
    changeHeight.value = t.scrollHeight;
  }
});

const emits = defineEmits(["emailClick"]);

const input = () => {
  if (value.value.length > 0) {
    disabled.value = false;
  } else {
    disabled.value = true;
  }

  if (text.value) {
    const t = text.value as any;
    changeHeight.value = height.value;
    nextTick(() => {
      changeHeight.value = t.scrollHeight;
    });
  }
};

const focusClick = (nickname?: string, commentId?: number) => {
  if (!document.cookie.match(/token/)) {
    store.commit("showSnackbar", "需要登录");
    if (text.value) {
      const t = text.value as any;
      t.blur();
    }
  } else {
    show.value = true;
    if (nickname && commentId) {
      if (text.value) {
        const t = text.value as any;
        t.focus();
        placeholder.value = `回复${nickname}`;
        cmtId.value = commentId;
      }
    }
  }
};

const blurClick = () => {
  placeholder.value = "写评论...";
};

const emailClick = () => {
  emits("emailClick", value.value, cmtId.value);

  value.value = "";
  disabled.value = true;
};

const clear = () => {
  cmtId.value = 0;
};

const bdClick = () => {
  show.value = false;
  blurClick();
  clear();
};

defineExpose({
  focusClick,
  clear,
});
</script>

<style scoped>
.bd {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 99;
  background-color: transparent;
}
.mail-container {
  width: 100vw;
  background-color: white;
  border-top: 1px solid rgb(238, 237, 237);
  padding-bottom: 5px;
  position: relative;
  z-index: 100;
}
.text {
  width: 100%;
  padding: 10px 0 10px 20px;
  border: none;
  outline: none;
  font-size: 14px;
  overflow-y: visible;
}
.send {
  font-size: 12px;
  padding-top: 8px;
}
</style>
