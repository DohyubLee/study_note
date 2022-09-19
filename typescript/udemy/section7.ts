// 제네릭(타입스크립트에만 있는 개념, 자바스크립트에는 없음)

// 제네릭 타입이란?  다른 타입을 연결??
// 추가적인 타입정보 => Array타입이 어떤 타입들을 가지고 있는지에 대한 추가정보를 제공
const names: Array<string> = [];
names[0].split(" "); // 빈 배열이지만 string 메소드를 사용가능

// 추가적인 타입정보 => Promise타입이 number 타입을 반환한다는 추가정보를 지정
const promise: Promise<number> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10);
  }, 2000);
});

promise.then((data) => {
  data.toLocaleString(); // 사전에 제네릭으로 number타입을 넣어줬기때문에 자동완성됨
});
/***********************************************************************************************************/
// 제네릭 함수
// 인자의 타입을 미리지정하지 않을때
// 관련용적으로 'T' 를 쓰고 추가적으로 제네릭 타입을 지정할때 'U' 를 쓴다
function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB); // 리턴 타입도 제네릭 타입으로
}

// 밑에 예제는 추론을 통한 제네릭 타입 지정방식
const mergedObj = merge({ name: "fff", hobbies: ["sports"] }, { age: 30 });
mergedObj.age;

// 함수사용시 제넥릭 타입을 지정한 방식
const mergedObj1 = merge<{ name: string; hobbies: string[] }, { age: number }>(
  { name: "fff", hobbies: ["sports"] },
  { age: 30 }
);

// 제네릭 함수에서 제약조건 달기
// 'T extends object' 제네릭 타입이지만 object만 받을수 있게 제약걸기
function merge1<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

// keyof 제약조건
// 제네릭 타입의 인자가 객체와 키값으로 들어올때 키값의 인자가 객체에 들어있다는 정의를 할수있음
// 'U extends keyof T' => 'T' 라는 객체에 'U'라는 키값이라는 의미
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return "Value: " + obj[key];
}

// 첫번째 인자인 객체에 두번째로 전달되는 키값이 없으면 에러발생
extractAndConvert({ name: "gggg" }, "name");

/***********************************************************************************************************/
// 제네릭 클래스
// 클래스에서 제네릭 사용 하는 방법
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItem() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");

const numberStorage = new DataStorage<number>();
numberStorage.addItem(10);

// 제네릭 유틸리티 타입!???
// Partial 타입??

// ?: 옵션널처럼 되는 효과, but 기존 타입선언부를 수정안하고 Partial 을 사용해서 기존꺼는 놔두고 사용이 가능함

// Readonly => 수정불가


