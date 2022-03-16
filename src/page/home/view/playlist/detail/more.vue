<template>
  <div class="play" v-ripple="{ color: '#ccc' }">
    <var-row align="center">
      <var-col span="3">
        <var-icon name="play-circle" color="red" size="32" />
      </var-col>
      <var-col span="15" class="playcount">
        <span class="title">播放全部</span>
        <span class="count">({{ trackCount }})</span>
      </var-col>
    </var-row>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  trackCount: number;
}>();
</script>

<style scoped>
.play {
  padding: 10px 20px;
  font-weight: bold;
  font-size: 18px;
}

.play .playcount {
  display: flex;
  align-items: center;
}

.play .playcount .title {
  margin-right: 5px;
}
.play .playcount .count {
  font-size: 12px;
  color: rgba(33, 33, 34, 0.39);
}
</style>
