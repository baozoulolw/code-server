import { Test, TestingModule } from '@nestjs/testing';
import { PageServerService } from './page-server.service';

describe('PageServerService', () => {
  let service: PageServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageServerService],
    }).compile();

    service = module.get<PageServerService>(PageServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
