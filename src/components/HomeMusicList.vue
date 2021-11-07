<template>
  <div class="musicListBox">
    <div class="title">
      <span class="fimdMusicList">发现好歌单</span>
      <span class="more">查看更多</span>
    </div>
    <div
      class="wrapper"
      @touchstart="handleStart"
      @touchmove="handleMove"
      @touchend="handleEnd"
    >
      <div ref="musicList" class="musicList">
        <router-link
          :to="{ path: '/listview', query: { id: item.id } }"
          ref="musicItem"
          class="musicItem swiper-slide"
          v-for="(item, i) in musicList"
          :key="i"
        >
          <img :src="item.picUrl" alt="图片不见了" />
          <div class="name">{{ item.name }}</div>
          <div class="playCount">
            <icon iconName="icon-24gl-play" />
            {{ handlePlayCount(item.playCount) }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "@/api/index";
import Icon from "@/components/Icon.vue";

export default {
  data() {
    return {
      musicList: [],
      screenLength: 0,
      listLength: 0,

      startX: 0,
      startLeft: 0,
      distanceX: 0,
      endLeft: 0,

      touchLock: false,
      moveLock: false,

      isLeftBoundary: false,
      isRightBoundary: false,
    };
  },
  components: {
    Icon,
  },
  async mounted() {
    let res = await getMusicList();
    this.musicList = res.data.result;

    let rem = (this.rem = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    ));
    this.screenLength = parseFloat(
      getComputedStyle(this.$refs.musicList).width
    );
    this.listLength = this.musicList.length * (2.25 + 0.2) * rem;
    // console.log(this.listLength);
  },
  methods: {
    handlePlayCount(playCount) {
      let res = playCount;
      if (playCount >= 100000000) {
        res = playCount / 100000000;
        res = res.toFixed(0) + "亿";
      } else if (playCount >= 10000) {
        res = playCount / 10000;
        res = res.toFixed(0) + "万";
      }
      return res;
    },

    handleStart(e) {
      if (e.targetTouches.length > 1) {
        this.touchLock = false;
        return;
      } else {
        this.touchLock = true;
      }
      this.startX = e.targetTouches[0].pageX;
      this.startLeft = parseFloat(getComputedStyle(this.$refs.musicList).left);
      // console.log("start: " + this.startX);
    },
    handleMove(e) {
      if (!this.touchLock) {
        return;
      }
      if (!this.moveLock) {
        this.moveLock = true;
        this.distanceX = e.targetTouches[0].pageX - this.startX;
        this.endLeft = this.startLeft + this.distanceX;
        this.$refs.musicList.style.left = this.endLeft + "px";
        // console.log(this.endLeft + "  " + -this.listLength);
        if (this.endLeft > 0) {
          this.isLeftBoundary = true;
        } else if (this.endLeft < -(this.listLength - this.screenLength)) {
          this.isRightBoundary = true;
        } else {
          this.isLeftBoundary = false;
          this.isRightBoundary = false;
        }
        setTimeout(() => {
          this.moveLock = false;
        }, 50);
      }
    },
    handleEnd() {
      if (!this.touchLock) {
        return;
      }
      console.log("move:  " + this.distanceX);
      if (this.isLeftBoundary) {
        this.$refs.musicList.style.transition = "left 0.1s ease-out";
        this.$refs.musicList.style.left = 0;
      } else if (this.isRightBoundary) {
        this.$refs.musicList.style.transition = "left 0.1s ease-out";
        this.$refs.musicList.style.left =
          -(this.listLength - this.screenLength) + "px";
      }
      // if (this.distanceX > 0) {

      // }
    },
  },
};
</script>

<style lang="less" scoped>
.musicListBox {
  width: 7.5rem;
  padding: 0 0.15rem;
  .title {
    height: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .fimdMusicList {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      border-radius: 0.3rem;
      padding: 0.06rem;
      margin-right: 0.1rem;
      font-size: 0.2rem;
      font-weight: 400;
    }
  }
  .wrapper {
    width: 7.2;
    overflow: hidden;

    .musicList {
      height: 3rem;
      width: 100%;
      // border: 1px solid;
      display: flex;
      position: relative;

      left: 0;
      transition: left 0.1s;
      .musicItem {
        display: flex;
        flex-direction: column;
        margin: 0 0.2rem 0 0;
        position: relative;
        img {
          height: 2.25rem;
          border-radius: 0.1rem;
        }
        .name {
          height: 0.6;
          width: 100%;
          font-size: 0.1rem;
          line-height: 0.35rem;
          text-align: left;
        }
        .playCount {
          position: absolute;
          top: 0.1rem;
          right: 0.1rem;
          display: flex;
          align-items: center;
          color: #ccc;
          border-radius: 0.1rem;
          background-color: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          font-size: 0.24rem;
          font-weight: 500;
          .icon {
            margin: 0 0.05rem;
          }
        }
      }
    }
  }
}
</style>