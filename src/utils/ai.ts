import { find, entries, isEmpty } from 'lodash';
import { CompletionCopilot } from 'monacopilot';
import OpenAI from 'openai';
type CopilotModel = {
  name: string;
  model: CompletionCopilot;
};

const modelConfig = {
  deepSeekFim: {
    name: 'deepSeekFim',
    url: 'https://api.deepseek.com/beta',
    apiKey: 'sk-9ccf62237f5d4d399977be91de6600da',
    model: async (prompt: any, openAi: OpenAI) => {
      const completion = await openAi.completions.create({
        model: 'deepseek-chat',
        prompt: `Context: ${prompt.context}\nFile: ${prompt.fileContent}\nTask: ${prompt.instruction}`,
        max_tokens: 999,
      });
      console.log(completion);
      return { text: completion.choices[0].text };
    },
  },
  deepSeekCom: {
    name: 'deepSeekCom',
    url: 'https://api.deepseek.com',
    apiKey: 'sk-9ccf62237f5d4d399977be91de6600da',
    model: async (prompt: any, openAi: OpenAI) => {
      const completion = await openAi.chat.completions.create({
        messages: [
          { role: 'system', content: prompt.context },
          {
            role: 'user',
            content: `${prompt.instruction}\n\n${prompt.fileContent}`,
          },
        ],
        model: 'deepseek-chat',
      });
      console.log(completion);
      return { text: completion.choices[0].message.content };
    },
  },
  qwen: {
    name: 'qwen',
    url: 'http://124.223.25.122:3003/openai-qwen-oauth/v1',
    apiKey: 'w123456789',
    model: async (prompt: any, openAi: OpenAI) => {
      const completion = await openAi.chat.completions.create({
        messages: [
          { role: 'system', content: prompt.context },
          {
            role: 'user',
            content: `${prompt.instruction}\n\n${prompt.fileContent}`,
          },
        ],
        model: 'qwen3-coder-plus',
      });
      return { text: completion.choices[0].message.content };
    },
  },
  kimi_2_5: {
    name: 'kimi_2_5',
    url: 'http://172.16.4.197:8002/v1',
    apiKey: 'sk-MTc3MzYyNDI1NDUzMx2ocCahvu34aSd0V5XoeEBt1Jk7cdH-5DESx_0VKI_w',
    model: async (prompt: any, openAi: OpenAI) => {
      const completion = await openAi.chat.completions.create({
        messages: [
          { role: 'system', content: prompt.context },
          {
            role: 'user',
            content: `${prompt.instruction}\n\n${prompt.fileContent}`,
          },
        ],
        model: 'kimi-k2.5',
      });
      return { text: completion.choices[0].message.content };
    },
  },
};
const defaultModels = {
  mistral: {
    apiKey: 'IY8Uhy5SS3Yk0Kq2ERCyXXlAoZNOWnda',
    provider: 'mistral',
    model: 'codestral',
  },
};
class AiUtils {
  models: CopilotModel[] = [];
  constructor() {
    entries(defaultModels).forEach(([key, item]: [string, any]) => {
      console.log(this.models);
      this.models.push({
        name: key,
        model: new CompletionCopilot(item.apiKey, {
          provider: item.provider,
          model: item.model,
        }),
      });
    });
  }
  getCopliot(name: string) {
    const model = find(this.models, { name });
    if (isEmpty(model)) {
      const config = find(modelConfig, { name });
      const openai = new OpenAI({
        apiKey: config.apiKey,
        baseURL: config?.url,
      });
      const model = {
        name,
        model: new CompletionCopilot(undefined, {
          model: (prompt) => {
            return config.model(prompt, openai);
          },
        }),
      };
      this.models.push(model);
      return this.getCopliot(name);
    }
    return model.model;
  }
}

export default AiUtils;
