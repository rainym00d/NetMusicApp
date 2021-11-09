<template>
  <div class="playMusic">
    <div
      class="background"
      :style="{ backgroundImage: `url(${currentMusic.al.picUrl})` }"
    ></div>
    <div class="top">
      <div class="left">
        <div class="back" @click="switchShowPlayMusic">
          <icon iconName="icon-zuojiantou1" />
        </div>
        <div class="content">
          <!-- <div class="title"> -->
          <marquee class="title" behavior="scroll" direction="left">
            {{ currentMusic.name }}
          </marquee>
          <!-- </div> -->
          <div class="artist">
            {{ getArtists(currentMusic.ar) }}
            <div class="more">
              <icon iconName="icon-youjiantou" />
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="share">
          <icon iconName="icon-fenxiang" />
        </div>
      </div>
    </div>
    <div class="playContent" v-show="!isLyric" @click="showLyric">
      <img
        class="needle"
        :class="{ active: isPlaying }"
        src="@/assets/image/needle-ab.png"
        alt=""
      />
      <img class="disc" src="@/assets/image/disc-plus.png" alt="" />
      <img class="albumPic" :src="currentMusic.al.picUrl" alt="" />
    </div>
    <div class="lyric" ref="lyric" v-show="isLyric" @click="showLyric">
      <!-- (item.beginTime <= currentTime * 1000 && currentTime * 1000 < item.endTime) -->
      <p
        :class="{
          active:
            item.beginTime <= currentTime * 1000 &&
            currentTime * 1000 < item.endTime,
        }"
        v-for="(item, idx) in lyric"
        :key="idx"
      >
        {{ item.lyric }}
      </p>
    </div>
    <!-- <div class="progressBar">
      <div class="currentTime">{{ handleTime(currentTime) }}</div>
      <div class="bar"></div>
      <div class="duration">{{ handleTime($refs.audio.duration) }}</div>
    </div> -->
    <div class="footer">
      <icon
        v-if="playMode === 0"
        class="playMode"
        iconName="icon-white"
        @click="switchPlayMode"
      />
      <icon
        v-else-if="playMode === 1"
        class="playMode"
        iconName="icon-white-1"
        @click="switchPlayMode"
      />
      <icon
        v-else
        class="playMode"
        iconName="icon-shuffle-white"
        @click="switchPlayMode"
      />
      <icon iconName="icon-shangyishoushangyige" />
      <icon
        class="play"
        iconName="icon-bofang1"
        v-show="!isPlaying"
        @click="$emit('play')"
      />
      <icon
        class="play"
        iconName="icon-zanting1"
        v-show="isPlaying"
        @click="$emit('pause')"
      />
      <icon iconName="icon-xiayigexiayishou" />
      <icon iconName="icon-liebiao_o-copy" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import Icon from "@/components/Icon.vue";

export default {
  data() {
    return {
      isLyric: false,
    };
  },
  components: {
    Icon,
  },
  computed: {
    ...mapState(["isPlaying", "playMode", "showPlayMusic", "currentTime"]),
    ...mapGetters(["currentMusic", "lyric"]),
  },
  mounted() {
    console.log(this.currentMusic);
  },
  watch: {
    currentTime() {
      // 歌词滚动
      let pActive = document.querySelector(".lyric .active");
      if (!pActive) {
        return;
      }
      if (pActive.offsetTop > 100) {
        this.$refs.lyric.scrollTop = pActive.offsetTop - 100;
      }
      // todo 进度条滚动
    },
  },
  methods: {
    // handleTime(currentTime) {
    //   let time = currentTime;
    //   let hour = parseInt(time / 3600);
    //   time = time % 3600;
    //   let min = parseInt(time / 60);
    //   time = time % 60;
    //   let sec = parseInt(time);
    //   if (hour === 0) {
    //     return this.preFixInteger(min, 2) + ":" + this.preFixInteger(sec, 2);
    //   } else {
    //     return (
    //       this.preFixInteger(hour, 2) +
    //       ":" +
    //       this.preFixInteger(min, 2) +
    //       ":" +
    //       this.preFixInteger(sec, 2)
    //     );
    //   }
    // },
    // preFixInteger(num, length) {
    //   return (Array(length).join("0") + num).slice(-length);
    // },
    getArtists(artists) {
      let names = artists.map((item) => item.name).join(", ");
      return names;
    },
    switchShowPlayMusic() {
      this.$store.commit("switchShowPlayMusic");
    },
    switchPlayMode() {
      this.$store.commit("switchPlayMode");
    },
    showLyric() {
      // console.log(this.currentMusic);
      this.isLyric = !this.isLyric;
      this.$store.dispatch("reqLyric", { id: this.currentMusic.id });
    },
  },
};
</script>

<style lang="less" scoped>
.playMusic {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  // background: #fff;

  .background {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-size: auto 100%;
    background-position: center;
    filter: blur(60px);
    z-index: -1;
  }

  .top {
    width: 7.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.2rem;

    .left {
      display: flex;
      align-items: center;

      .back {
        width: 1rem;
        font-size: 0.4rem;
        color: #fff;
      }

      .content {
        display: flex;
        flex-direction: column;
        text-align: left;

        .title {
          width: 5rem;
          font-size: 0.4rem;
          color: #fff;
          font-weight: 500;
        }

        .artist {
          display: flex;
          text-align: left;
          font-size: 0.2rem;
          color: #ddd;
        }
      }
    }
    .right {
      .share {
        // position: relative;
        width: 1rem;
        right: 0;
        font-size: 0.4rem;
        color: #fff;
      }
    }
  }

  .playContent {
    position: absolute;
    width: 7.5rem;
    height: 7.5rem;
    left: 0;
    top: 1.5rem;

    .needle {
      width: 2rem;
      height: auto;
      position: absolute;
      left: 50%;
      transform-origin: 0.4rem 0.4rem;
      transform: rotate(-30deg);
      transition: all 1s;
      z-index: 10;
    }
    .needle.active {
      transform: rotate(5deg);
      transition: all 1s;
    }

    .disc {
      width: 5.5rem;
      height: 5.5rem;
      position: absolute;
      left: calc(50% - 2.75rem);
      top: 2rem;
    }

    .albumPic {
      position: absolute;
      width: 3.6rem;
      height: 3.6rem;
      border-radius: 50%;
      left: calc(50% - 1.8rem);
      top: 2.95rem;
    }
  }

  .lyric {
    position: absolute;
    width: 7.5rem;
    height: 8rem;
    top: calc(50% - 4rem);
    text-align: center;
    z-index: 5;
    overflow: scroll;
    font-size: 0.3rem;
    color: rgba(256, 256, 256, 0.3);

    &::-webkit-scrollbar {
      display: none;
    }

    p {
      padding: 0.1rem 0.2rem;
    }

    .active {
      color: #fff;
    }
  }

  .progressBar {
    width: 7.5rem;
    height: 0.6rem;
    padding: 0 0.2rem;
    background: #fff;
    position: absolute;
    bottom: 1.4rem;
  }

  .footer {
    width: 7.5rem;
    height: 1.4rem;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
    .icon {
      fill: #fff;
      font-size: 0.4rem;
    }
    .play {
      font-size: 0.8rem;
    }
  }
}
</style>