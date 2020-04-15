// 1. 请求接口的时候先查找缓存 如果缓存存在并且没有失效 则使用缓存 如果失效继续请求接口
// 2. 默认关闭缓存 调用插件的时候可以控制开启关闭缓存 也可以在单个接口中开启和关闭缓存
// 3. 单个请求可以强制使用缓存或丢弃缓存 ignoreCache
// 4. store 可以为变量也可以为localstorage redis 等

import { HttpService, generateHashKey } from './util';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import localStore from '@/assets/script/storage';

// 拦截器里后use的函数先执行 是栈
/**
 * @param httpClient
 * @param param1 ttl 缓存失效时间 单位 ms
 * @param store 将store分离出去 可以选择
 *   变量缓存（刷新浏览器即丢失）- 默认使用
 *   localstorage|sessionstorage 本地缓存
 * @param exclude todo
 *    {
 *      paths: [],  // url 路径
 *      methods: [],  // 请求方式
 *      filter: () => boolean // 为true的时候就不开启
 *    }
 */
export function axiosCache(
  httpClient: HttpService,
  {
    ttl,
    store = new Store(),
    exclude = {}
  }: {
    ttl: number;
    store?: Store | typeof localStore;
    exclude?: { paths?: string[]; methods?: Array<string>; filter?: () => boolean };
  }
) {
  httpClient.service.interceptors.request.use((config: AxiosRequestConfig) => {
    const { paths, methods, filter } = exclude;
    if (paths && paths.includes(config.url || '')) return config;
    if (methods && methods.includes(config.method as string)) return config;
    if (filter && filter()) return config;

    const hash = generateHashKey(config);
    if (store.has(hash)) {
      const { expire, data } = store.get(hash)!;
      if (expire > Date.now()) {
        // 未过期 必须包装成 {data：data} => response
        // 如果reslove还需要执行下一个request拦截器 不行
        // 如果是reject axios会读取cancelToken 报错
        // 所以统一用canceltoken来取消请求
        return Promise.reject({ data });
      }
    }

    // @ts-ignore
    config.__cacheHash__ = hash;
    return config;
  });

  httpClient.service.interceptors.response.use((response: AxiosResponse) => {
    // 将data保存在store里
    if (response.status === 200) {
      // @ts-ignore
      const cacheHash = response.config.__cacheHash__;
      store.set(cacheHash, { expire: Date.now() + ttl, data: response.data });
    }

    return response;
  });
}

export class Store {
  store: Map<string, { data: any; expire: number }>;
  constructor() {
    this.store = new Map();
  }

  get(key: string) {
    return this.store.get(key);
  }

  has(key: string) {
    return this.store.has(key);
  }

  set(key: string, d: { data: any; expire: number }) {
    return this.store.set(key, d);
  }
}
