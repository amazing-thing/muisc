<template>
  <div class="containers">
    <div class="img" v-if="showImg">
      <var-image class="big" :src="src" width="100%" height="100%" />
      <var-image
        v-if="showImgPlay"
        :class="[
          'small',
          {
            center: iconPosition === 'center',
            'right-corner': iconPosition === 'right-corner',
          },
        ]"
        :src="require('../../../assets/triangle2.png')"
        width="17"
        height="17"
      />
    </div>
    <div class="content" :style="{ 'max-width': showImg ? '230px' : '250px' }">
      <div class="header">
        <span class="name">{{ name }}</span>
        <span class="author" v-if="albumPosition === 'top'">{{
          " - " + album
        }}</span>
      </div>
      <div class="body">
        <div class="bodys">
          <span class="icon-vip" v-if="privilege['fee'] === 1">VIP</span>
          <span class="icon-sq" v-if="privilege['maxbr'] === 999000">SQ</span>
          <span class="detail"> {{ add() }} </span>
          <span class="author" v-if="albumPosition === 'bottom'">{{
            " - " + album
          }}</span>
        </div>
      </div>
    </div>

    <div class="play-icon" v-if="showPlay" style="margin-right: 10px">
      <var-icon name="play-circle-outline" color="#ddd" size="22" />
    </div>
    <div class="play-icon" v-if="showEllipsis">
      <var-icon name="dots-vertical" color="#ddd" size="22" />
    </div>
  </div>
</template>

<script setup lang="ts">
type detailType = { name: string; id: number };
type privilegeType = { fee: number; maxbr: number };

const props = withDefaults(
  defineProps<{
    iconPosition?: string; //播放图标位置
    src: string; //图片地址
    name: string; //歌曲名
    album: string; //专辑名
    detail: Array<detailType>; //作者
    showImgPlay?: boolean; //是否展示左侧播放图标
    showPlay?: boolean; //是否展示右侧播放图标
    albumPosition?: string; //作者位置
    showEllipsis?: boolean; //是否展示右侧三个点
    privilege: privilegeType; //sq\vip图标
    showImg?: boolean; //是否展示左侧图片
  }>(),
  {
    iconPosition: "center",
    showImgPlay: true,
    showPlay: true,
    albumPosition: "top",
    showEllipsis: true,
    showImg: true,
  }
);

const add = () => {
  let str = "";

  if (props.detail.length === 1) {
    return props.detail[0]["name"];
  } else {
    props.detail.forEach((item, index) => {
      str += item.name + "/";
    });

    return str.slice(0, -1);
  }
};
</script>

<script lang="ts">
export default {
  name: "WyPlayListItemRc",
};
</script>

<style scoped>
.containers {
  display: flex;
  align-items: center;
}
.containers .img {
  position: relative;
  margin-right: 12px;
  min-width: 47px;
  height: 47px;
  border-radius: 8px;
  overflow: hidden;
}
.containers .img .big {
  position: absolute;
}
.containers .img .small {
  position: absolute;
}
.containers .img .center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.containers .img .right-corner {
  right: 8%;
  bottom: 8%;
}

.containers .content {
  flex: 1;
  max-width: 60vw;
  margin-right: 10px;
}
.containers .content .header {
}
.containers .content .header .name {
  display: inline-block;
  width: 100%;
  font-size: 14px;
  letter-spacing: 1px;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.containers .content .author {
  width: 100%;
  font-size: 13px;
  color: rgb(114, 112, 112);
}

.containers .content .body {
  padding: 2px 0;
}
.containers .content .body .bodys {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.containers .content .body .bodys .icon-sq {
  font-size: 12px;
  color: red;
  font-weight: 540;
  border: 1px solid rgb(221, 69, 69);
  padding: 0 2px;
  border-radius: 5px;
  margin-right: 4px;
}
.containers .content .body .bodys .icon-vip {
  font-size: 12px;
  color: red;
  font-weight: 540;
  border: 1px solid rgb(221, 69, 69);
  padding: 0 1px;
  border-radius: 5px;
  margin-right: 4px;
}
.containers .content .body .detail {
  font-size: 13px;
  color: rgb(114, 112, 112);
}
</style>
