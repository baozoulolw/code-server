import { Module } from '@nestjs/common';
import { PageServerService } from './page-server.service';
import { PageServerController } from './page-server.controller';
import { BrowserSocketService } from 'src/browser-socket/browser-socket.service';

@Module({
  controllers: [PageServerController],
  providers: [PageServerService, BrowserSocketService],
})
export class PageServerModule {}
