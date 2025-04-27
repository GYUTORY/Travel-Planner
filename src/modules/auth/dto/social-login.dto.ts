import { IsString } from 'class-validator';

export class SocialLoginDto {
  @IsString()
  provider: string;
 
  @IsString()
  accessToken: string;
} 