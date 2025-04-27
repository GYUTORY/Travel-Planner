# NestJS 데코레이터와 모듈 구조

## 1. 주요 데코레이터

### 1.1 모듈 관련 데코레이터

```typescript
@Module({
  imports: [OtherModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule {}
```

- `@Module()`: 클래스를 NestJS 모듈로 선언
- `imports`: 필요한 다른 모듈들을 import
- `controllers`: 모듈에서 사용하는 컨트롤러들
- `providers`: 모듈에서 사용하는 서비스, 가드, 파이프 등
- `exports`: 다른 모듈에서 사용할 수 있도록 export

### 1.2 컨트롤러 관련 데코레이터

```typescript
@Controller('users')
export class UsersController {
  @Get()
  findAll() {}

  @Post()
  create() {}

  @Put(':id')
  update() {}

  @Delete(':id')
  remove() {}
}
```

- `@Controller()`: 클래스를 컨트롤러로 선언
- `@Get()`, `@Post()`, `@Put()`, `@Delete()`: HTTP 메서드 핸들러
- `@Param()`: 라우트 파라미터 접근
- `@Body()`: 요청 본문 접근
- `@Query()`: 쿼리 파라미터 접근
- `@Headers()`: 요청 헤더 접근

### 1.3 서비스 관련 데코레이터

```typescript
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
}
```

- `@Injectable()`: 클래스를 의존성 주입 가능하게 만듦
- `@Inject()`: 커스텀 프로바이더 주입
- `@InjectRepository()`: TypeORM 리포지토리 주입

### 1.4 가드 관련 데코레이터

```typescript
@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // 인증 로직
  }
}
```

- `@UseGuards()`: 가드 적용
- `@Roles()`: 역할 기반 접근 제어
- `@Public()`: 공개 엔드포인트 표시

### 1.5 파이프 관련 데코레이터

```typescript
@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // 변환 로직
  }
}
```

- `@UsePipes()`: 파이프 적용
- `@Transform()`: 데이터 변환
- `@Validate()`: 데이터 검증

## 2. 모듈 구조

### 2.1 기능 모듈 (Feature Module)

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
```

- 특정 기능을 캡슐화
- 관련된 컨트롤러, 서비스, 리포지토리 포함
- 필요한 경우 다른 모듈 export

### 2.2 공유 모듈 (Shared Module)

```typescript
@Module({
  providers: [CommonService],
  exports: [CommonService]
})
export class SharedModule {}
```

- 여러 모듈에서 공통으로 사용되는 기능 제공
- 재사용 가능한 컴포넌트 포함
- 필요한 서비스나 컴포넌트 export

### 2.3 글로벌 모듈 (Global Module)

```typescript
@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}
```

- `@Global()` 데코레이터로 선언
- 모든 모듈에서 사용 가능
- 설정, 로깅 등 전역적으로 필요한 기능 제공

### 2.4 동적 모듈 (Dynamic Module)

```typescript
@Module({})
export class DatabaseModule {
  static forRoot(options: DatabaseOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'DATABASE_OPTIONS',
          useValue: options
        },
        DatabaseService
      ],
      exports: [DatabaseService]
    };
  }
}
```

- 런타임에 구성 가능한 모듈
- 설정 옵션을 받아 동적으로 구성
- `forRoot()`, `forFeature()` 등의 정적 메서드 제공

## 3. 모듈 간 통신

### 3.1 모듈 Import/Export

```typescript
// users.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UsersService]
})
export class UsersModule {}

// auth.module.ts
@Module({
  imports: [UsersModule],
  providers: [AuthService]
})
export class AuthModule {}
```

- 모듈 간 의존성 설정
- 필요한 서비스나 컴포넌트 공유
- 순환 의존성 방지

### 3.2 커스텀 프로바이더

```typescript
@Module({
  providers: [
    {
      provide: 'CONNECTION',
      useFactory: (optionsProvider: OptionsProvider) => {
        const options = optionsProvider.get();
        return new DatabaseConnection(options);
      },
      inject: [OptionsProvider]
    }
  ]
})
export class DatabaseModule {}
```

- 유연한 의존성 주입
- 팩토리 패턴 구현
- 비동기 초기화 지원

## 4. 모듈 생명주기

### 4.1 모듈 초기화

```typescript
@Module({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (config: ConfigService) => {
        return () => config.load();
      },
      inject: [ConfigService],
      multi: true
    }
  ]
})
export class AppModule {}
```

- 애플리케이션 시작 시 초기화
- 비동기 초기화 지원
- 여러 초기화 작업 순차 실행

### 4.2 모듈 종료

```typescript
@Injectable()
export class AppService implements OnModuleDestroy {
  onModuleDestroy() {
    // 정리 작업
  }
}
```

- 애플리케이션 종료 시 정리
- 리소스 해제
- 연결 종료 