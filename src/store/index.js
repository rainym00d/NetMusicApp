import { createStore } from 'vuex'
import { getMusicLyric } from "@/api/index";


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
        playMode: 0,    // 0: 列表循环    1: 单曲循环    2: 随机播放
        showPlayMusic: false,
        rawLyric: '',
        currentTime: 0,
        intvalID: 0,
        // duration: 0,

        play: {},
        pause: {},

    },
    getters: {
        currentMusic(state) {
            return state.playList[state.currentIndex];
        },
        lyric(state) {
            let result = state.rawLyric.split('\n').map((item) => {
                // todo 换成正则表达式解析
                let min = parseInt(item.slice(1, 3));
                let sec = parseInt(item.slice(4, 6));
                let mill = parseInt(item.slice(7, 9));
                let lyric = item.slice(item.indexOf(']') + 1);
                return {
                    min, sec, mill, lyric,
                    content: item,
                    beginTime: (mill + sec * 1000 + min * 60 * 1000)
                };
            });
            // 过滤掉空歌词
            result = result.filter(item => item.lyric != '');

            // 获取一句歌词的结束时间
            result.forEach((item, idx, array) => {
                if (idx === array.length - 1) {
                    item.endTime = item.beginTime + 10000;
                } else {
                    item.endTime = array[idx + 1].beginTime;
                }
            });

            // console.log("1111")
            // console.log(result)
            // console.log("1111")

            return result;
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
        setRawLyric(state, lyric) {
            state.rawLyric = lyric;
        },
        setCurrentTime(state, time) {
            state.currentTime = time;
        },
        setIntervalID(state, id) {
            state.intvalID = id;
        },
        // setDuration(state, time) {
        //     state.duration = time;
        // },
        switchPlayPause(state) {
            state.isPlaying = !state.isPlaying;
        },
        switchShowPlayMusic(state) {
            state.showPlayMusic = !state.showPlayMusic;
        },
        switchPlayMode(state) {
            state.playMode += 1;
            if (state.playMode === 3) {
                state.playMode = 0;
            }
        }
    },
    actions: {
        async changeMusic(context, options) {
            context.state.pause();
            context.commit("setPlayList", options.playList);
            context.commit("setCurrentIndex", options.currentIndex);
            // todo 这里暂时这样  由于切换歌曲需要有个加载时间  想想办法看看能不能找到判断歌曲是否加载成功
            setTimeout(() => { context.state.play(); }, 300);

        },
        async reqLyric(context, options) {
            let result = await getMusicLyric(options.id);
            // console.log(result.data.lrc.lyric);
            if (result.data.nolyric) {
                context.commit('setRawLyric', '[00:00.000]暂无歌词');
            } else {
                context.commit('setRawLyric', result.data.lrc.lyric);
            }
        }
    },

    modules: {
    }
})
