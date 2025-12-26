import { Test, TestingModule } from '@nestjs/testing';
import { BrowserSocketGateway } from './browser-socket.gateway';
import { BrowserSocketService } from './browser-socket.service';

describe('BrowserSocketGateway', () => {
  let gateway: BrowserSocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrowserSocketGateway, BrowserSocketService],
    }).compile();

    gateway = module.get<BrowserSocketGateway>(BrowserSocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
