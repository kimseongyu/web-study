// Generic: dynamic type define
// function
function getSize<T>(arr: T[]): number {
    return arr.length;
}

const nArr = [1, 2, 3];
getSize<number>(nArr);

const sArr = ['1', '2', '3'];
getSize<string>(sArr);

// interface
interface Mobile<T> {
    name: string;
    price: number;
    option: T;
}

const m1: Mobile<string> = {
    name: 'm1',
    price: 10,
    option: 'option',
};

const m2: Mobile<object> = {
    name: 'm1',
    price: 10,
    option: {
        color: 'red',
        coupon: false,
    },
};

// generic extends

interface User {
    name: string;
    age: number;
}

// not work
// function showName<T>(data: T): string {
//     return data.name;
// }

function showName<T extends { name: string }>(data: T): string {
    return data.name;
}

const user: User = { name: 'sun', age: 1 };
showName(user);

export default {};
