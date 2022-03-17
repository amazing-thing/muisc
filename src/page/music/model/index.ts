import Request from "../../../axios/index";

/**
 * 获取歌词
 * @param id 歌曲id
 * @returns
 */
export function lyricMusic(id: number | string | string[]) {
  return Request.axiosInstance({
    method: "GET",
    url: `/lyric?id=${id}`,
  });
}

/**
 * 音乐
 * @param id 歌曲id
 * @returns
 */
export function music(id: number | string | string[]) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

/**
 * 获取歌曲详情
 * @param id 歌曲id
 * @returns
 */
export function songDetail(id: number | string | string[]) {
  return Request.axiosInstance({
    method: "GET",
    url: `/song/detail?ids=${id}`,
  });
}

/**
 * 喜欢音乐列表
 * @param uid 用户id
 * @returns
 */
export function likeList(uid: string | null) {
  const time = Date.now();

  return Request.axiosInstance({
    method: "GET",
    url: `/likelist?uid=${uid}&timestamp=${time}`,
  });
}

/**
 * 喜欢音乐
 * @param uid   音乐id
 * @param like  true喜欢/false不喜欢
 * @returns
 */
export function likeMusic(uid: string | string[], like: boolean) {
  const time = Date.now();

  return Request.axiosInstance({
    method: "GET",
    url: `/like?id=${uid}&like=${like}&timestamp=${time}`,
  });
}

const model = { lyricMusic, music, songDetail, likeList, likeMusic };

export default model;
