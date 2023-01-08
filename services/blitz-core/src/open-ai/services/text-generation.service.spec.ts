import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TextModels } from '../enums/models.enum';
import { TextGenerationService } from './text-generation.service';

jest.mock('openai', () => ({
  OpenAIApi: jest.fn().mockImplementation(() => ({
    createCompletion: jest
      .fn()
      .mockImplementationOnce(() => ({
        data: 'OpenAI generated data.',
      }))
      .mockImplementationOnce(() => {
        throw new Error('error');
      }),
  })),
  Configuration: jest.fn(),
}));

describe('TextGenerationService', () => {
  let service: TextGenerationService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [TextGenerationService],
    }).compile();

    service = module.get<TextGenerationService>(TextGenerationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate text out from the prompt', async () => {
    const response = await service.generateTextFromPrompt(
      'test',
      1,
      100,
      TextModels.DaVinci,
    );
    expect(response).toEqual('OpenAI generated data.');
  });

  it('should throw an error when the client fails to get data', async () => {
    try {
      const response = await service.generateTextFromPrompt(
        'test',
        1,
        100,
        TextModels.DaVinci,
      );
      console.log(response);
    } catch (error) {
      expect(error.message).toEqual('error');
    }
  });
});
