// original types
let car: string = 'bmw';
car = 'kia';
let age: number = 30;
let isAdult: boolean = true;

// array
let nArr: number[] = [1, 2, 3];
let nArr2: Array<number> = [4, 5, 6];
nArr.push(3);

let sArr: string[] = ['hello', 'world'];
let sArr2: Array<string> = ['hello', 'world'];

// tuple
let tuple: [string, number];
tuple = ['a', 1];
tuple[0].toLowerCase();

// void
function print(str: string): void {
    console.log(str);
}

// never
function showError(): never {
    throw new Error();
}

function infLoop(): never {
    while (true) {}
}

// enum
enum os {
    window = 2,
    ios,
    android,
}
console.log(os[3]);
let myos: os = os.window;

// null, undefined;
let a: null = null;
let b: undefined = undefined;

export default {};
