<template>
  <div class="container">
    <var-row>
      <var-col :span="18">
        <div class="left">
          <div v-if="!$slots.title">{{ title }}</div>
          <slot name="title" v-else />
        </div>
      </var-col>
      <var-col :span="6">
        <div class="right">
          <span class="more" @click="rightBtn">
            <span>
              <var-icon :name="iconName" v-if="iconPosition === 'left'" />
              <span
                :class="{
                  'pd-left': iconPosition === 'right',
                  'pd-right': iconPosition === 'left',
                }"
                >{{ iconTitle }}</span
              >
              <var-icon :name="iconName" v-if="iconPosition === 'right'" />
            </span>
          </span>
        </div>
      </var-col>
    </var-row>
    <var-row
      :class="{ 'row-type': model === 'row', 'rc-type ': model === 'rc' }"
      :gutter="model === 'row' ? 10 : 0"
      justify="space-between"
    >
      <slot />
    </var-row>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    iconName?: string;
    iconTitle?: string;
    iconPosition?: string;
    model?: string;
  }>(),
  {
    iconName: "chevron-right",
    iconTitle: "更多",
    iconPosition: "right",
    model: "col",
  }
);

const emit = defineEmits(["rightBtn"]);

const rightBtn = () => {
  //右侧按钮
  emit("rightBtn");
};
</script>

<script lang="ts">
export default {
  name: "WyPlayList",
};
</script>

<style scoped>
.container {
  padding: 10px 15px;
  background: white;
}

.container .left {
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
}
.container .right {
  text-align: end;
  font-size: 14px;
}
.container .right .more {
  border: 1px solid rgba(221, 220, 220, 0.7);
  padding: 2px 4px;
  border-radius: 10px;
}
.container .right .more .pd-left {
  padding-left: 4px;
}
.container .right .more .pd-right {
  padding-right: 4px;
}
.row-type {
  flex-wrap: nowrap;
  overflow-y: scroll;
}

.rc-type {
  margin-top: 12px;
}
.var-row::-webkit-scrollbar {
  display: none;
}
</style>
