// 用接口来定义对象类型
import { Form, Menu, Upload } from 'iview';
import VueRouter from 'vue-router';

export interface Dic<T = string> {
  [k: string]: T;
}

// 侧边栏菜单数据类型
export interface MenuItem {
  title: string;
  icon: string;
  name: string;
  path: string;
  meta: { [key: string]: string };
  children?: Array<MenuItem>;
}
// Treeselect 需要的数据类型
export interface MenuTreeItem {
  id: string;
  label: string;
  children?: Array<MenuTreeItem>;
}

export interface User {
  username: string;
  avatar: string;
  token: string;
  roleId: string;
  adminId: string;
}

// 后台接口返回数据类型
export interface AjaxResponse<T = any> {
  /**
   * 状态码
   * @type { number }
   */
  code: number;

  /**
   * 数据
   * @type { T }
   */
  data: T;

  /**
   * 消息
   * @type { string }
   */
  msg: string;
}

//页码
export interface Pager {
  total: number;
  current: number;
  pageSize: number;
}
//table  表头
export interface TableHeader {
  type?: string;
  width?: number;
  align?: string;
  title?: string;
  key?: string;
  render?: (h: Function, params: any) => object;
  children?: Array<object>;
  slot?: string;
  fixed?: string;
  sortable?: boolean;
  minWidth?: number;
  filters?: Array<object>;
  filterMultiple?: boolean;
  filterMethod?: Function;
}

// *********************************** iview 类型定义
export type IForm = Form;
export type IMenu = Menu;
export type IUpload = Upload;
// 表单验证rule
export type IFormRuleItem = {
  required?: boolean;
  type?: string;
  message: string;
  trigger: string;
  min?: number;
  max?: number;
  validator?: Function;
};

// *********************************** Vue 类型定义
// options 后面加上详细定义
export type VueRouterWithOptions = VueRouter & { options: any };
