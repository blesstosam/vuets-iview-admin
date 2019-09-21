import { HttpService } from '../util';
import { baseUrl } from '../server';
import { LOGIN } from './uri';

const httpInstance = new HttpService(baseUrl);

export function login(param: { username: string; password: string }): Promise<any> {
  return httpInstance.post(LOGIN, param);
}
