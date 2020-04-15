// 1. 重新请求接口 可以在new HttpService() 之后使用
//   const httpClinet = new HttpService()
//   axiosRetry(httpClinet, {times: 2 })
// 2. todo - 在单个接口请求中开启retry并指定retry次数 post 和 get 方法多传一个参数

// todo need to test!!!
import { HttpService } from './util';
import { AxiosResponse, AxiosError } from 'axios';

/**
 *
 * @param httpClient axios 实例
 * @param param1 times: 重复请求次数
 */
export function axiosRetry(httpClient: HttpService, { times = 2 }: { times: number }) {
  let retryTimes = 0;
  httpClient.service.interceptors.response.use(
    (response: AxiosResponse) => {
      retryTimes = 0;
      return response;
    },
    (error: AxiosError) => {
      if (retryTimes < times) {
        retryTimes++;
        const { method, url } = error.config;
        let params, fn;
        if (method === 'get') {
          params = error.config.params || {};
          fn = httpClient.get;
        } else if (method === 'post') {
          params = error.config.data || {};
          fn = httpClient.post;
        }

        if (url && params && fn) {
          fn(url, params);
        }
      }
    }
  );
}
