import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { IncomingMessage } from 'node:http';
import { Server, Socket } from 'socket.io';
import { BrowserSocketService } from './browser-socket.service';
@WebSocketGateway({ cors: { origin: '*' }, path: '/browser' })
export class BrowserSocketGateway implements OnGatewayConnection {
  constructor(private readonly browserSocketService: BrowserSocketService) {
    console.log('BrowserSocketGateway');
  }
  @WebSocketServer()
  server: Server;
  // 客户端连接时调用
  handleConnection(client: Socket, request: IncomingMessage) {
    this.browserSocketService.handleConnection(client, request);
  }
}
