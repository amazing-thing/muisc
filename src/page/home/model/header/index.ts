import Request from "../../../../axios/index";

/**
 * 搜索默认词条
 * @returns
 */
export function searchDefault() {
  return Request.axiosInstance({
    method: "GET",
    url: `/search/default`,
  });
}

/**
 * 热搜榜
 * @returns
 */
export function searchHotDetail() {
  return Request.axiosInstance({
    method: "GET",
    url: `/search/hot/detail`,
  });
}

/**
 * 搜索
 * @param keywords 关键字
 * @param type 1单曲/10专辑/100歌手/1000歌单/1002用户/1004MV/1006歌词/1009电台/1014视频/1018综合/2000声音
 * @returns
 */
export function search(keywords: string, type: string) {
  return Request.axiosInstance({
    method: "GET",
    url: `/search?keywords=${keywords}&type=${type}`,
  });
}

/**
 * 搜索建议
 * @param keywords 关键字
 * @returns
 */
export function searchSuggest(keywords: string) {
  return Request.axiosInstance({
    method: "GET",
    url: `/search/suggest?keywords=${keywords}&type=mobile`,
  });
}

/**
 * 搜索匹配
 * @param keywords 关键字
 * @returns
 */
export function searcMultimatch(keywords: string) {
  return Request.axiosInstance({
    method: "GET",
    url: `/search/multimatch?keywords=${keywords}&`,
  });
}
export function searcCloudsearch(keywords: string, type: string, offset = 0) {
  return Request.axiosInstance({
    method: "GET",
    url: `/cloudsearch?keywords=${keywords}&type=${type}&offset=${offset}`,
  });
}
