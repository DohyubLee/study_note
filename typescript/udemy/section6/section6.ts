// 고급 타입

// - type 기본적으로 interface와 비슷하지만 조금더 엄격함

// 기본적인 사용법
// 타입 정의
type Admin = {
  name: string;
  privileges: string[];
};
// interface 방식
interface Admin1 {
  name: string;
  privileges: string[];
}

type Employee = {
  name: string;
  startDate: Date;
};
// interface 방식
interface Employee1 {
  name: string;
  startDate: Date;
}

// 기존 타입들을 병합해서 새로운 타입 정의 (intersection type)
type ElevatedEmployee = Admin & Employee;

// interface 방식, implement아님?????, implement는 클래스에서 사용하는 키워드
// 클래스에서 implement를 사용할때는 interface에서 적용되는개념
interface ElevatedEmployee1 extends Admin1, Employee1 {}

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// intersection type 또 다른 의미
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;
// 기존 두개의 타입을 모두 만족하는 number 타입만 적용가능
const uni: Universal = 8;

// 타입 가드!!!

// typeof 을 이용한 타입 가드 방식
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

// typescript 방식의 타입 가드!!
type UnknownEmployee = Employee | Admin; // 유니온 타입

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: ", emp.name); // name이란 값은 Employee, Admin타입 둘다 공통적으로 갖기때문에 타입가드없이도 사용가능!!!

  // privileges, startDate 타입은 각각 한쪽씩에만 타입이 정의되어 있기때문에 타입가드를 사용해줘야함
  // in 키워드 방식의 타입가드
  if ("privileges" in emp) {
    console.log("Pricileges: " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("Star tDate: " + emp.startDate);
  }
}

// class를 사용할때 instanceof 방식의 타입 가드!!!!!
class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }
  loadCargo(amount: number) {
    console.log("Loading cargo ..." + amount);
  }
}

type Vehicle = Car | Truck; // 클래스로 선언된 유니온 타입

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive(); // drive()는 Vehicle의 공통 요소이때문에 바로 사용 가능

  //loadCargo는 공통 요소가 아니기때문이 타입가드 필요
  if ("loadCargo" in vehicle) {
    vehicle.loadCargo(1000);
  }

  // 위 처럼 in 키워드 방식의 타입가드도 가능하지만 클래스 기반의 타입은 instanceof 방식의 타입가드 사용가능!!!!
  // 꼭 클래스형식의 타입에서만 interface형식에서 사용불가!!!!!, instanceof 생성자 함수를 호출하는
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

///////////////////////////////////////////////////////////////////

// 구별된 유니온(Discriminated Union), 공통 필드를 이용해 유니온 타입의 타입가드를 구현함!!

interface Bird {
  type: "bird"; // 공통 필드
  flyingSpeed: number;
}
interface Horse {
  type: "horse"; // 공통 필드
  runningSpeed: number;
}

type Animal = Bird | Horse; // 유니온 타입

function moveAnimal(animal: Animal) {
  let speed;
  // 공통된 속성을 이용해서 이런 방식으로 타입가드 사용가능
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("speed : " + speed);
}

// 형 변환(type casting), 타입스크립트가 타입을 알려주는 기능???

// 두가지 형변환 방식 (기본적으로 HTMLElement 으로 추정함!!)
const userInputElement = <HTMLInputElement>document.getElementById("user-input");
const userInputElement1 = document.getElementById("user-input") as HTMLInputElement; // 이 방식으로도 형변환 가능

// HTMLInputElement으로 형변환해야 value 타입에러 사라짐 기본적으로 HTMLElement 타입에서 아무것도 타입정의가 안되어있으니깐
userInputElement.value = "hi there!";

// 인덱스 타입, => 타입의 이름과 개수를 유연하게 처리 미리 알 필요없을때
interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  1: "ddd", // 숫자라도 string으로 변환됨!!
  email: "Not a valid email",
  username: "Must start with a capital character",
};
///////////////////////////////////////////////////////////////////////////

// 함수 오버로드, 같은 함수명으로 함수 타입 정의???
function add1(a: string, b: string): string;
function add1(a: number, b: number): number;

function add1(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add1("ddd", " fgggg");
// 기존 함수 하나만 정의했을때 split 사용시 에러가 나지만 미리 함수타입을 정의하면 알아서 오버로드됨!!!!!!!!
result.split(" ");
