// *** 데코레이터
// class 및 class 내부(property, method 등)을 정의를 수정 및 교체하는 Function
// 런타임 환경에서 실행됨, 인스턴스화 안해도 호출됨

// 데이코레이터 사용하기전 tsconfig.json에서 설정해야하는 것들
// 1. target이 es6
// 2. experimentalDecorators: true

// - class 데코레이터 (class 선언직전에 사용됨)

function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}

@Logger // 밑에 클래스 생성자부분이 로그됨
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person(); // 생성자 실행됨

console.log(pers);

// - 데코레이션 팩토리(일종의 커스텀??)
function Logger1(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@Logger1("LOGGING - PERSON")
class Person1 {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}
