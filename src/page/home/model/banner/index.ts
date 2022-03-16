import Request from "../../../../axios/index";

/**
 * banner图
 * @returns
 */
export function banner() {
  return Request.axiosInstance({
    method: "GET",
    url: "/banner?type=1",
  });
}
