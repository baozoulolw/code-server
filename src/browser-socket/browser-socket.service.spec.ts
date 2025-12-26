import { Test, TestingModule } from '@nestjs/testing';
import { BrowserSocketService } from './browser-socket.service';

describe('BrowserSocketService', () => {
  let service: BrowserSocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrowserSocketService],
    }).compile();

    service = module.get<BrowserSocketService>(BrowserSocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
