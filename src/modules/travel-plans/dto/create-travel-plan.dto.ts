import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateTravelPlanDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
} 