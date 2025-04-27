import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * bootstrap() 함수는 NestJS 애플리케이션의 진입점입니다.
 * 이 함수는 애플리케이션을 초기화하고 시작하는 역할을 합니다.
 * 
 * 주요 기능:
 * 1. NestFactory.create()로 애플리케이션 인스턴스 생성
 * 2. 글로벌 미들웨어 설정
 * 3. 파이프 설정
 * 4. 포트 바인딩 및 서버 시작
 */
async function bootstrap() {
  // NestFactory.create()로 AppModule을 기반으로 애플리케이션 인스턴스 생성
  const app = await NestFactory.create(AppModule);
  
  // 글로벌 파이프 설정
  // ValidationPipe는 요청 데이터의 유효성을 검사하는 역할을 합니다.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성은 제거
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 에러 발생
      transform: true, // 요청 데이터를 DTO 클래스로 자동 변환
    }),
  );

  // 서버를 지정된 포트로 시작
  // process.env.PORT가 없으면 3000번 포트 사용
  await app.listen(process.env.PORT ?? 3000);
}

// bootstrap() 함수 실행
bootstrap();
