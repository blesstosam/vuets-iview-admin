import { HttpService } from '../util';
import { baseUrl } from '../server';
import { CHART_DATA_BY_WEEK, ONLINE_USER, OVERVIEW } from './uri';
import { AjaxResponse } from '@/type';

const httpInstance = new HttpService(baseUrl);

export function getOverviewData(): Promise<AjaxResponse> {
  return httpInstance.post(OVERVIEW);
}
export function getChartDataByWeek(param: { target: string }): Promise<AjaxResponse> {
  return httpInstance.post(CHART_DATA_BY_WEEK, param);
}
export function getOnlineUser(): Promise<AjaxResponse> {
  return httpInstance.post(ONLINE_USER);
}
