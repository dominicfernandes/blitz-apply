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

  /**
   * generates text based on the prompt provided
   * @param prompt text keywords used to tell openAI what kind of content to generate
   * @param temperature defines randomness of the content that is generated
   * @param max_tokens specifies the length of the content
   * @param model specifies what text generation model to be used
   * @returns response from openAI containing content of the prompt
   */
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
