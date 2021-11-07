<template>
  <div class="listViewTop" ref="listViewTop">
    <img class="background" :src="playList.coverImgUrl" />
    <div class="listViewTopNav">
      <div class="left">
        <icon class="back" iconName="icon-zuojiantou" @click="$router.back()" />
        <div class="title">歌单</div>
      </div>
      <div class="right">
        <icon class="search" iconName="icon-sousuo" />
        <icon class="list" iconName="icon-danlieliebiao" />
      </div>
    </div>
    <div class="listViewTopMain">
      <div class="left">
        <img
          class="cover"
          :src="playList.coverImgUrl"
          alt=""
          @load="finishImg()"
        />
        <div class="playCount">
          <icon iconName="icon-24gl-play" />
          {{ handlePlayCount(playList.playCount) }}
        </div>
      </div>
      <div class="right">
        <h3 class="playListName">{{ playList.name }}</h3>
        <div class="author">
          <img
            class="avatar"
            :src="playList.creator.avatarUrl"
            alt=""
            @load="finishImg()"
          />
          <span class="nickname">{{ playList.creator.nickname }}</span>
        </div>
        <div class="description">
          <div class="content">{{ playList.description }}</div>
          <icon iconName="icon-youjiantou" />
        </div>
        <div class="description"></div>
      </div>
    </div>
    <div class="listViewTopFoot">
      <div class="comment footItem">
        <icon iconName="icon-pinglun" />
        <span>{{ playList.commentCount }}</span>
      </div>
      <div class="share footItem">
        <icon iconName="icon-fenxiang" />
        <span>{{ playList.shareCount }}</span>
      </div>
      <div class="download footItem">
        <icon iconName="icon-xiazai" />
        <span>下载</span>
      </div>
      <div class="select footItem">
        <icon iconName="icon-duoxuan" />
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue";

export default {
  components: {
    Icon,
  },
  props: {
    playList: {
      type: Object,
      required: true,
    },
  },
  methods: {
    finishImg() {
      console.log(this);
      this.$refs.listViewTop.style.backgroundColor = "transparent";
    },
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
  },
};
</script>

<style lang="less" scoped>
.listViewTop {
  width: 7.5rem;
  height: 4.6rem;
  padding: 0 0.4rem;
  background-color: #ccc;

  .background {
    width: 100%;
    height: auto;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    filter: blur(50px);
  }

  .listViewTopNav {
    height: 1.2rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.4rem;

    .icon {
      width: 0.5rem;
      height: 0.5rem;
      // fill: #ccc;
    }

    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        margin-left: 0.4rem;
        font-weight: 900;
      }
    }

    .right {
      display: flex;
      justify-content: space-between;

      .search {
        margin-right: 0.4rem;
      }
    }
  }

  .listViewTopMain {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      position: relative;

      .cover {
        width: 2rem;
        border-radius: 0.2rem;
        // position: relative;
        z-index: -1;
      }

      .playCount {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
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

    .right {
      width: 4.7rem;
      padding-left: 0.2rem;
      // padding: 0 0.2rem 0 0.2rem;

      .playListName {
        color: white;
        font-size: 0.35rem;
        text-align: left;
      }

      .author {
        display: flex;
        align-items: center;
        padding: 0.2rem 0;

        .avatar {
          width: 0.5rem;
          border-radius: 50%;
          margin-right: 0.1rem;
        }

        .nickname {
          color: #ccc;
          font-size: 0.2rem;
        }
      }

      .description {
        display: flex;
        align-items: center;

        .content {
          color: #ccc;
          font-size: 0.2rem;
          text-align: left;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .icon {
          font-size: 0.3rem;
          fill: #ccc;
        }
      }
    }
  }
  .listViewTopFoot {
    width: 100%;
    height: 1.2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 0.4rem;

    .footItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #ccc;

      .icon {
        font-size: 0.4rem;
        fill: white;
      }

      span {
        font-weight: 900;
        padding-top: 0.2rem;
      }
    }
  }
}
</style>