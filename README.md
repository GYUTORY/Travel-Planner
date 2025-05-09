# Travel-Planner

## 주요 기능

### 1. 사용자 관리
- 회원가입/로그인 (이메일, 소셜)
- 사용자 프로필 관리
- 여행 선호도 설정

### 2. 여행 계획 관리
- 여행 일정 생성/수정/삭제
- 다중 사용자 동시 편집
- 일정 공유 및 협업
- 여행 상태 관리 (계획중/확정/완료)

### 3. 장소 관리
- 장소 검색 및 상세 정보 조회
- 장소 카테고리별 필터링
- 리뷰 및 평점 시스템
- 영업시간 및 가격 정보

### 4. 경로 최적화
- 다중 경유지 최적 경로 계산
- 이동 수단별 경로 추천
- 실시간 교통 정보 반영
- 이동 시간 예측

### 5. 알림 시스템
- 일정 변경 알림
- 날씨 정보 알림
- 긴급 상황 알림
- 알림 설정 관리

### 6. 날씨 정보
- 여행지 날씨 예보
- 시간대별 날씨 정보
- 기상 특보 알림

## API 목록

### 1. 사용자 관리 API
- POST /auth/register - 회원가입
- POST /auth/login - 로그인
- POST /auth/social/login - 소셜 로그인
- GET /users/me - 사용자 정보 조회
- PUT /users/me - 사용자 정보 수정

### 2. 여행 계획 API
- POST /travel-plans - 여행 계획 생성
- GET /travel-plans - 여행 계획 목록 조회
- GET /travel-plans/:id - 여행 계획 상세 조회
- PUT /travel-plans/:id - 여행 계획 수정
- DELETE /travel-plans/:id - 여행 계획 삭제

### 3. 장소 API
- GET /places/search - 장소 검색
- GET /places/:id - 장소 상세 정보

### 4. 경로 최적화 API
- POST /routes/optimize - 최적 경로 계산

### 5. 알림 API
- PUT /notifications/settings - 알림 설정
- GET /notifications - 알림 목록 조회

### 6. 날씨 API
- GET /weather - 여행지 날씨 조회 

## 문서
NestJS 관련 상세 문서는 [docs/nestjs](./docs/nestjs) 디렉토리에서 확인할 수 있습니다:
- [아키텍처 및 동작 흐름](./docs/nestjs/architecture.md)
- [어노테이션 가이드](./docs/nestjs/annotations.md)
- [모듈 구조](./docs/nestjs/modules.md)
- [데이터베이스 설정](./docs/nestjs/database.md)
- [보안 설정](./docs/nestjs/security.md)
