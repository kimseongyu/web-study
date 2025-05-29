// user type
type score = 'A' | 'B' | 'C' | 'F';

// interface
interface User {
    name: string;
    age: number;
    // optional property
    gender?: string;
    // readonly
    readonly birth: number;
    // indexing type
    [key: number]: score;
}

let user: User = {
    name: 'sum',
    age: 25,
    birth: 2000,
    1: 'A',
};

console.log(user.name);

// function
interface Add {
    (num1: number, num2: number): number;
}

const add: Add = function (x, y) {
    return x + y;
};

const add2: Add = (x, y) => {
    return x + y;
};

add(10, 20);

// implements
interface Car {
    color: string;
    wheels: number;
    start(): void;
}

class Bmw implements Car {
    color;
    wheels = 4;
    constructor(color: string) {
        this.color = color;
    }
    start() {
        console.log('go');
    }
}

interface Benz extends Car {
    door: number;
    stop(): void;
}

interface Toy {
    name: string;
}

interface ToyCar extends Car, Toy {
    price: number;
}

export default {};
