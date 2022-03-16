import Request from "../../../axios/index";

//手机号登录
export function loginCellphone(phone: string, captcah: string) {
  return Request.axiosInstance({
    url: `/login/cellphone?phone=${phone}&captcha=${captcah}`,
    method: "GET",
  });
}

//注册
export function register(phone: string, captcha: string, nickname: string) {
  //时间戳，避免post请求相同url被缓存
  const time = Date.now();
  const password = phone;

  return Request.axiosInstance({
    url: `/register/cellphone?phone=${phone}&password=${password}&captcha=${captcha}&nickname=${nickname}`,
    method: "GET",
  });
}

//校验手机号是否注册
export function checkCellphone(phone: string) {
  return Request.axiosInstance({
    url: `/cellphone/existence/check?phone=${phone}`,
    method: "GET",
  });
}

//发送验证码
export function sentCaptch(phone: string) {
  //时间戳，避免post请求相同url被缓存
  const time = Date.now();

  return Request.axiosInstance({
    url: `/captcha/sent?phone=${phone}&timestamp=${time}`,
    method: "GET",
  });
}
