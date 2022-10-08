# typescript와 webpack

## webpacke

기능중으로는 코드를 번들링(묶음)해서 http요청을 줄인다,

코드의 사이즈를 줄인다, 빌드 단계를 줄이고 개발서버 제공 등등

### - 기본 사용방법

### `webpack.config.js` 을 생성하고 설절값들을 지정

`node.js` 로 동작되는 환경

`ts-loader`라이브러리를 설정하면 기본적으로 `tsconfig.json`를

읽어들인다

개발과 프로덕션 모드를 따로 지정하는게 좋음

ex) `"age" in obj` in 키워드는 키가 아니라 값을 밷는다
