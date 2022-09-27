tsconfig.json

"module": "amd" 란?

`/// <reference path="components/project-list.ts" />` 란
기본 js? 아님 ts문법?

`"outFile": "./dist/bundle.js", `

`namespace`의 의미

# 모듈

하나의 큰 파일을 특정 기준에 맞게 분리하는것 => 재사용을 유용하게

## namespace

- `namespace` 란
  클래스, 인터페이스, 각종 함수등등 그룹화하는 개념

```typescript
// 동일한 파일기준 예시
namespace App {
  enum ProjectStatus {
    Active,
    Finished,
  }

  class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: ProjectStatus
    ) {}
  }
}

// 접근 및 사용법 예시
new App.Project(); // App이라는 namespace로 접근하는것을 확인할수있음
```

## namespace 방식의 모듈화 (첨부된 프로젝트 참고)

es6 버전 이후로는 사용되지 않는방식

- 분리된 파일을 연결할때
  - `/// <reference path="디렉토리 위치" />` 를 연결할 파일 상단에 위치시킴 <b>일종의 import</b>
  - `tsconfig.json` 파일에
    - `"outFile": "./dist/bundle.js", ` 값을 설정해야함
    - `"module": "amd"` 값 설정해야함
- 동일한 namespace 다른 파일에 나누어져 있을때 외부에서 사용될 프로퍼티는 `export`를 붙여주고
  가져와서 사용될때는 이전 예제처럼 namespace 접근자를 통한 접근을 하지않고 접근할수있음

```typescript
// a.ts 파일
namespace App {
  // ~~~~
  export class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: ProjectStatus
    ) {}
  }
}

// b.ts 파일
/// <reference path="/a.ts" />

namespace App {
  // ~~~~
  new Project(); // 바로 접근가능
}
```

## import 방식의 모듈화

webpack 같은 서드파티 번들링 도구가 없을시에는 꼭 확장자를 붙여줘야함

`typescript`가 아닌 `javascript`로 `import`되어야함

```typescript
// 예시
import { ProjectList } from "./components/project-list.js";
```
