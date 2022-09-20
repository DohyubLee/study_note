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
//////////////////////////////////////////////////////////////////////////
// - 데코레이션 팩토리(일종의 커스텀??)
// 데코레이션 팩토리는 데코레이터 함수가 아니라
// 데코레이터 함수를 반환해주는 함수를 의미
function Logger1(logString: string) {
  // 아래 리턴 되는게 데코레이터 함수
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@Logger1("LOGGING - PERSON") // 인자를 전달할수 있음
class Person1 {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

////////////////////////////////////////////////////////////////////
// 데코레이터 팩토리 응용
// 데코레이터를 이용하여 특정 태그의 id값을 인자로 받아 렌더하기
// 이 예제는 id=app을 가지는 태그가 먼저 작성되어있어야함!!
function WithTemplate(template: string, hookId: string) {
  // 밑에가 데이코레이터 함수
  // return function (_: Function) // constructor가 필요없을시 의미적으로 _로 쓰기도함
  return function (constructor: any) {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

@WithTemplate("<h1>My Person Object</h1>", "app")
class Person2 {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

//////////////////////////////////////////////////
// 여러 데코레이더 추가하기 및 동작 순서
// 팩토리 자체는 순자적으로 Logger1- > WithTemplate
// 팩토리 내의 데코레이션 함수들은 역순으로 WithTemplate -> Logger1
@Logger1("LOGGING")
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person3 {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

///////////////////////////////////////////////
// 속성(Property) 데코레이터, 속성값에 적용되는 데코레이터 함수
// 접근자(Accessor) 데코레이터, set 같은 녀석에 적용되는 데코레이터 함수
// Method 데코레이터 , 함수에 적용되는 데코레이터 함수
// Parameter 데코레이터, 매개변수에 적용되는 데코레이터 함수
// 각각 인수의 설명은 대충함!!!!, 실행해서 찍어봐라

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator!");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log("Method decorator!");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator!");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

// *** 데코레이터는 클래스를 정의할때 실행됨!

// 112 여기서부터 내 뇌가 터져버림!!
