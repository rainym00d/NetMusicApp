<template>
  <div class="swiper">
    <div
      class="swiper-slide"
      ref="swiperSlide"
      @touchstart="handleStart"
      @touchmove="handleMove"
      @touchend="handleEnd"
    >
      <img
        v-for="(item, i) in bannerList"
        :key="i"
        :src="item.pic"
        alt="图片不见了"
      />
    </div>
    <ul class="circle-list">
      <li
        class="circle"
        v-for="index in indexList"
        :key="index"
        @click="clickToImage(index)"
        :class="{ active: index === currentIndex }"
      ></li>
    </ul>
  </div>
</template>

<script>
import { getBanner } from "@/api/index";

export default {
  data() {
    return {
      //
      // rem: 0,
      imageWidth: 0,

      // 与图片相关的变量
      bannerList: [],
      indexList: [],
      currentIndex: 0,
      // 与鼠标拖动相关的变量
      // 1. 起始鼠标横坐标
      // 2. 鼠标横坐标移动的距离
      startX: 0,
      distanceX: 0,
      startLeft: 0,

      // 与计时器相关的变量
      // 1. 持续动作计时器ID
      // 2. 间隔时间
      // 3. 延时计时器ID
      intervalId: 0,
      intervalTime: 5000,
      timeoutID: 0,
      // 与锁相关的变量
      // 1. 自动播放的锁，自动播放动画进行时只允许点击小圆点进行图片切换，不允许拖动
      //
      swiperLock: false,
      touchLock: false,
      moveLock: false,
    };
  },
  components: {},

  async mounted() {
    let res = await getBanner(1);
    this.bannerList = res.data.banners;
    // console.log(this.bannerList);

    this.indexList = this.bannerList.map((ele, i) => i);

    this.bannerList.push(this.bannerList[0]);
    this.bannerList.unshift(this.bannerList[this.indexList.length - 1]);

    this.startAutoplay();

    // this.rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    this.imageWidth = parseFloat(
      getComputedStyle(this.$refs.swiperSlide).width
    );
    // console.log(this.imageWidth);
  },
  beforeUnmounted() {
    this.stopAutoplay();
  },
  methods: {
    startAutoplay() {
      this.intervalId = setInterval(this.toNextImage, this.intervalTime);
      // this.intervalId = setInterval(this.toPreviousImage, this.intervalTime);
    },
    stopAutoplay() {
      clearInterval(this.intervalId);
      //
      clearTimeout(this.timeoutID);
      this.$refs.swiperSlide.style.transition = "all 0.3s ease-in";
    },

    handleStart(e) {
      // console.log(e.targetTouches[0]);
      if (e.targetTouches.length > 1 || this.swiperLock) {
        this.touchLock = false;
        return;
      } else {
        this.touchLock = true;
      }

      this.stopAutoplay();
      this.startX = e.targetTouches[0].pageX;
      this.startLeft = parseFloat(
        getComputedStyle(this.$refs.swiperSlide).left
      );
      this.$refs.swiperSlide.style.transition = "left 0.1s";
      // console.log(rem);
    },
    handleMove(e) {
      if (!this.touchLock) {
        return;
      }
      // console.log(e.targetTouches[0].screenX);
      if (!this.moveLock) {
        this.moveLock = true;
        this.distanceX = e.targetTouches[0].pageX - this.startX;
        this.$refs.swiperSlide.style.left =
          this.startLeft + this.distanceX + "px";
        setTimeout(() => {
          this.moveLock = false;
        }, 50);
      }
    },
    handleEnd() {
      if (!this.touchLock) {
        return;
      }
      if (Math.abs(this.distanceX) * 3 < this.imageWidth) {
        this.toImage(this.currentIndex);
      } else if (this.distanceX < 0) {
        this.toNextImage();
      } else {
        this.toPreviousImage();
      }
      this.startAutoplay();
      // console.log(this.distanceX);
    },

    toImage(index) {
      // 设置当前索引
      this.currentIndex = index;
      // 计算左偏移量，跟巨偏移量转换当前的轮播图
      this.$refs.swiperSlide.style.left = -(index + 1) * 7.1 + "rem";
    },
    toNextImage() {
      if (this.swiperLock) {
        return;
      }
      // 设置自动播放的锁
      this.swiperLock = true;
      this.currentIndex++;
      // 如果轮播图到了最后一张，为了体现出循环播放的效果，
      // 于是转到事先存在最后一张后边的第一张图，等动画结束后再做切换
      if (this.currentIndex === this.indexList.length) {
        this.currentIndex = 0;
        this.$refs.swiperSlide.style.left =
          -(this.indexList.length + 1) * 7.1 + "rem";

        this.timeoutID = setTimeout(() => {
          this.$refs.swiperSlide.style.transition = "none";
          this.$refs.swiperSlide.style.left = "-7.1rem";
        }, 300);
      } else {
        this.$refs.swiperSlide.style.transition = "all 0.3s ease-in";
        this.toImage(this.currentIndex);
      }
      // 动画效果结束后，解除自动播放的锁
      setTimeout(() => {
        this.swiperLock = false;
      }, 300);
    },
    toPreviousImage() {
      if (this.swiperLock) {
        return;
      }
      // 设置自动播放的锁
      this.swiperLock = true;
      this.currentIndex--;
      // 如果轮播图到了最后一张，为了体现出循环播放的效果，
      // 于是转到事先存在最后一张后边的第一张图，等动画结束后再做切换
      if (this.currentIndex === -1) {
        this.currentIndex = this.indexList.length - 1;
        this.$refs.swiperSlide.style.left = "0rem";

        this.timeoutID = setTimeout(() => {
          this.$refs.swiperSlide.style.transition = "none";
          this.$refs.swiperSlide.style.left =
            -this.indexList.length * 7.1 + "rem";
        }, 300);
      } else {
        this.$refs.swiperSlide.style.transition = "all 0.3s ease-in";
        this.toImage(this.currentIndex);
      }
      // 动画效果结束后，解除自动播放的锁
      setTimeout(() => {
        this.swiperLock = false;
      }, 300);
    },

    clickToImage(index) {
      this.stopAutoplay();
      this.toImage(index);
      this.startAutoplay();
    },
  },
};
</script>

<style lang="less" scoped>
.swiper {
  width: 7.1rem;
  max-height: 3rem;
  position: relative;
  margin: 0 0.2rem;
  overflow: hidden;

  .swiper-slide {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    left: -7.1rem;
    transition: all 0.3s ease-in;

    img {
      width: 100%;
      border-radius: 0.1rem;
    }
  }

  .circle-list {
    display: inline-flex;
    flex-wrap: wrap;
    position: absolute;
    width: 4rem;
    margin: 0 auto;
    bottom: 0.1rem;
    left: 0;
    right: 0;
    justify-content: space-around;
    list-style-type: none;

    .circle {
      width: 0.12rem;
      height: 0.12rem;
      background-color: #ecf0f1;
      border-radius: 50%;
      cursor: pointer;
    }

    .active {
      background-color: #e74c3c;
    }
  }
}
</style>