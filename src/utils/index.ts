import Request from "../axios/index";

//数字过大时过滤
export function filterCount(num: number, p = 0) {
  if (num > 100000000) {
    return (num / 100000000).toFixed(p + 1) + "亿";
  } else if (num > 100000) {
    return (num / 10000).toFixed(p) + "万";
  } else {
    return num;
  }
}

//补零
export function filterDate(num: number | string) {
  if (Number(num) > 10) {
    return "" + num;
  } else {
    return "0" + num;
  }
}

/**
 * 音乐是否可用
 * @param id 歌曲id
 * @returns
 */
export function checkMusic(id: number) {
  return Request.axiosInstance({
    method: "GET",
    url: `/check/music?id=${id}`,
  });
}

//过滤歌词
export function filterMusic(str: string) {
  const strs = str.split("\n");
  const data: number[] = [];
  const result: string[] = [];
  const reg = new RegExp(/\[(\d\d):(\d\d)\.\d\d\d?\]/);

  strs.forEach((item) => {
    result.push(item.replace(reg, ""));
    ///如何化简
    data.push(Number(Number(RegExp.$1) * 60) + Number(RegExp.$2));
  });


  return [result, data];
}

//过滤时间
export function filterTime(time: number | string) {
  const str = Number(time);

  const min = filterDate(Math.floor(str / 60));
  const second = filterDate(Math.floor(str % 60));

  return min + ":" + second;
}

//节流
export function trottle(fn: any, delay = 1000) {
  let timer: any = null;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn();
        timer = null;
      }, delay);
    }
  };
}
