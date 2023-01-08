import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TextModels } from '../enums/models.enum';
import { TextGenerationService } from './text-generation.service';

jest.mock('openai', () => ({
  OpenAIApi: jest.fn().mockImplementation(() => ({
    createCompletion: jest.fn().mockImplementation(() => ({
      data: 'OpenAI generated data.',
    })),
  })),
  Configuration: jest.fn(),
}));

describe('TextGenerationService', () => {
  let service: TextGenerationService;

  beforeEach(async () => {
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
});
