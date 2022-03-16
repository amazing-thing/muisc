import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";
import { BASE_URL } from "../config/index";
import store from "../store/index";

export class Request {
  public static axiosInstance: AxiosInstance;

  public static init() {
    //创建axios实例
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: 6000,
      withCredentials: true,
    });
    //初始化拦截器
    this.initInterceptors();
    return axios;
  }

  public static initInterceptors() {
    //初始化post请求
    this.axiosInstance.defaults.headers.post["Content-type"] =
      "application/x-www-form-urlencoded";

    //获取token，如果有的话每次都带上
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = localStorage.getItem("token");

        if (token) {
          if (config.headers) {
            config.headers.Authorization = "Bearer " + token;
          }
        }

        return config;
      },
      (error: any) => {
        console.log("error", error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        //请求成功，参数可能出现错误
        if (response.status === 200) {
          return response;
        } else {
          Request.errorHandle(response);
          return response;
        }
      },
      //请求失败
      (error: any) => {
        const { response } = error;
        //请求已发送，但是不在2xx的范围内
        if (response) {
          Request.errorHandle(response);
          return Promise.reject(response);
        } else {
          //这边可以在app.vue全局控制一个弹窗
          //告知网络异常
          console.log("网络连接异常,请稍后再试!");
          store.commit("showSnackbar", "网络连接异常,请稍后再试!");
        }
      }
    );
  }

  public static errorHandle(res: any) {
    //判断状态码，弹窗提示
    switch (res.status) {
      case 301:
        store.commit("showSnackbar", res.data.msg);
        break;
      case 401:
        break;
      case 402:
        break;
      case 403:
        console.log("访问资源不存在");
        store.commit("showSnackbar", "访问资源不存在");
        break;
      default:
        console.log("连接错误");
        store.commit("showSnackbar", res.data.message);
        break;
    }
  }
}

export default Request;
