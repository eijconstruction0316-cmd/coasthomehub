# CoastHomeHub 저장소 전체 점검 보고서

점검일: 2026-06-22  
저장소: `eijconstruction0316-cmd/coasthomehub`  
점검 커밋: `4c909f6ba7947532c073eb8343eda4369eda56d6` (`main`)  
로컬 경로: `/Users/yubbi/coasthomehub`

## 1. 종합 의견

이 저장소는 Next.js App Router 기반의 QLD 홈 리노베이션/트레이디 매칭 서비스 사이트입니다. 홈, 서비스, 갤러리, AI 디자이너, 견적 요청, 트레이디 등록, 블로그, 약관/개인정보, 사이트맵, robots 구성이 모두 들어 있고 현재 빌드는 성공합니다.

다만 현재 상태는 "마케팅/프로토타입 사이트"로는 실행 가능하지만, 실제 유료 트레이디 가입과 리드 매칭 플랫폼으로 운영하기에는 보안, 결제, 운영, 법적 표현 측면에서 보완이 필요합니다.

가장 중요한 문제는 다음 5가지입니다.

1. 공개 API가 스팸, 비용 남용, 위조 요청에 취약합니다.
2. 이메일 HTML에 사용자/AI 입력값이 그대로 들어갑니다.
3. Stripe 가격 ID가 없으면 결제 없이 성공 페이지로 넘어갈 수 있습니다.
4. 사이트 문구가 현재 코드에 구현되지 않은 기능을 이미 제공하는 것처럼 보입니다.
5. CI, 테스트, 환경변수 문서, 프로젝트 README가 부족합니다.

## 2. 점검 범위

- GitHub 저장소 메타데이터 및 기본 브랜치 확인
- 로컬 체크아웃 `/Users/yubbi/coasthomehub` 기준 코드 확인
- 주요 파일 확인:
  - `package.json`
  - `next.config.ts`
  - `README.md`
  - `src/app/**`
  - `src/components/**`
  - API 라우트 전체
  - sitemap/robots/legal pages
- 실행 점검:
  - `npm run lint`
  - `./node_modules/.bin/tsc --noEmit --pretty false`
  - `npm run build`
  - `npm audit --audit-level=moderate`

## 3. 실행 결과

| 항목 | 결과 | 비고 |
| --- | --- | --- |
| `npm run build` | 통과 | Next 빌드는 성공했습니다. 단, TypeScript 검증은 빌드에서 스킵됩니다. |
| `tsc --noEmit` | 통과 | 별도 TypeScript 체크는 현재 오류가 없습니다. |
| `npm run lint` | 경고 4개 | unused variable/import 경고만 있습니다. |
| `npm audit --audit-level=moderate` | 실패 | Next 내부 PostCSS 의존성 관련 moderate 취약점 2개가 보고됩니다. |
| 테스트 | 없음 | `test` script, 테스트 파일, GitHub Actions workflow가 없습니다. |
| 환경변수 문서 | 부족 | `.env.local`에는 `GOOGLE_GENERATIVE_AI_API_KEY`만 있고, Resend/Stripe/App URL 설정 문서가 없습니다. |

주의: `npm audit fix --force`는 Next를 9.x로 낮추는 잘못된 방향의 수정안을 제안하므로 그대로 실행하면 안 됩니다.

## 4. 중요 이슈

### 4.1 이메일 HTML Injection 및 서버 검증 부족

관련 파일:

- `src/app/api/send-quote/route.ts:8-61`
- `src/app/api/send-report/route.ts:22-164`
- `src/app/api/send-report/route.ts:174-207`
- `src/app/api/webhooks/stripe/route.ts:37-104`

문제:

`name`, `email`, `phone`, `description`, `jobType`, `location`, `customer`, `report`, `conversation` 같은 값이 HTML 이메일 문자열에 그대로 들어갑니다. 브라우저 폼에는 일부 제한이 있지만 API는 누구나 직접 호출할 수 있습니다.

영향:

- 관리자 이메일에 악성 링크/HTML 삽입 가능
- 고객 확인 이메일 내용 변조 가능
- 피싱성 이메일 발송 악용 가능
- 잘못된 리드 정보가 운영자에게 전달될 수 있음

권장 조치:

- 모든 API body에 `zod` 같은 schema validation 추가
- 이메일에 들어가는 모든 값 HTML escape 처리
- 이메일/전화번호/ABN/QBCC licence number 서버 검증
- description, messages, report field 길이 제한
- 허용되지 않은 enum 값 거부

### 4.2 공개 API가 비용 남용과 스팸에 취약

관련 파일:

- `src/app/api/design-chat/route.ts:34-105`
- `src/app/api/generate-report/route.ts:26-74`
- `src/app/api/send-quote/route.ts:6-128`
- `src/app/api/send-report/route.ts:174-219`
- `src/app/api/create-checkout-session/route.ts:23-112`

문제:

AI 생성, 리포트 생성, 이메일 발송, Stripe checkout/session 생성 API가 rate limit, CAPTCHA, origin check, request size limit 없이 열려 있습니다.

영향:

- Gemini API 비용 증가
- Resend 이메일 스팸 발송
- Stripe customer/session 대량 생성
- 사이트 평판 및 이메일 도메인 신뢰도 하락

권장 조치:

- IP/email 기준 rate limiting
- Turnstile 또는 reCAPTCHA 추가
- request body size 제한
- Origin/Referer 체크 추가
- AI/메일/결제 API에 별도 abuse monitoring 추가

### 4.3 Stripe 결제 우회 가능성

관련 파일:

- `src/app/api/create-checkout-session/route.ts:43-50`

문제:

Stripe price ID가 없거나 유효하지 않으면 실제 결제를 만들지 않고 성공 페이지 URL을 반환합니다. 개발 중 mock flow로는 편하지만, 운영 환경에서 설정이 빠지면 유료 등록이 결제 없이 성공한 것처럼 보입니다.

권장 조치:

- production에서는 mock checkout 금지
- `NODE_ENV !== "production"` 및 `ALLOW_MOCK_CHECKOUT=true`일 때만 mock 허용
- production에서 `STRIPE_SECRET_KEY`, `STRIPE_PRICE_FOUNDING`, `NEXT_PUBLIC_APP_URL`이 없으면 `503` 반환
- checkout 생성 전 registration body 서버 검증

### 4.4 `/api/send-report`가 클라이언트가 보낸 AI report를 그대로 신뢰

관련 파일:

- `src/components/DesignChat.tsx:123-145`
- `src/app/api/send-report/route.ts:174-207`

문제:

현재 흐름은 클라이언트가 `/api/generate-report`로 report를 받고, 다시 `/api/send-report`로 report를 보냅니다. 즉 누구나 `/api/send-report`를 직접 호출해서 임의 report로 고객/관리자 이메일을 보낼 수 있습니다.

권장 조치:

- report 생성과 이메일 발송을 하나의 서버 API로 합치기
- 또는 서버에서 생성 report에 짧은 수명의 서명 토큰을 붙이고 `/api/send-report`에서 검증
- 그래도 모든 report field는 검증/escape 처리

### 4.5 이미지 업로드와 AI 대화 payload 제한 없음

관련 파일:

- `src/components/DesignChat.tsx:31-40`
- `src/app/api/design-chat/route.ts:62-68`
- `src/app/api/generate-report/route.ts:41-56`

문제:

브라우저에서 선택한 이미지를 그대로 base64로 변환하고, 서버는 MIME type/크기/대화 길이를 검증하지 않고 Gemini로 전달합니다.

영향:

- 큰 이미지로 request body 증가
- AI API 비용 증가
- 느린 응답 또는 서버 오류
- 지원하지 않는 파일 형식 전달 가능

권장 조치:

- JPEG/PNG/WebP만 허용
- 파일 크기 및 base64 크기 제한
- 업로드 전 client-side resize/compress
- 메시지 개수/길이 제한
- AI API 전용 rate limit

## 5. 중간 우선순위 이슈

### 5.1 `next build`가 TypeScript 오류를 무시하도록 설정됨

관련 파일:

- `next.config.ts:3-6`

문제:

`typescript.ignoreBuildErrors: true`가 설정되어 있습니다. 현재 `tsc --noEmit`은 통과하지만, 앞으로 타입 오류가 생겨도 `next build`만으로는 배포가 막히지 않습니다.

권장 조치:

- `ignoreBuildErrors` 제거
- CI에서 `tsc --noEmit` 필수 실행

### 5.2 사이트 문구가 현재 구현보다 앞서 있음

관련 파일:

- `src/app/page.tsx:49-63`
- `src/app/page.tsx:324-352`
- `src/app/page.tsx:392-423`
- `src/app/page.tsx:426-455`
- `src/app/tradies/page.tsx:10-16`
- `src/app/tradies/page.tsx:19-43`

현재 문구는 다음 기능/운영을 이미 제공하는 것처럼 보입니다.

- 모든 tradie의 QBCC licence checked & active
- public liability 및 workers comp 확인
- verified two-sided reviews
- 나쁜 리뷰도 게시
- Stripe milestone/escrow성 payment
- SMS/email instant notification
- AI-scoped, photographed, paid, serious homeowners
- 실제 고객 testimonials

하지만 현재 코드에는 다음이 없습니다.

- DB
- tradie profile 저장소
- licence verification integration
- insurance verification
- review system
- SMS provider
- escrow/milestone payment logic
- lead routing/matching engine

권장 조치:

- 실제 운영에서 수동으로 처리 중이면 그 절차를 문서화
- 코드에 없는 기능은 문구를 완화
- testimonials가 실제가 아니면 삭제하거나 예시로 명확히 표시
- 결제/보증/라이선스 관련 문구는 법률 검토 권장

### 5.3 Tradie registration success page가 예전 요금제를 보여줌

관련 파일:

- `src/app/tradies/register/page.tsx:45-47`
- `src/app/api/create-checkout-session/route.ts:16-20`
- `src/app/tradies/register/success/page.tsx:3-16`
- `src/app/tradies/register/success/page.tsx:77-82`

문제:

등록 폼은 `founding` `$149/month`만 판매합니다. 하지만 성공 페이지는 `starter`, `pro`, `premium`만 알고 있고 `founding`이 없어서 fallback으로 `Pro` `$179/month`와 50% launch discount를 보여줍니다.

권장 조치:

- success page에 `founding` plan 추가
- 사용하지 않는 starter/pro/premium 제거 또는 legacy로 분리
- plan config를 한 파일에서 공유

### 5.4 환경변수 설정이 불완전하고 fallback이 문제를 숨김

관련 파일:

- `src/app/api/send-quote/route.ts:4`
- `src/app/api/send-report/route.ts:4`
- `src/app/api/create-checkout-session/route.ts:4-13`
- `src/app/api/webhooks/stripe/route.ts:5-21`
- `.env.local`

필요한 환경변수:

- `GOOGLE_GENERATIVE_AI_API_KEY`
- `GEMINI_MODEL`
- `RESEND_API_KEY`
- `FROM_EMAIL`
- `CONTACT_EMAIL`
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_FOUNDING`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_APP_URL`

문제:

코드는 `re_placeholder`, `sk_test_placeholder`, `http://localhost:3031` 같은 fallback을 사용합니다. 운영에서 설정이 빠져도 조용히 잘못된 동작을 할 수 있습니다.

권장 조치:

- `.env.example` 추가
- production env validation 추가
- 필수 env 누락 시 앱 시작 또는 API 호출에서 명확히 실패

### 5.5 응답/매칭 시간 약속이 일관되지 않음

관련 파일:

- `src/app/quote/page.tsx:94-95`: 7 days
- `src/app/api/send-quote/route.ts:89-90`: 7 days
- `src/app/blog/page.tsx:300-304`: 24 hours
- `src/app/tradies/register/success/page.tsx:53-58`: 24 hours
- `src/app/api/webhooks/stripe/route.ts:51-60`: 24/48 hours

문제:

최근 커밋에서 homeowner quote matching은 7일로 수정됐지만, 블로그 CTA와 tradie 가입/이메일 쪽은 아직 24/48시간 약속이 남아 있습니다.

권장 조치:

- SLA/응답 문구를 한 상수나 content 파일로 분리
- public page, email, webhook copy를 한 번에 맞추기

## 6. 유지보수/품질 이슈

### 6.1 테스트와 CI가 없음

문제:

`test` script, 테스트 파일, `.github/workflows`가 없습니다.

권장 추가:

- GitHub Actions:
  - `npm ci`
  - `npm run lint`
  - `tsc --noEmit`
  - `npm run build`
  - 선택적으로 `npm audit --audit-level=high`
- API validation unit test
- Playwright smoke test:
  - `/`
  - `/quote`
  - `/design`
  - `/tradies/register`
  - `/blog/[id]`

### 6.2 README가 기본 Next.js 템플릿

관련 파일:

- `README.md:1-36`

문제:

프로젝트 설명, 환경변수, 배포 절차, API 설명, Stripe/Resend/Gemini 설정이 없습니다.

권장 조치:

- CoastHomeHub 전용 README 작성
- `.env.example` 추가
- Vercel 배포 및 운영 체크리스트 작성

### 6.3 콘텐츠 데이터가 여러 파일에 중복/인라인으로 존재

관련 파일:

- `src/app/blog/page.tsx:10-123`
- `src/app/blog/[id]/page.tsx:5-483`
- `src/app/gallery/page.tsx`

문제:

블로그 목록과 상세 데이터가 별도로 존재합니다. 제목/날짜/카테고리 불일치가 생기기 쉽습니다.

권장 조치:

- `src/content/blog.ts` 또는 MDX 기반으로 통합
- sitemap도 같은 content source에서 생성
- gallery/service area 데이터도 shared module로 분리

### 6.4 사용하지 않는 dependency와 코드

관련 파일:

- `package.json:15-18`
- `src/app/blog/[id]/page.tsx:485`
- `src/app/tradies/register/page.tsx:2`
- `src/app/tradies/register/page.tsx:53-54`

문제:

`@anthropic-ai/sdk`, `@google/generative-ai`, `@stripe/stripe-js`는 `src`에서 import되지 않습니다. lint에서도 unused 코드가 4개 보고됐습니다.

권장 조치:

- 사용하지 않는 dependency 제거 후 lockfile 재생성
- unused state/import 제거

### 6.5 SEO/성능 개선 여지

관련 파일:

- `src/app/layout.tsx:17-31`
- `src/app/globals.css:1`
- `src/app/sitemap.ts:8-25`

문제:

- Twitter card는 `summary_large_image`인데 OG/Twitter image가 없습니다.
- Google Font를 CSS `@import`로 불러옵니다.
- sitemap의 `lastModified`가 항상 `new Date()`라 모든 페이지가 매번 최신처럼 보입니다.

권장 조치:

- 실제 OG image 추가
- `next/font/google` 또는 self-host font 사용
- 콘텐츠별 stable `lastModified` 사용

### 6.6 블로그 카테고리 버튼이 필터링하지 않음

관련 파일:

- `src/app/blog/page.tsx:123-170`

문제:

카테고리 버튼이 클릭 가능한 UI처럼 보이지만 실제 필터 기능은 없습니다.

권장 조치:

- client-side filter 구현
- 또는 버튼이 아니라 라벨/태그 형태로 변경

## 7. 추가하면 좋은 것

### 운영/관리 기능

- lead 저장용 DB
- tradie profile DB
- licence verification status
- subscription status 저장
- lead matching/admin dashboard
- email/SMS notification log
- Stripe webhook event 저장 및 idempotency 처리

### 보안/신뢰 기능

- CAPTCHA
- rate limiting
- server-side validation
- HTML escaping
- request size limit
- audit logging
- abuse monitoring

### 제품 기능

- 실제 tradie listing/profile page
- review system
- quote status tracking
- homeowner email verification
- tradie onboarding checklist
- admin approval workflow

### 문서

- README
- `.env.example`
- deployment checklist
- incident/runbook
- legal copy review checklist

## 8. 추천 작업 순서

### 1단계: 운영 안전성

1. API validation, HTML escaping, length/body size limit 추가
2. rate limit 및 CAPTCHA 추가
3. production mock checkout 차단
4. AI report send flow 서버 측 통합 또는 서명 토큰 적용
5. `.env.example` 및 production env validation 추가

### 2단계: 비즈니스 문구 정리

1. 가격/요금제/성공 페이지 문구 통일
2. 7일/24시간/48시간 약속 정리
3. 구현되지 않은 verified review, insured tradies, escrow, SMS 문구 수정
4. testimonials 실제 여부 확인

### 3단계: 엔지니어링 품질

1. `ignoreBuildErrors` 제거
2. GitHub Actions CI 추가
3. README 교체
4. unused dependency/code 제거
5. 콘텐츠 데이터 공통화

### 4단계: 플랫폼 기능 완성

1. DB 및 lead/tradie/subscription 모델 추가
2. Stripe webhook persistence/idempotency
3. 관리자 승인/매칭 화면
4. SMS/email notification 시스템
5. 실제 job 기반 verified review 시스템

## 9. 최종 판단

현재 저장소는 빌드 가능한 Next.js 사이트이며 마케팅 페이지 완성도는 괜찮습니다. 하지만 실제 결제와 리드 매칭을 받는 운영 서비스로 보기에는 아직 API 보안, 결제 실패 처리, 문구 신뢰성, 환경변수 관리, 테스트/CI가 부족합니다.

가장 먼저 해야 할 일은 디자인 개선이 아니라 API hardening, 결제 mock 차단, 이메일 HTML escape, 운영 문구 정리입니다. 이 네 가지를 먼저 처리해야 실제 트래픽과 유료 가입을 받아도 안전합니다.
