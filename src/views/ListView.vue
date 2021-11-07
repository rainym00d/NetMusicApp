<template>
  <div class="listView">
    <list-view-top :play-list="playList" />
    <list-view-main :play-list="playList" />
  </div>
</template>

<script>
import { getMusicListDetail } from "@/api/index";
import ListViewTop from "@/components/ListViewTop.vue";
import ListViewMain from "@/components/ListViewMain.vue";

// todo 异步惰性加载歌单
export default {
  data() {
    return {
      loading: false,
      playList: {
        creator: {},
        trackIds: [],
      },
    };
  },
  components: {
    ListViewTop,
    ListViewMain,
  },
  created() {
    this.$watch(
      () => this.$route.query,
      async () => {
        this.loading = true;
        let res = await getMusicListDetail(this.$route.query.id);
        this.playList = res.data.playlist;
        console.log(this.playList);
      },
      { immediate: true }
    );
  },
  methods: {
    async fetchData() {
      this.loading = true;
      console.log(this.$route.query);
      let res = await getMusicListDetail(this.$route.query.id);
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.listView {
  width: 100vw;
  height: calc(100vh - 1.2rem);
  overflow: auto;
}
</style>