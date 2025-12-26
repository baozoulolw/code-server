import { Test, TestingModule } from '@nestjs/testing';
import { PageServerController } from './page-server.controller';
import { PageServerService } from './page-server.service';

describe('PageServerController', () => {
  let controller: PageServerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PageServerController],
      providers: [PageServerService],
    }).compile();

    controller = module.get<PageServerController>(PageServerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
