import { Module } from '@nestjs/common';
import { CodeCompletionService } from './code-completion.service';
import { CodeCompletionController } from './code-completion.controller';

@Module({
  controllers: [CodeCompletionController],
  providers: [CodeCompletionService],
})
export class CodeCompletionModule {}
