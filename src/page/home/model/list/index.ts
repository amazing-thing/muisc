import Request from "../../../../axios/index";

/**
 * 每日推荐歌曲 需登录
 * @returns
 */
export function recommendSongs() {
  return Request.axiosInstance({
    method: "GET",
    url: `/recommend/songs`,
  });
}
