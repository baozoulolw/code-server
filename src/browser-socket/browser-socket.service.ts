import { Injectable } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { Socket } from 'socket.io';

export let config: RequestConfig | null = null;
export const clientMap: Map<string, Socket> = new Map();

@Injectable()
export class BrowserSocketService {
  /**
   * @description: 连接浏览器客户端
   * @Date: 2025-04-01 17:07:33
   * @Author: 王浩然
   * @param {Socket} client
   * @param {IncomingMessage} request
   * @return {*}
   */
  handleConnection(client: Socket, request: IncomingMessage) {
    const url = new URL(request.url!, `ws://${request.headers.host}`);
    const appCode = url.searchParams.get('appCode');
    const pageCode = url.searchParams.get('pageCode');
    const key = `${appCode}-${pageCode}`;
    if (clientMap.has(key)) {
      const oldSocket = clientMap.get(key);
      oldSocket.emit('disconnect');
    }
    clientMap.set(key, client);
    client.on('disconnect', () => this.disconnect(key));
    client.on('message', (message) => this.onMessage(message));
  }
  private disconnect(key: string) {
    clientMap.delete(key);
  }

  private onMessage(message: string) {
    const newConfig = JSON.parse(message) as RequestConfig;
    config = newConfig;
  }
}
