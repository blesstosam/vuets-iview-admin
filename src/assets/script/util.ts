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
  // console.log(item, 'showtitle')
  let { title } = item.meta
  if (!title) return ''

  if (title.includes('{{') && title.includes('}}')) {
    title = title.replace(/({{[\s\S]+?}})/, (m: any, str: string) => str.replace(/{{([\s\S]*)}}/, (m, _) => vm.$t(_.trim())))
  } else {
    title = (item.meta && item.meta.title) || item.name
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

export const forEach = (arr: Array<any>, fn: Function) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}
export const hasChild = (item: any) => {
  return item.children && item.children.length !== 0
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr: Array<any>, arr: Array<any>) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}
const showThisMenuEle = (item: any, access: any) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true
    else return false
  } else return true
}

type MenuItem  = {
  icon: string,
  name: string,
  meta: {href?: string, icon?: string},
  children?: Array<MenuItem>,
  href?: string
}
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list: Array<any>, access: any) => {
  let res: Array<MenuItem> = []
  forEach(list, (item: any) => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj: MenuItem = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
        obj.children = getMenuByRouter(item.children, access)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (showThisMenuEle(item, access)) res.push(obj)
    }
  })
  return res
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