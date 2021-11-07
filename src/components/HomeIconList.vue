<template>
  <div class="icomList">
    <div class="iconItem">
      <icon iconName="icon-tuijian" color="red" />
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <icon iconName="icon-diantai2" color="red" />
      <span>私人FM</span>
    </div>
    <div class="iconItem">
      <icon iconName="icon-gedan" color="red" />
      <span>歌单</span>
    </div>
    <div class="iconItem">
      <icon iconName="icon-paihangbang1" color="red" />
      <span>排行榜</span>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue";

export default {
  components: {
    Icon,
  },
};
</script>

<style lang="less" scoped>
.icomList {
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  .iconItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      height: 0.65rem;
      width: 0.65rem;
    }
    span {
      font-size: 0.2rem;
    }
  }
}
</style>