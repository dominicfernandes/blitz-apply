import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ResumeModule } from './resume/resume.module';

@Module({
  imports: [ConfigModule.forRoot(), ResumeModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
