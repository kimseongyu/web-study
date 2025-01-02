// function
function add(num1: number, num2: number): number {
    return num1 + num2;
}

function add2(...nums: number[]) {
    return nums.reduce((result, num) => result + num, 0);
}

function hello(name?: string): string {
    return `Hello, ${name || 'world'}`;
}

function hello2(name = 'world'): string {
    return `Hello, ${name || 'world'}`;
}

// type check
function typeCheck(age?: number): void {
    if (age !== undefined) {
        console.log(`undefined`);
    }
}

// function this
interface User {
    name: string;
}

const Sam: User = { name: 'Sam' };

function showName(this: User) {
    console.log(this.name);
}

const a = showName.bind(Sam);
a();

// function overload
// overload: 같은 함수명 다른 인자
// override: 함수 재정의
function overload(name: number): number;
function overload(name: string): string;
function overload(name: number | string): number | string {
    if (typeof name === 'number') {
        return name;
    } else {
        return name;
    }
}

const o1: number = overload(1);
const o2: string = overload('1');

export default {};
