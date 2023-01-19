import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { GenerateDocumentDto } from '../../common/dto/generate-document.dto';
import { PastCompanies } from './past-companies.dto';

export class GenerateResumeDto extends GenerateDocumentDto {
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @IsString()
  profession: string;

  @IsNumber()
  yearsOfExperience: number;

  @IsString()
  @IsOptional()
  optionalDetails: string;

  @IsArray()
  @Type(() => PastCompanies)
  pastCompanies?: PastCompanies[];

  @IsString()
  @IsOptional()
  address?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  linkedIn?: string;
}
