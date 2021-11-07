<template>
  <div class="topNav">
    <div class="topLeft">
      <icon iconName="icon-danlieliebiao" color="red" />
    </div>
    <div class="topCenter">
      <span class="navBtn">我的</span>
      <span class="navBtn active">发现</span>
      <span class="navBtn">云村</span>
      <span class="navBtn">视频</span>
    </div>
    <div class="topRight">
      <Icon iconName="icon-sousuo" />
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
.topNav {
  widows: 7.5rem;
  height: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.2rem;
}

.icon {
  width: 0.4rem;
  height: 0.4rem;
}

.topCenter {
  width: 5rem;
  display: flex;
  justify-content: space-around;
  .active {
    font-weight: 900;
  }
}
</style>