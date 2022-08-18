// 인터페이스

// type AddFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}

let add1: AddFn;

add1 = (n1: number, n2: number) => {
  return n1 + n2;
};

interface Named {
  readonly name?: string;
  outputName?: string;
}

// 인터페이스도 상속이 가능
interface Greetable extends Named {
  greet(phrase: string): void;
}
// implements 는 extends 와 다르게 여러개 상속가능 => interface or 추상 클래스중 내부에 추상 메소드만 있을경우
class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + " " + this.name);
    } else {
      console.log("Hi!");
    }
  }
}

let user2: Person; // 클래스가 타입?? , Person 클래스는 Greetable 인터페이스에 기반하기 때문에 가능

let user1: Greetable;

user1 = new Person();
// user1.name = 'Manu';

user1.greet("Hi there - I am");
console.log(user1);
