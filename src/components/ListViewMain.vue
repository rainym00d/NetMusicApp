<template>
  <div class="listViewMain">
    <div class="top">
      <div class="left">
        <icon iconName="icon-yunhang" @click="playAllMusic" />
        <div>
          <span class="title">播放全部</span>
          <span class="num">(共{{ playList.trackCount }}首)</span>
        </div>
      </div>
      <div class="right">
        <div class="collection">
          + 收藏 ({{ handlePlayCount(playList.subscribedCount) }})
        </div>
      </div>
    </div>
    <div class="musicList">
      <div
        class="musicItem"
        v-for="(item, index) in playList.tracks"
        :key="index"
      >
        <div class="left" @click="playMusic(playList.tracks, index)">
          <div class="index">{{ index + 1 }}</div>
          <div class="content">
            <span class="title">{{ item.name }}</span>
            <span class="artist">{{ getArtists(item.ar, item.al) }}</span>
          </div>
        </div>
        <div class="right">
          <icon iconName="icon-bofang" />
          <icon iconName="icon-gengduo-shuxiang" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue";

export default {
  props: {
    playList: {
      type: Object,
      required: true,
    },
  },
  components: {
    Icon,
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
    getArtists(artists, album) {
      let names = artists.map((item) => item.name).join(", ");
      if (album && album.name) {
        names += " - " + album.name;
      }
      return names;
    },
    playMusic(playList, index) {
      this.$store.commit("setPlayList", playList);
      this.$store.commit("setCurrentIndex", index);
      this.$store.dispatch("changeMusic", {
        playList: JSON.parse(JSON.stringify(playList)),
        currentIndex: index,
      });
    },
    playAllMusic() {
      this.playMusic(this.playList.tracks, 0);
    },
  },
};
</script>

<style lang="less" scoped>
.listViewMain {
  width: 7.5rem;
  padding: 0 0.2rem;
  background: white;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  margin-top: 0.4rem;

  .top {
    height: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      .icon {
        font-size: 0.5rem;
      }
      div {
        display: flex;
        align-items: center;

        .title {
          padding-left: 0.2rem;
          font-weight: 900;
        }
        .num {
          font-size: 0.2rem;
          color: #999;
        }
      }
    }
    .right {
      height: 0.6rem;
      border-radius: 0.3rem;
      background: orangered;
      font-size: 0.24rem;
      color: white;
      line-height: 0.4rem;
      padding: 0.1rem;
    }
  }
  .musicList {
    .musicItem {
      height: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0.4rem 0;

      .left {
        display: flex;
        align-items: center;

        .index {
          width: 0.7rem;
          font-size: 0.3rem;
          color: #aaa;
          margin-right: 0.2rem;
        }

        .content {
          width: 5rem;
          display: flex;
          align-items: center;
          flex-direction: column;
          text-align: left;

          .title {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 0.3rem;
            font-weight: 600;
            // margin-bottom: 0.1rem;
          }

          .artist {
            width: 100%;
            color: #aaa;
            font-size: 0.24rem;
            height: 0.5rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }

      .right {
        width: 1rem;
        display: flex;
        justify-content: space-between;

        .icon {
          font-size: 0.4rem;
          fill: #aaa;
        }
      }
    }
  }
}
</style>