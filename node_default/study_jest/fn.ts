export const add = (num1: number, num2: number): number => num1 + num2;

export const makeUser = (name: string, age: number) => ({
    name,
    age,
    gender: undefined,
});

export const getName = (callback: (...arg: any) => void, name: string) => {
    setTimeout(() => {
        callback(name);
    }, 3000);
};

export const getAge = (age: number) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(age);
        }, 3000);
    });
};
