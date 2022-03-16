import Request from "../../../../axios/index";

/**
 * 推荐歌单 不需登录
 * @param limit 数据条数
 * @returns
 */
export function personalized(limit = "30") {
  return Request.axiosInstance({
    method: "GET",
    url: `/personalized?limit=${limit}`,
  });
}

/**
 * 推荐歌单 需登录
 * @returns
 */
export function recommendResource() {
  return Request.axiosInstance({
    method: "GET",
    url: `/recommend/resource`,
  });
}

/**
 * 推荐新音乐 不需登陆
 * @returns
 */
export function personalizedSongs() {
  return Request.axiosInstance({
    method: "GET",
    url: `/personalized/newsong`,
  });
}

/**
 * 获取歌单详情
 * @param id  歌单id
 * @returns
 */
export function playlistDetail(id: string | string[]) {
  if (typeof id === "object") {
    id = id[0];
  }

  return Request.axiosInstance({
    method: "GET",
    url: `/playlist/detail?id=${id}`,
  });
}

/**
 * 获取歌单所有歌曲
 * @param id  歌单id
 * @returns
 */
export function playlistTrackAll(id: string | string[]) {
  if (typeof id === "object") {
    id = id[0];
  }

  return Request.axiosInstance({
    method: "GET",
    url: `/playlist/track/all?id=${id}`,
  });
}

/**
 * 相关歌单推荐
 * @param id  歌单id
 * @returns
 */
export function relatedPlaylist(id: string | string[]) {
  if (typeof id === "object") {
    id = id[0];
  }

  return Request.axiosInstance({
    method: "GET",
    url: `/related/playlist?id=${id}`,
  });
}

/**
 * 歌单评论
 * @param id  歌单id
 * @param type  0歌曲/1mv/2歌单/3专辑/4电台/5视频/6动态
 * @param sortType 1推荐/2热度/3时间
 * @param pageNo 分页
 * @param cursor 当sortType为3且pageNo为2需要传入
 * @returns
 */
export function commentPlaylist(
  id: string | string[],
  type: number,
  sortType: string | number,
  pageNo: number,
  cursor?: string
) {
  const time = Date.now();

  if (typeof id === "object") {
    id = id[0];
  }

  let url = "";
  if (sortType === "3" && pageNo >= 2) {
    url = `/comment/new?type=${type}&id=${id}&sortType=${sortType}&cursor=${cursor}&pageNo=${pageNo}&timestamp=${time}`;
  } else {
    url = `/comment/new?type=${type}&id=${id}&sortType=${sortType}&pageNo=${pageNo}&timestamp=${time}`;
  }

  return Request.axiosInstance({
    method: "GET",
    url,
  });
}

/**
 * 评论点赞
 * @param id  歌单id
 * @param type  0歌曲/1mv/2歌单/3专辑/4电台/5视频/6动态
 * @param cid 评论id
 * @param t 0取消点赞/1点赞
 * @returns
 */
export function commentLike(
  id: string | string[],
  type: number,
  cid: string | number,
  t: number
) {
  const time = Date.now();

  if (typeof id === "object") {
    id = id[0];
  }

  return Request.axiosInstance({
    method: "GET",
    url: `/comment/like?id=${id}&cid=${cid}&t=${t}&type=${type}&timestamp=${time}`,
  });
}

/**
 * 发送/删除评论
 * @param id  歌单id
 * @param type  0歌曲/1mv/2歌单/3专辑/4电台/5视频/6动态
 * @param t 0删除/1发送/2回复
 * @param content 内容
 * @param commentId 评论id
 * @returns
 */
export function comment(
  id: string | string[],
  type: number,
  t: number,
  content: string,
  commentId?: string | number
) {
  const time = Date.now();
  if (typeof id === "object") {
    id = id[0];
  }

  let url = "";
  if (t === 2) {
    url = `/comment?id=${id}&commentId=${commentId}&t=${t}&type=${type}&content=${content}&timestamp=${time}`;
  } else {
    url = `/comment?id=${id}&t=${t}&type=${type}&content=${content}&timestamp=${time}`;
  }

  return Request.axiosInstance({
    method: "GET",
    url,
  });
}

/**
 * 楼层评论
 * @param id  歌单id
 * @param type  0歌曲/1mv/2歌单/3专辑/4电台/5视频/6动态
 * @param parentCommentId 评论id
 * @returns
 */
export function commentFloor(
  id: string | string[],
  type: number,
  parentCommentId: string | number,
  time: number
) {
  if (typeof id === "object") {
    id = id[0];
  }

  return Request.axiosInstance({
    method: "GET",
    url: `/comment/floor?parentCommentId=${parentCommentId}&id=${id}&type=${type}&time=${time}`,
  });
}
