// 1. enableCanclePedding 处于 pendding 的请求默认被拦截
// 2. retryOpts {times: 2 } 默认关闭retry 开启retry后请求2次
// 3. cache todo
import axios, { AxiosResponse, AxiosRequestConfig, AxiosError, AxiosInstance } from 'axios';
import store from '../store';
import { LOGOUT } from '@/store/mutation-types';
import Vue from 'vue';
import cfg from '@/config/index';
import sha256 from 'sha256';
import { paramToUrl } from '@/assets/script/util';

const REPEAT_LOGIN_CODE = 405;
const INVALID_TOKEN = 407;

let dispathLogoutTime = 0; // 确保logout只调用了一次
let apiPeddingMap: Map<string, boolean> = new Map(); // 正在pendding的接口请求

const dispatchLogOut = (msg: string) => {
  Vue.prototype.$Modal.info({
    title: msg,
    onOk: () => {
      store.dispatch(LOGOUT);
    }
  });
};

const removePenddingHash = (d: AxiosResponse | AxiosError | unknown) => {
  // @ts-ignore
  const hash = d.config && d.config.__hash__;
  // 每次请求结束 将该请求的hash从Map移除
  if (hash) {
    apiPeddingMap.delete(hash);
  }
};

/**
 * 根据请求生成唯一的hash值作为key
 * @param config
 */
export function generateHashKey(config: AxiosRequestConfig) {
  const { url, method, params, data } = config;
  const param = method === 'get' ? params : data;
  const hash = sha256(method + ':' + paramToUrl(url || '', param));
  return hash;
}

export class HttpService {
  service: AxiosInstance;

  constructor(
    url: string,
    // 是否开启pendding请求的拦截 默认为true
    enableCanclePedding: boolean = true
  ) {
    this.service = axios.create({
      baseURL: url,
      timeout: 30000
    });

    // request拦截器
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        let token = (store.state as any).user.token;
        if (token) {
          config.headers.token = token;
        }
        const _locale = (store.state as any).app.local;
        config.headers.locale = _locale === cfg.langType.CN ? 'zh_CN' : 'en_US';

        // 每次请求前 先判断该请求是否在pedding中 如果在拦截掉该请求
        // 不在则请求，并将api请求放到pendding里
        if (enableCanclePedding) {
          const { url, method } = config;
          const hash = generateHashKey(config);
          if (apiPeddingMap.has(hash)) {
            return Promise.reject(
              new Error(`Request ${method}-${url} is in pendding, do not request again!`)
            );
          }

          apiPeddingMap.set(hash, true);
          // @ts-ignore
          config.__hash__ = hash;
        }

        return config;
      },
      (error: AxiosError) => {
        Promise.reject(error);
      }
    );

    // respone拦截器
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        removePenddingHash(response);
        if (response.status !== 200) {
          if (response.status !== INVALID_TOKEN && response.status !== REPEAT_LOGIN_CODE) {
            Vue.prototype.$Message.error('网络异常，请稍后重试');
          } else {
            if (dispathLogoutTime === 0) {
              dispathLogoutTime++;
              dispatchLogOut(response.data.msg);
            }
          }
          return Promise.reject(response);
        }

        if (response.data.code === INVALID_TOKEN || response.data.code === REPEAT_LOGIN_CODE) {
          if (dispathLogoutTime === 0) {
            dispathLogoutTime++;
            dispatchLogOut(response.data.msg);
          }

          return Promise.reject(response); // 405, 407的直接不处理
        }

        return response;
      },
      (error: AxiosError) => {
        removePenddingHash(error);
        // 404，500, timeout 等服务器报错
        let errStr = error + '';
        if (errStr.search('timeout') === -1) {
          // 处理timeout
          return Promise.reject(error);
        }
        return Promise.reject({ msg: '网络异常，请稍后重试' });
      }
    );
  }

  post(url: string, param?: Object): Promise<any> {
    const _header = { 'Content-Type': 'application/json' }; // 改用json形式上传参数
    param = param || {};

    return new Promise(resolve => {
      this.service.post(url, param, { headers: _header }).then(
        (res: AxiosResponse) => {
          resolve(res.data);
        },
        (err: AxiosError) => {
          window.console.error(err);
          resolve(err);
        }
      );
    });
  }

  get(url: string, param?: Object): Promise<any> {
    return new Promise(resolve => {
      this.service.get(url, { params: param || {} }).then(
        (res: AxiosResponse) => {
          // res为resolve
          resolve(res.data);
        },
        (err: AxiosError) => {
          // err为reject
          window.console.error(err);
          resolve(err);
        }
      );
    });
  }

  /**
   * ajax上传流对象
   * @param {*} url
   * @param {formData对象} data
   */
  upload(url: string, data: any): Promise<any> {
    return new Promise(reslove => {
      this.service
        .post(url, data, {
          headers: { 'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime() }
        })
        .then(
          res => {
            reslove(res.data);
          },
          err => {
            window.console.error(err);
            reslove(err);
          }
        );
    });
  }
}

/**
 * @description: 获取请求头
 */
export const getHeaders = () => {
  let headers: any = {};
  const token = (store.state as any).user.token;
  const serviceId = (store.state as any).user.serviceId;
  const authorization = (store.state as any).user.authorization;
  const _locale = (store.state as any).app.local;
  headers.serviceId = serviceId;
  headers.authorization = authorization;
  if (token) {
    headers.token = token;
  }
  headers.locale = _locale === cfg.langType.CN ? 'zh_CN' : 'en_US';
  return headers;
};

// 获取本地json数据
export function getJson(url: string): Promise<any> {
  return new Promise(resolve => {
    axios.get(url).then(
      res => {
        resolve(res.data);
      },
      err => {
        resolve(err);
      }
    );
  });
}
