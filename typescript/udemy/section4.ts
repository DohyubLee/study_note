// * 모던 자바스크립트
// 1. const, let
const name = "dldldl"; // 얘 왜 에러남?

const userName = "ldh";
let age = 19;

// 2. var 를 사용하면 안되는 이유
if (age < 20) {
  var isOld = true;
}
console.log(isOld);
// 타입스크립트에서 에러가 나지만 자바스크립트에서는 에러안나고
// 블록을 벗어난 영역에서 접근가능
// 그러기 때문에 const or let 을 사용해야함

// 3. arrow function
const printOutput1 = (output: string | number) => console.log(output);
// (output: string | number) -> 자바스크립트처럼 인자가 하나이더라도 () 생략 안됨
// 타입을 작성해야 하기 때문에
// 인자의 타입을 생략하고 싶다면
const printOutput2: (a: string | number) => void = (output) =>
  console.log(output);
// 함수 타입을 지정하면 됨, 지금 괄호는 prettier가 강제로 넣어준거임

// 4. spread 연산자
// 4-1 배열에서 사용시
const hoobies = ["sports", "cooking"];
const activeHobbies1 = ["hiking"];

activeHobbies1.push(hoobies); // 에러남 activeHobbies는 string[] 타입이 아닌 string 타입임!!

// 아래의 결과는 모두 같음 => ["hiking", "sports", "cooking"]
activeHobbies1.push(hoobies[0], hoobies[1]); // 이렇게 짤라서 넣어야함
// or
activeHobbies1.push(...hoobies); // 스프레드 연산자를 이용해서
// or 선언 당시에
const activeHobbies2 = ["hiking", ...hoobies];

// 4-2 객체에서 사용시
const person = {
  name: "glglgl",
  age: 30,
};
const copy = { ...person }; // 복사? 복제?

// 4-3 추가 사용법
// 인자값을 무한이 받을수있음, 실제 push 함수도 이렇게 정의되어있음
const add = (...number: number[]) => {
  return number.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};

const addedNumber = add(5, 10, 2, 3.7);
console.log(addedNumber); // 20.7 출력

// 5. 배열, 객체 비구조화 할당
// 5-1 배열에서 비구조화 할당
const hobbies2 = ["sports", "cooking"];

// 일반적인 배열 할당법
const hobby1 = hobbies2[0];
const hobby2 = hobbies2[1];

// 배열 비구조화 할당방식, 순서에 맞게
const [h1, h2] = hobbies2;
console.log(hobby1); // "sports"
console.log(hobby2); // "cooking"

// 객체 비구조화 할당방식
const person2 = {
  name1: "glglgl",
  age1: 30,
};
// 키값이 같아야함
const { name1, age1 } = person2;

// 키값과 다른 변수명으로 할당하고 싶을때
const { name1: changeName } = person2;
// changeName 라는 변수명으로 할당됨
