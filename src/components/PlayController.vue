<template>
  <div class="playController">
    <div class="left" @click="switchShowPlayMusic">
      <div class="cover">
        <img :src="currentMusic.al.picUrl" alt="图片不见了" />
      </div>
      <div class="content">
        <span class="title">{{ currentMusic.name }}</span>
        <span class="artist">{{
          getArtists(currentMusic.ar, currentMusic.al)
        }}</span>
      </div>
    </div>
    <div class="right">
      <icon
        iconName="icon-24gl-play"
        class="play"
        v-show="!isPlaying"
        @click="play"
      />
      <icon
        iconName="icon-24gl-pause"
        class="play"
        v-show="isPlaying"
        @click="pause"
      />
      <icon iconName="icon-danlieliebiao" class="list" />
    </div>
    <!-- <audio
      controls
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${currentMusic.id}.mp3`"
    ></audio> -->
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${currentMusic.id}.mp3`"
    ></audio>
    <play-music v-show="showPlayMusic" @play="play" @pause="pause" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import Icon from "@/components/Icon.vue";
import PlayMusic from "@/components/PlayMusic.vue";

export default {
  data() {
    return {
      // isPlaying: false,
    };
  },
  components: {
    Icon,
    PlayMusic,
  },
  computed: {
    ...mapState(["isPlaying", "showPlayMusic", "intvalID"]),
    ...mapGetters(["currentMusic"]),
  },
  mounted() {
    // console.log("state");
    // console.log(this.$store.state);
    // console.log("state");
    this.$store.commit("setPlayFunc", this.play.bind(this));
    this.$store.commit("setPauseFunc", this.pause.bind(this));
  },
  methods: {
    getArtists(artists, album) {
      let names = artists.map((item) => item.name).join(", ");
      if (album && album.name) {
        names += " - " + album.name;
      }
      return names;
    },
    pause() {
      if (!this.$refs.audio.paused) {
        this.$refs.audio.pause();
        this.$store.commit("switchPlayPause");
        // console.log(1);

        // console.log(this.isPlaying);
        // 暂停时清除定时器
        clearInterval(this.intvalID);
      }
    },
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.$store.commit("switchPlayPause");
        // 设置定时器不断更新歌曲播放的当前时间
        let id = setInterval(() => {
          this.$store.commit("setCurrentTime", this.$refs.audio.currentTime);
          // console.log(this.$store.state.currentTime);
        }, 500);
        this.$store.commit("setIntervalID", id);
        // console.log(2);
        // console.log(this.isPlaying);
        // console.log(this.$refs.audio);
        // console.log(this.$refs.audio.paused);
      }
      // else {
      //   this.$refs.audio.pause();
      //   this.$store.commit("switchPlayPause");
      //   clearInterval(this.$store.state.intId);
      // }
    },
    switchPlayPause() {
      // console.log(this.$refs.audio);
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.$store.commit("switchPlayPause");
        // console.log("播放");
      } else {
        this.$refs.audio.pause();
        this.$store.commit("switchPlayPause");
        // console.log("暂停");
      }
    },
    switchShowPlayMusic() {
      this.$store.commit("switchShowPlayMusic");
    },
  },
};
</script>

<style lang="less" scoped>
.playController {
  width: 7.5rem;
  height: 1rem;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
  background: #fff;

  .left {
    height: 100%;
    width: 5rem;
    display: flex;
    align-items: center;

    .cover {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0.2rem;

      img {
        width: 0.6rem;
        // height: 0.5rem;
        border-radius: 50%;
      }
    }

    .content {
      width: 3.6rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: left;

      span {
        width: 100%;
      }

      .title {
        font-size: 0.3rem;
        font-weight: 500;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .artist {
        font-size: 0.15rem;
        color: #777;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .right {
    height: 100%;
    width: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 0.2rem;

    .play {
    }

    .list {
      font-size: 0.4rem;
    }
  }
}
</style>