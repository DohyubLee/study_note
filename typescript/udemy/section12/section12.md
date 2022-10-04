# 타사 라이브러리 및 Typescript

`typescript` 환경에서 `javascript`로만 작성된

라이브러리를 사용할경우 에러가 발생

결론적으로 `javascript` 코드가 동작되기는 하지만

`typescript`에서는 에러를 보여줌

그래서 보통 패키지들은 `@types/패키지명` 처럼

추가적인 타입지정 패키지를 같이 배포하고

사용자는 추가 패키지를 설치하여 정상적인 사용을 함

`@types/~`를 열어보면 `~.d.ts` 이런 파일명으로 정의됨

거기가 타입스크립트로 전환하는 코드가 작성되어있음

## 타입 전역 지정(declare)

```typescript
// GLOBAL이라는 변수명의 타입을 전역으로 지정
declare var GLOBAL: any;
```

163, 164 다시듣기
