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
    <div class="content"></div>
    <div class="lyric"></div>
    <div class="progressBar"></div>
    <div class="footer"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Icon from "@/components/Icon.vue";

export default {
  data() {
    return {};
  },
  components: {
    Icon,
  },
  computed: {
    ...mapState(["isPlaying", "showPlayMusic"]),
    ...mapGetters(["currentMusic"]),
  },
  mounted() {
    console.log(this.currentMusic);
  },
  methods: {
    getArtists(artists) {
      let names = artists.map((item) => item.name).join(", ");
      return names;
    },
    switchShowPlayMusic() {
      this.$store.commit("switchShowPlayMusic");
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
  background: #fff;

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
}
</style>