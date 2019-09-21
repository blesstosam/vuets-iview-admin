import { HttpService } from '../util';
import { baseUrl } from '../server';
import { CHART_DATA_BY_WEEK, ONLINE_USER, OVERVIEW } from './uri';

const httpInstance = new HttpService(baseUrl);

export function getOverviewData(): Promise<any> {
  return httpInstance.post(OVERVIEW);
}
export function getChartDataByWeek(param: { target: string }): Promise<any> {
  return httpInstance.post(CHART_DATA_BY_WEEK, param);
}
export function getOnlineUser(): Promise<any> {
  return httpInstance.post(ONLINE_USER);
}
