import { createStore } from 'vuex'

let defaultMusic = {
  "name": "STAY",
  "id": 1859245776,
  "ar": [
    {
      "id": 32795025,
      "name": "The Kid LAROI",
      "tns": [],
      "alias": []
    },
    {
      "id": 35531,
      "name": "Justin Bieber",
      "tns": [],
      "alias": []
    }
  ],
  "al": {
    "id": 130016223,
    "name": "STAY",
    "picUrl": "http://p3.music.126.net/e5cvcdgeosDKTDrkTfZXnQ==/109951166155165682.jpg",
    "tns": [],
    "pic_str": "109951166155165682",
    "pic": 109951166155165680
  },
};

export default createStore({
  state: {
    playList: [defaultMusic],
    currentIndex: 0,
    isPlaying: false,

    showPlayMusic: false,

    play: {},
    pause: {},

  },
  getters: {
    currentMusic(state) {
      return state.playList[state.currentIndex];
    }
  },
  mutations: {
    setPlayList(state, playList) {
      state.playList = playList;
    },
    setCurrentIndex(state, index) {
      state.currentIndex = index;
    },
    setPlayFunc(state, func) {
      state.play = func;
    },
    setPauseFunc(state, func) {
      state.pause = func;
    },
    switchPlayPause(state) {
      state.isPlaying = !state.isPlaying;
    },
    switchShowPlayMusic(state) {
      state.showPlayMusic = !state.showPlayMusic;
    },
  },
  actions: {
    async changeMusic(context, options) {

      context.state.pause();
      context.commit("setPlayList", options.playList);
      context.commit("setCurrentIndex", options.currentIndex);
      // todo 这里暂时这样  由于切换歌曲需要有个加载时间  想想办法看看能不能找到判断歌曲是否加载成功
      setTimeout(() => { context.state.play(); }, 300);

    }
  },
  modules: {
  }
})
