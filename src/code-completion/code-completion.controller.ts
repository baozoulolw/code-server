import { Body, Controller, Post } from '@nestjs/common';
import { CodeCompletionService } from './code-completion.service';
import { CompletionCopilot } from 'monacopilot';
import AiUtils from 'src/utils/ai';

const aiUtils = new AiUtils();

@Controller('code-completion')
export class CodeCompletionController {
  constructor(private readonly codeCompletionService: CodeCompletionService) {}
  @Post('mistral')
  async baseCompletion(
    @Body() body,
  ): ReturnType<CompletionCopilot['complete']> {
    const completionRes = await aiUtils
      .getCopliot('mistral')
      .complete({ body });

    return completionRes;
  }
  @Post('fim/deepSeek')
  async deepSeekFimCompletion(
    @Body() body,
  ): ReturnType<CompletionCopilot['complete']> {
    const completionRes = await aiUtils
      .getCopliot('deepSeekFim')
      .complete({ body });

    return completionRes;
  }
  @Post('com/deepSeek')
  async deepSeekComCompletion(
    @Body() body,
  ): ReturnType<CompletionCopilot['complete']> {
    const completionRes = await aiUtils
      .getCopliot('deepSeekCom')
      .complete({ body });

    return completionRes;
  }
}
