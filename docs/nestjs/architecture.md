# NestJS 아키텍처 및 동작 흐름

## 1. 애플리케이션 시작점 (main.ts)

`main.ts`는 NestJS 애플리케이션의 진입점입니다. `bootstrap()` 함수가 애플리케이션을 초기화하고 시작합니다.

```typescript
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 글로벌 미들웨어 설정
  app.use(cors());
  app.use(helmet());
  
  // 글로벌 파이프 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  // 포트 바인딩 및 서버 시작
  await app.listen(3000);
}
bootstrap();
```

## 2. 모듈 구조

NestJS는 모듈 기반 아키텍처를 사용합니다. 각 기능별로 모듈이 분리되어 있으며, 모듈은 다음과 같은 구조를 가집니다:

```typescript
@Module({
  imports: [],      // 다른 모듈 import
  controllers: [],  // 컨트롤러 등록
  providers: [],    // 서비스, 가드, 파이프 등 제공자 등록
  exports: []       // 다른 모듈에서 사용할 수 있도록 export
})
```

### 주요 모듈 구성

1. **AppModule**: 루트 모듈
   - 다른 모든 모듈을 import
   - 글로벌 설정 관리

2. **AuthModule**: 인증 관련 기능
   - JWT 인증
   - 소셜 로그인
   - 로컬 인증

3. **UsersModule**: 사용자 관리
   - 사용자 CRUD
   - 프로필 관리

4. **TravelPlansModule**: 여행 계획 관리
   - 여행 일정 CRUD
   - 경로 최적화

## 3. 요청 처리 흐름

NestJS의 요청 처리 흐름은 다음과 같습니다:

1. **요청 수신**
   - HTTP 요청이 서버에 도착
   - 라우팅 시스템이 적절한 컨트롤러와 핸들러를 찾음

2. **미들웨어 처리**
   - 글로벌 미들웨어 실행
   - 컨트롤러 레벨 미들웨어 실행
   - 라우트 레벨 미들웨어 실행

3. **가드 처리**
   - 인증 가드 실행
   - 권한 가드 실행
   - 역할 기반 접근 제어

4. **인터셉터 처리**
   - 요청 변환
   - 응답 변환
   - 로깅, 캐싱 등

5. **파이프 처리**
   - 데이터 검증
   - 데이터 변환
   - 타입 변환

6. **컨트롤러 처리**
   - 라우트 핸들러 실행
   - 서비스 메서드 호출

7. **서비스 처리**
   - 비즈니스 로직 실행
   - 데이터베이스 작업 수행

8. **응답 반환**
   - 처리 결과를 클라이언트에 반환
   - HTTP 상태 코드 설정

## 4. 주요 컴포넌트

### 1. 컨트롤러 (Controller)
- HTTP 요청을 처리하는 컴포넌트
- 라우팅과 요청 처리 로직 담당
- 데코레이터를 사용하여 라우트 정의
- 서비스 계층과 통신

### 2. 서비스 (Service)
- 비즈니스 로직을 처리하는 컴포넌트
- 데이터베이스 작업 수행
- 다른 서비스와 통신
- 재사용 가능한 로직 제공

### 3. 가드 (Guard)
- 인증과 권한 검사를 담당
- 요청이 처리되기 전에 실행
- JWT 검증, 역할 기반 접근 제어 등

### 4. 파이프 (Pipe)
- 데이터 변환과 검증 담당
- 입력 데이터의 유효성 검사
- 데이터 형식 변환

### 5. 인터셉터 (Interceptor)
- 요청과 응답을 가로채서 처리
- 로깅, 캐싱, 에러 처리 등
- AOP(Aspect-Oriented Programming) 구현

## 5. 의존성 주입 (Dependency Injection)

NestJS는 강력한 의존성 주입 시스템을 제공합니다:

```typescript
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService
  ) {}
}
```

- `@Injectable()`: 클래스를 의존성 주입 가능하게 만듦
- 생성자 주입: 의존성을 생성자를 통해 주입
- 순환 의존성 해결: `forwardRef()` 사용

## 6. 예외 처리

NestJS는 내장된 예외 처리 시스템을 제공합니다:

```typescript
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exception.message,
      });
  }
}
```

- `@Catch()`: 처리할 예외 타입 지정
- `ExceptionFilter`: 예외 필터 인터페이스 구현
- 글로벌 필터 적용 가능 