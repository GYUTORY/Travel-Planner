import { IsOptional, IsString, IsNumber } from 'class-validator';

export class SearchPlacesDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  lat?: number;

  @IsNumber()
  @IsOptional()
  lng?: number;

  @IsNumber()
  @IsOptional()
  radius?: number; // meter 단위
} 