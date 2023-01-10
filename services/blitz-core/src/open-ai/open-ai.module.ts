import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TextGenerationService } from './services/text-generation.service';

@Module({
  providers: [TextGenerationService, ConfigService],
  exports: [TextGenerationService],
})
export class OpenAiModule {}
