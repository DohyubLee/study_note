// 클래스 & 인터페이스
class Department {
  // 자바스크립트에서는 public만 지원함
  // public name: string;
  private employees: string[] = []; // private 속성은 정의된 클래스에서만 접근가능, 상속을 받아도 안됨
  protected employees1: string[] = []; // protected 속성은 상속받은 자식은 접근가능, 단 직접X, 함수를 통해서

  // static 정적속성은 인스턴스화 안해도 접근가능, this 키워드로 접근X
  // 정적속성은 인스턴스화는 분리된 개념 내부에 작성해도 다른애
  static fiscalYear = 2020;
  // readonly 읽기만 가능
  constructor(private readonly id: string, public name: string) {
    // 생성자 매개변수 부분에 직접 타입까지 지정해서 위에서 변수선언을 생략할수 있음
    // this.name = n;
  }

  static createEmployee(name: string) {
    // 정적 메소드 또한 인스턴스와 분리된 개념, 인스턴스 안해도 접근가능
    return name;
  }
  describe(this: Department) {
    console.log("Department: " + this.name);
  }

  addEmployee(employee: string) {
    // validation etc
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// 클래스 상속하기
class ITDepartment extends Department {
  admins: string[];
  private lastReport: string;

  get mostRecentReport() {
    // private 변수도 퍼블릭하게 접근가능
    return this.lastReport;
  }
  set mostRecentReport(val: string) {
    // set, get 키워드를 사용하면 함수명이 같아도됨 통일성이 주어짐
    // get 처럼  private 변수도 퍼블릭하게 접근가능
    this.lastReport = val;
  }
  constructor(id: string, admins: string[]) {
    super(id, "IT"); // 부모의 생성자
    this.admins = admins;
  }
  addEmployee1(employee: string) {
    // validation etc
    this.employees1.push(employee); // 부모에 있는 protected 속성은 이렇게 메소드 통해 접근가능
  }
}

const itAccounting = new ITDepartment("d1", ["mmm"]);
itAccounting.describe(); // 상속을 받게되면 기본적으로 부보의 함수, 변수 모두 사용가능
itAccounting.mostRecentReport = "tttt"; // setter는 변수처럼 사용해야함
console.log(itAccounting.mostRecentReport); // get으로 선언된 메소드는 실행시 ()없음 주의

const accounting = new Department("ddd", "Accounting");

accounting.addEmployee("Max");
accounting.addEmployee("Manu");

// accounting.employees[2] = 'Anna';

accounting.describe();
accounting.name = "NEW NAME";
accounting.printEmployeeInformation();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

// accountingCopy.describe();

// 추상 클래스 abstract, 인스턴스화 X 꼭 상속해야함
abstract class Department1 {
  /* 
  ...
  일반 클래스와 나머진 같음
  */

  abstract describe(): void; // 추상 메소드를 이렇게 정의하고 해당 추상클래스를 상속받은 클래스는 이 추상메소드를 오바라이드 해줘야함
}

// 70 싱글톤??
// 하나의 인스턴스만 생성
class Department2 extends Department {
  private lastReport: string;
  private static instance: Department2;

  private constructor(id: string, private reports: string[]) {
    //private 생성자 외부에서 접근X
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (Department2.instance) {
      return this.instance;
    }
    this.instance = new Department2("d2", []);
    return this.instance;
  }
}

// 아래 두개는 같은 인스턴스로 보면된다, new 키워드가 없기때문
const accounting11 = Department2.getInstance();
const accounting22 = Department2.getInstance();
