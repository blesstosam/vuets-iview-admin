import { HttpService } from '../util';
import { baseUrl } from '../server';
import { LOGIN } from './uri';
import { AjaxResponse } from '@/type';

const httpInstance = new HttpService(baseUrl);

export function login(param: { username: string; password: string }): Promise<AjaxResponse> {
  return httpInstance.post(LOGIN, param);
}
