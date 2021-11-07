<template>
  <div class="home">
    <home-top-nav />
    <home-swiper />
    <home-icon-list />
    <home-music-list />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeTopNav from "@/components/HomeTopNav.vue";
import HomeSwiper from "@/components/HomeSwiper.vue";
import HomeIconList from "@/components/HomeIconList.vue";
import HomeMusicList from "@/components/HomeMusicList.vue";

export default {
  name: "Home",
  components: {
    HomeTopNav,
    HomeSwiper,
    HomeIconList,
    HomeMusicList,
  },
};
</script>