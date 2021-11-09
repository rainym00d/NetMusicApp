import axios from "axios";

// * 后端API基地址
let baseUrl = 'http://localhost:3000';

// * 获取轮播图
// * 0: pc    1: android    2: iphone    3: ipad
export function getBanner(type) {
    return axios.get(`${baseUrl}/banner?type=${type}`);
}
// * 获取推荐歌单
export function getMusicList(limit = 10) {
    return axios.get(`${baseUrl}/personalized?limit=${limit}`)
}
// * 获取歌单详情
export function getMusicListDetail(id) {
    return axios.get(`${baseUrl}/playlist/detail?id=${id}`)
}

// * 获取歌词
export function getMusicLyric(id) {
    return axios.get(`${baseUrl}/lyric/?id=${id}`)
}