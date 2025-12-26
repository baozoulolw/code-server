import { Body, Controller, Post } from '@nestjs/common';
import { PageServerService } from './page-server.service';

@Controller('page-server')
export class PageServerController {
  constructor(private readonly pageServerService: PageServerService) {}
  @Post('getPage')
  getPage(@Body() body: { pageCode: string; appCode: string }) {
    return this.pageServerService.getPage(body.appCode, body.pageCode);
  }
  @Post('setPage')
  setPage(@Body() body: SetPageInfo) {
    return this.pageServerService.setPage(body);
  }
}
