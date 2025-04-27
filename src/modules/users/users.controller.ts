import { Controller, Get, Put, UseGuards, Req, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { User } from './entities/user.entity';

/**
 * UsersController는 사용자 관련 엔드포인트를 처리하는 컨트롤러입니다.
 * @Controller('users') 데코레이터는 이 컨트롤러의 기본 경로를 '/users'로 설정합니다.
 * @UseGuards(JwtAuthGuard)는 이 컨트롤러의 모든 엔드포인트에 JWT 인증을 적용합니다.
 */
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 현재 로그인한 사용자의 프로필 정보를 조회합니다.
   * @Get('me') 데코레이터는 GET /users/me 요청을 이 메서드로 라우팅합니다.
   * @Req() 데코레이터는 Express의 Request 객체를 주입합니다.
   * @returns 사용자 프로필 정보 (비밀번호 제외)
   */
  @Get('me')
  async getProfile(@Req() req: Request) {
    const user = await this.usersService.findOne(req.user['id']);
    const { password, ...result } = user;
    return result;
  }

  /**
   * 현재 로그인한 사용자의 프로필 정보를 수정합니다.
   * @Put('me') 데코레이터는 PUT /users/me 요청을 이 메서드로 라우팅합니다.
   * @Body() 데코레이터는 요청 본문의 데이터를 updateData 매개변수로 주입합니다.
   * @returns 수정된 사용자 프로필 정보 (비밀번호 제외)
   */
  @Put('me')
  async updateProfile(@Req() req: Request, @Body() updateData: Partial<User>) {
    const user = await this.usersService.update(req.user['id'], updateData);
    const { password, ...result } = user;
    return result;
  }
} 