import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, CreateCompletionResponse, OpenAIApi } from 'openai';
import { TextModels } from '../enums/models.enum';

@Injectable()
export class TextGenerationService {
  private openAIClient: OpenAIApi;

  constructor(private readonly configService: ConfigService) {
    const config = new Configuration({
      apiKey: configService.get<string>('OPENAI_SECRET'),
    });
    this.openAIClient = new OpenAIApi(config);
  }

  async generateTextFromPrompt(
    prompt: string,
    temperature: number,
    max_tokens: number,
    model: TextModels,
  ): Promise<CreateCompletionResponse> {
    try {
      const { data } = await this.openAIClient.createCompletion({
        model,
        prompt,
        temperature,
        max_tokens,
      });
      return data;
    } catch (error) {
      console.log((error as any).response);
    }
  }
}
