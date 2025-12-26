import { Test, TestingModule } from '@nestjs/testing';
import { CodeCompletionController } from './code-completion.controller';
import { CodeCompletionService } from './code-completion.service';

describe('CodeCompletionController', () => {
  let controller: CodeCompletionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CodeCompletionController],
      providers: [CodeCompletionService],
    }).compile();

    controller = module.get<CodeCompletionController>(CodeCompletionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
