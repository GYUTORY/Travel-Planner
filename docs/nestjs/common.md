# common 디렉토리 구조 및 역할

NestJS 프로젝트에서 `common` 디렉토리는 전역적으로 재사용되는 유틸리티, 미들웨어, 데코레이터, 가드, 필터, 인터셉터, 파이프 등을 모아두는 공간입니다. 대규모 프로젝트에서 코드의 일관성과 재사용성을 높이기 위해 자주 사용됩니다.

---

## 하위 폴더별 역할

### 1. decorators
- **커스텀 데코레이터**를 정의합니다.
- 예시: `@CurrentUser()`, `@Roles()`, `@Public()` 등
- 컨트롤러, 서비스, 파이프 등에서 반복적으로 쓰이는 데코레이터를 모아둡니다.

### 2. filters
- **예외 필터(Exception Filter)**를 정의합니다.
- 예시: HTTP 예외, 데이터베이스 에러, Validation 에러 등 공통 에러 처리 로직
- NestJS의 `@Catch()`와 함께 사용

### 3. guards
- **가드(Guard)**를 정의합니다.
- 예시: 인증/인가(JWT, Roles, Permissions 등) 관련 로직
- 요청이 컨트롤러에 도달하기 전에 실행되어 접근을 제어합니다.

### 4. interceptors
- **인터셉터(Interceptor)**를 정의합니다.
- 예시: 로깅, 응답 변환, 캐싱, 트랜잭션, 성능 측정 등
- 요청/응답을 가로채서 추가 작업을 수행합니다.

### 5. pipes
- **파이프(Pipe)**를 정의합니다.
- 예시: 데이터 검증(Validation), 변환(Transformation) 등
- 컨트롤러에 전달되기 전 데이터의 유효성 검사 및 변환을 담당합니다.

---

## 왜 common 디렉토리를 사용하는가?
- **코드 중복 방지**: 여러 모듈/컨트롤러에서 반복되는 로직을 한 곳에 모아 재사용
- **유지보수성 향상**: 공통 로직을 한 곳에서 관리하여 수정이 쉬움
- **일관성**: 인증, 예외 처리, 데이터 검증 등 전역 정책을 일관되게 적용

---

## 예시 구조

```
common/
  decorators/
    current-user.decorator.ts
    roles.decorator.ts
  filters/
    http-exception.filter.ts
  guards/
    jwt-auth.guard.ts
    roles.guard.ts
  interceptors/
    logging.interceptor.ts
  pipes/
    validation.pipe.ts
```

---

NestJS에서 `common` 폴더는 대규모 프로젝트에서 특히 중요한 역할을 하며, 각 기능별로 세분화된 구조를 갖추는 것이 베스트 프랙티스입니다. 