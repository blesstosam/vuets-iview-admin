/* eslint-disable */
import {RouteConfig} from 'vue-router'
import WsConfig from './ws'
const cssVar = require('@/styles/var.styl')


// 正则表达
export const reg = {
  bankcard: /^([1-9]{1})(\d{15}|\d{18})$/, //银行卡正则
  cellphone: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/, //手机号
  email: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/ //邮箱
}

function typeOf(obj: any): string {
  const toString = Object.prototype.toString;
  const map: any = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}

export function deepCopy(data: any): any {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      (o as any[]).push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (let i in data) {
      (o as any)[i] = deepCopy(data[i]);
    }
  }
  return o;
}

export function showTitle(item: any, vm: any): string {
  let title  = item.meta && item.meta.title || item.title
  if (!title) return ''

  const arr = title.split('.')
  // 如果是用 i18n 多语言
  if (arr.length && arr[0] === 'menuTitle') {
    title = vm.$t(title.trim())
  } else {
    title = item.meta && item.meta.title || item.title
  }

  return title
}

export const findNodeUpperByClasses = (ele: any, classes: string[]): any => {
  let parentNode = ele.parentNode
  if (parentNode) {
    let classList = parentNode.classList
    if (classList && classes.every(className => classList.contains(className))) {
      return parentNode
    } else {
      return findNodeUpperByClasses(parentNode, classes)
    }
  }
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1: Array<any>, arr2: Array<any>) => {
  return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers: Array<RouteConfig> , homeName: string = 'home'): RouteConfig => {
  let i = -1;
  let len = routers.length;
  let homeRoute;
  while (++i < len) {
    let item = routers[i];
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children, homeName);
      if (res.name) return res;
    } else {
      if (item.name === homeName) homeRoute = item;
    }
  }

  return (homeRoute as RouteConfig);
};


// scrollTop animation
export const scrollTop = (el: HTMLElement | Window, from = 0, to: number, duration = 500, endCallback?: Function) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.webkitRequestAnimationFrame ||
      (window as any).mozRequestAnimationFrame ||
      (window as any).msRequestAnimationFrame ||
      function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil((difference / duration) * 50);

  const scroll = (start: number, end: number, step: number) => {
    if (start === end) {
      endCallback && endCallback();
      return;
    }

    let d = start + step > end ? end : start + step;
    if (start > end) {
      d = start - step < end ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      (el as HTMLElement).scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  };
  scroll(from, to, step);
};

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function() {
  // @ts-ignore
  if (document.addEventListener) {
    return function(element: HTMLElement, event: string, handler: any) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element: any, event: string, handler: any) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function() {
  // @ts-ignore
  if (document.removeEventListener) {
    return function(element: HTMLElement, event: string, handler: any) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element: any, event: string, handler: any) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();


// 根据不同主题获取不同文字颜色
export function getTextColor(theme: string): string {
  return theme === 'light' ? cssVar['$theme-light-text'] : '#fff';
}

// 连接ws
export const initWs = function(url: string, cb: Function) {
  if (!(window as any).ws) {
    (window as any).ws = new WsConfig({
      // 自定义参数
    }, (msg: any) => {
      cb && cb(msg);
    });
    (window as any).ws.openWs(url);
  }
};

/**
 * 如果expiredTime === 0 表示永久保存
 * @param {*} data {key: '', val: '', ttl: 1000}
 * ttl: 过期时间 / 秒
 */
export function setLsCache(data: {key: string, val: string, ttl: number}) {
  if (!data.key || !data.val) {
    throw new Error('数据格式不对，data={key: "", val: "", ttl:  1000}');
  }
  const currentTime = new Date().getTime();
  const expiredTime = data.ttl ? data.ttl * 1000 + currentTime : 0;
  const obj = { val: data.val, expired: expiredTime };
  localStorage.setItem(data.key, JSON.stringify(obj));
}

export function getLsCache(key: string) {
  if (!key) {
    throw new Error('数据格式不对，请传key值');
  }

  let tem = localStorage.getItem(key);
  if (!tem) return null;

  try {
    let obj:{val: string, expired: number} = JSON.parse(tem);
    if (obj.expired === 0) {
      return obj.val;
    }
    if (obj.expired >= new Date().getTime()) {
      return obj.val;
    }
  
    localStorage.removeItem(key);
    // if (key === 'username') {
    //   setTimeout(() => {
    //     window.location.reload()
    //     // localStorage.setItem('logoutMsg', '您的登录信息已过期，请重新登录')
    //   }, 200)
    // }
    return null;
  } catch (e) {
    localStorage.removeItem(key);
    // if (key === 'username') {
    //   setTimeout(() => {
    //     window.location.reload()
    //     // localStorage.setItem('logoutMsg', '您的登录信息已过期，请重新登录')
    //   }, 200)
    // }
    throw new Error(`--getLsCache-- error: ${e}`)
  }
}

/**
 * 拼接url
 * @param url 
 * @param data {参数对象}
 */
export function paramToUrl(url: string, data: any) {
  if (!data) return '';
  let params = '';
  for (let k in data) {
    if (data.hasOwnProperty(k)) {
      params += k + '=' + data[k] + '&';
    }
  }
  params = params.substr(0, params.length - 1);
  return url.indexOf('?') > -1 ? url + '&' + params : url + '?' + params;
}

/**
 * 获取location.href的query参数
 * @param name key
 */
export function getLocationQuery(name: string) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var _search = window.location.href.substr(window.location.href.indexOf('?'));
  var r=_search.substr(1).replace(new RegExp(/(amp;)/g),'').match(reg);
  if (r != null) {
      return r[2];
  }
  return null;
};