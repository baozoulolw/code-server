import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrowserSocketModule } from './browser-socket/browser-socket.module';
import { PageServerModule } from './page-server/page-server.module';
import { CodeCompletionModule } from './code-completion/code-completion.module';

@Module({
  imports: [BrowserSocketModule, PageServerModule, CodeCompletionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
