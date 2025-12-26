import { Module } from '@nestjs/common';
import { BrowserSocketService } from './browser-socket.service';
import { BrowserSocketGateway } from './browser-socket.gateway';

@Module({
  providers: [BrowserSocketGateway, BrowserSocketService],
})
export class BrowserSocketModule {}
