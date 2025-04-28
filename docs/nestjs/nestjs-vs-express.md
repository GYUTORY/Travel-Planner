# NestJS vs Express 차이점 정리

## 1. 개요

| 구분      | NestJS                                   | Express                        |
|-----------|------------------------------------------|--------------------------------|
| 프레임워크| Node.js 기반의 **프레임워크**            | Node.js 기반의 **웹 프레임워크**|
| 아키텍처  | Angular에서 영감을 받은 **OOP, DI, 모듈** | 미니멀, 유연한 구조             |
| 목적      | 대규모, 유지보수성 높은 서버 개발         | 빠르고 간단한 서버 개발         |

---

## 2. 주요 특징 비교

### 구조 및 설계 철학

- **NestJS**
  - Angular에서 영감을 받은 구조 (Module, Controller, Service, Provider 등)
  - **의존성 주입(Dependency Injection)** 지원
  - **OOP, FP, FRP** 등 다양한 프로그래밍 패러다임 지원
  - 코드의 일관성, 테스트 용이성, 확장성에 초점

- **Express**
  - 미들웨어 기반의 단순한 구조
  - 자유로운 설계, 규칙이 거의 없음
  - 빠른 프로토타이핑에 적합
  - 작은 프로젝트나 단순 API 서버에 적합

---

### 코드 예시

#### Express

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000);
```

#### NestJS

```ts
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
```

---

### 확장성 및 유지보수

- **NestJS**
  - 대규모 프로젝트에 적합 (모듈화, DI, 데코레이터 등)
  - 테스트, 문서화, 코드 재사용에 강점
  - 공식적으로 GraphQL, WebSocket, Microservices 등 다양한 기능 지원

- **Express**
  - 구조가 자유로워 대규모 프로젝트에서는 코드 관리가 어려울 수 있음
  - 미들웨어로 확장 가능하지만, 일관성 유지가 어려움

---

### 타입 지원

- **NestJS**
  - TypeScript를 기본 지원 (JS도 가능)
  - 타입 기반 개발로 안정성, 자동완성, 리팩토링에 유리

- **Express**
  - JavaScript 기반 (TypeScript 지원은 별도 @types/express 필요)
  - 타입 안정성은 낮음

---

### 커뮤니티 및 생태계

- **NestJS**
  - 최근 빠르게 성장 중
  - 공식 문서, 예제, 플러그인 풍부

- **Express**
  - Node.js 생태계에서 가장 오래되고 널리 쓰임
  - 방대한 미들웨어와 자료

---

## 3. 언제 어떤 프레임워크를 선택할까?

| 상황/목적                          | 추천 프레임워크 |
|-------------------------------------|----------------|
| 빠른 프로토타입, 소규모 서비스      | Express        |
| 대규모 서비스, 유지보수성 중요      | NestJS         |
| TypeScript 기반 개발                | NestJS         |
| 자유로운 설계, 최소한의 구조 필요   | Express        |
| 테스트, 모듈화, 확장성 중시         | NestJS         |

---

## 4. 결론

- **Express**는 빠르고 단순한 서버 개발에 적합하며, 자유도가 높아 소규모 프로젝트에 유리합니다.
- **NestJS**는 구조화된 개발, 유지보수, 확장성, 테스트, 타입 안정성 등 엔터프라이즈급 프로젝트에 적합합니다.

---

> **참고:**  
> NestJS는 내부적으로 Express(혹은 Fastify)를 사용하므로, Express의 모든 기능을 사용할 수 있습니다.  
> 즉, NestJS는 Express의 상위 추상화 프레임워크라고 볼 수 있습니다. 