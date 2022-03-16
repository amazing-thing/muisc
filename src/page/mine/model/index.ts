import Request from "../../../axios/index";

/**
 * 最近播放-歌曲
 * @param limit 每次请求歌曲数
 * @returns
 */
export function recordRecentSong(limit: number) {
  return Request.axiosInstance({
    method: "GET",
    url: `/record/recent/song?limit=${limit}`,
  });
}

/**
 * 获取用户详情
 * @returns
 */
export function userCount() {
  return Request.axiosInstance({
    method: "GET",
    url: `/user/account`,
  });
}

/**
 * 获取用户绑定信息
 * @param uid 用户id
 * @returns
 */
export function userBinding(uid: string | null) {
  return Request.axiosInstance({
    method: "GET",
    url: `/user/detail?uid=${uid}`,
  });
}

/**
 *
 * @param gender 性别 0:保密 1:男性 2:女性
 * @param birthday 出生日期,时间戳
 * @param nickname 用户昵称
 * @param signature 用户签名
 * @returns
 */
export function userUpdate(
  gender: number,
  birthday: number,
  nickname: string,
  signature: string
) {
  return Request.axiosInstance({
    method: "GET",
    url: `/user/update?gender=${gender}&signature=${signature}&nickname=${nickname}&birthday=${birthday}`,
  });
}

/**
 * 喜欢音乐列表
 * @param uid 用户id
 * @returns
 */
export function likeList(uid: string | null) {
  return Request.axiosInstance({
    method: "GET",
    url: `/likelist?uid=${uid}`,
  });
}

/**
 * 获取歌曲详情
 * @param uid 用户id
 * @returns
 */
export function songDetail(uid: string[]) {
  return Request.axiosInstance({
    method: "GET",
    url: `/song/detail?ids=${uid.toString()}`,
  });
}

const model = {
  recordRecentSong,
  userCount,
  likeList,
  userUpdate,
  userBinding,
  songDetail,
};

export default model;
