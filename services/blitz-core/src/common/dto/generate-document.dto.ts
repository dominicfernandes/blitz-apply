import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { DocumentType } from '../enums/document-types.enum';

export class GenerateDocumentDto {
  @IsEnum(DocumentType)
  documentType: DocumentType;

  @IsString()
  prompt: string;

  @IsNumber()
  @Min(0)
  length: number;

  @IsNumber()
  @Max(10)
  @Min(0)
  variation: number;

  @IsString()
  @IsOptional()
  previousText?: string;
}
