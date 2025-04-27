import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SocialLoginDto } from './dto/social-login.dto';

/**
 * AuthController는 인증 관련 엔드포인트를 처리하는 컨트롤러입니다.
 * @Controller('auth') 데코레이터는 이 컨트롤러의 기본 경로를 '/auth'로 설정합니다.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 새로운 사용자를 등록합니다.
   * @Post('register') 데코레이터는 POST /auth/register 요청을 이 메서드로 라우팅합니다.
   * @Body() 데코레이터는 요청 본문의 데이터를 registerDto 매개변수로 주입합니다.
   * @returns 등록된 사용자 정보 (비밀번호 제외)
   */
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * 사용자 로그인을 처리합니다.
   * @Post('login') 데코레이터는 POST /auth/login 요청을 이 메서드로 라우팅합니다.
   * @Body() 데코레이터는 요청 본문의 데이터를 loginDto 매개변수로 주입합니다.
   * @returns JWT 액세스 토큰
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * 소셜 로그인을 처리합니다.
   * @Post('social/login') 데코레이터는 POST /auth/social/login 요청을 이 메서드로 라우팅합니다.
   * @Body() 데코레이터는 요청 본문의 데이터를 socialLoginDto 매개변수로 주입합니다.
   * @returns 소셜 로그인 처리 결과
   */
  @Post('social/login')
  async socialLogin(@Body() socialLoginDto: SocialLoginDto) {
    return this.authService.socialLogin(socialLoginDto);
  }
} 