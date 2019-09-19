import { HttpService } from '../util';
import { baseUrl } from '../server';
import {CHART_DATA_BY_WEEK} from './uri'

const httpInstance = new HttpService(baseUrl);


export function getChartDataByWeek(param: {target: string}): Promise<any> {
  return httpInstance.post(CHART_DATA_BY_WEEK, param)
}