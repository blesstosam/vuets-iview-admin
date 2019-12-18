import { wsUrl } from '@/api/server';
import { paramToUrl } from '@/assets/script/util';
// http://192.168.3.12:6016/user/websocket/socketServer.do

class WsConfig {
  ws: any; // ws 实例
  url: string; // ws连接地址, 在openWs方法传入
  cb?: Function; // ws连接成功回调, 在openWs方法传入
  msgCb: Function; // 处理消息成功回调
  params: { [key: string]: string }; // 连接websocket url上带的参数
  isReconnected: boolean;

  constructor(params: { [key: string]: string }, msgcb: Function) {
    this.isReconnected = false;
    this.ws = null;
    this.url = '';
    this.params = params;
    this.msgCb = msgcb;
  }

  openWs(url: string, cb?: Function) {
    if (this.ws) {
      return;
    }
    this.url = paramToUrl(wsUrl + url, this.params);
    this.cb = cb;
    this._open(this.url);
  }

  closeWs() {
    if (this.ws) {
      this.ws.close();
    }
  }

  checkReconnected() {
    if ('WebSocket' in window) {
      if (this.isReconnected === false) {
        setTimeout(() => {
          this._open(this.url);
        }, 1000);
      }
    }
  }

  handleWebSocketMsg(data: string) {
    this.msgCb && this.msgCb(data);
  }

  // 发送信息给服务器
  send(msg: string) {
    this.ws && this.ws.send(msg);
  }

  // 私有方法 内部使用，连接
  _open(_url: string) {
    if ('WebSocket' in window) {
      this.ws = new WebSocket(_url);
      this.ws.onopen = () => {
        /* eslint-disable no-console */
        console.log('ws opened...');
        this.isReconnected = true;
        this.cb && this.cb(); // 连接成功回调
      };

      this.ws.onmessage = (evt: any) => {
        // console.log(evt.data, 'msg');
        this.handleWebSocketMsg(evt.data);
      };

      this.ws.onclose = () => {
        console.log('ws closed...');
        this.isReconnected = false;
        setTimeout(() => {
          this.checkReconnected();
        }, 3000);
      };

      this.ws.onerror = (evt: any) => {
        console.log(evt, 'ws open onerror');
        this.isReconnected = false;
      };
    } else {
      /* eslint-disable no-console */
      console.error('您的浏览器不支持 WebSocket!');
    }
  }
}

export default WsConfig;
