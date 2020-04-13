// 1. 重新请求接口 可以在new HttpService() 之后使用
//   const httpClinet = new HttpService()
//   axiosRetry(httpClinet, {times: 2, enable: true})

// todo need to test!!!
import { HttpService } from './util';
import { AxiosResponse, AxiosError } from 'axios';
export function axiosRetry(
  httpClient: HttpService,
  { times = 2, enable = false }: { times: number; enable: boolean }
) {
  if (enable) {
    let retryTimes = 0;
    httpClient.service.interceptors.response.use(
      (response: AxiosResponse) => {
        retryTimes = 0;
        return response;
      },
      (error: AxiosError) => {
        if (error.response) {
          if (retryTimes < times) {
            retryTimes++;
            const resp = error.response;
            const method = resp.config.method;
            const url = resp.config.url;
            let params, fn;
            if (method === 'get') {
              params = resp.config.params || {};
              fn = httpClient.get;
            } else if (method === 'post') {
              params = resp.config.data || {};
              fn = httpClient.post;
            }

            if (url && params && fn) {
              fn(url, params);
            }
          }
        }
      }
    );
  }
}
