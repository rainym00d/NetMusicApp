<template>
  <router-view />
  <play-controller />
</template>

<script>
import PlayController from "@/components/PlayController.vue";

export default {
  components: {
    PlayController,
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  color: #333;
  text-decoration: none;
}
</style>
