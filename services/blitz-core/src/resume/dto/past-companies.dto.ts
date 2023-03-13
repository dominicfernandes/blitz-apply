import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator/types/decorator/decorators';
import { Month } from 'src/common/enums/months.enum';

export class PastCompanies {
  @IsString()
  companyName: string;

  @IsNumber()
  fromYear: number;

  @IsString()
  @IsOptional()
  fromMonth?: Month;

  @IsNumber()
  @IsOptional()
  toYear?: number;

  @IsString()
  @IsOptional()
  toMonth?: Month;

  @IsBoolean()
  isCurrentCompany: string;

  @IsString()
  designation: string;
}
