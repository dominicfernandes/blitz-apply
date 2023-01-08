import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TextGenerationService } from './text-generation.service';

jest.mock('openai', () => ({
  OpenAIApi: jest.fn().mockImplementation(() => ({
    createCompletion: jest.fn(),
  })),
  Configuration: jest.fn().mockImplementation(),
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
});
