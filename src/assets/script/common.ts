import store from '@/store/index';
import { baseUrl } from '@/api/server';
import cfg from '@/config/index';

//-------------------------------日期选择 格式化
export function formatDataToSecond(d: Date): string {
  const resDate = d.getFullYear() + '-' + addZero(d.getMonth() + 1) + '-' + addZero(d.getDate());
  const resTime = addZero(d.getHours()) + ':' + addZero(d.getMinutes()) + ':' + addZero(d.getSeconds());
  const str = resDate + ' ' + resTime;
  return str;
}
export function formatDataToDay(d: Date): string {
  //	console.log(d)
  const resDate = d.getFullYear() + '-' + addZero(d.getMonth() + 1) + '-' + addZero(d.getDate());
  return resDate;
}

export function formatDataHoursMin(d: Date): string {
  const resDate = d.getFullYear() + '-' + addZero(d.getMonth() + 1) + '-' + addZero(d.getDate());
  const resTime = addZero(d.getHours()) + ':' + addZero(d.getMinutes());
  const str = resDate + ' ' + resTime;
  return str;
}

export function addZero(s: number): string {
  return s < 10 ? '0' + s : String(s);
}

export function getDate(addNO: number): Array<string> {
  let myDate = new Date();
  let result, result2;
  myDate.setDate(myDate.getDate() - addNO);
  let y = myDate.getFullYear();
  let m = myDate.getMonth() + 1;
  let d = myDate.getDate();
  let h = myDate.getHours();
  let mm = myDate.getMinutes();
  let s = myDate.getSeconds();
  result = y + '-' + add0(m) + '-' + add0(d);
  result2 = add0(h) + ':' + add0(mm) + ':' + add0(s);
  return [result, result2];
}
export function add0(m: number) {
  return m < 10 ? '0' + m : m;
}

export function excelUrl(o: any = {}, api: string) {
  let str: string = '';
  const locale = (store.state as any).app.local === cfg.langType.CN ? 'zh_CN' : 'en_US';
  const orgCode = (store.state as any).user.orgCode;
  const token = localStorage.getItem('token');
  Object.keys(o).forEach(function(key: any) {
    if (o[key] !== '') {
      str += `&${key}=${o[key]}`;
    }
  });
  return `${baseUrl}${api}?locale=${locale}&orgCode=${orgCode}&token=${token}${str}`;
}
