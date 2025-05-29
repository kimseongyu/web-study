// keyof
interface User {
    id: number;
    name: string;
    age: number;
    gender: 'm' | 'f';
}

type UserKey = keyof User; // 'id' | 'name' | 'age' | 'gender'
const uk: UserKey = 'id';

// Partial<T>: element can undefine
let admin: Partial<User> = {
    id: 1,
    name: 'Bob',
};

// Required<T>: element must define
let studnet: Required<User> = {
    id: 2,
    name: 'Sam',
    age: 17,
    gender: 'm',
};

// Readonly<T>: element cant modify
let customer: Readonly<User> = {
    id: 3,
    name: 'Jain',
    age: 53,
    gender: 'f',
};

// Record<K, T>
type Grade = 1 | 2 | 3 | 4;
type Score = 'A' | 'B' | 'C' | 'D';

const score: Record<Grade, Score> = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
};

function isValid(user: User) {
    const result: Record<keyof User, boolean> = {
        id: user.id > 0,
        name: user.name !== '',
        age: user.age > 0,
        gender: true,
    };
    return result;
}

// Pick<T, K>: can use needed elements
const child: Pick<User, 'id' | 'name'> = {
    id: 4,
    name: 'eric',
};

// Omit<T, K>: can ignore elements
const parent: Omit<User, 'age' | 'gender'> = {
    id: 5,
    name: 'eric',
};

// Exclude<T1, T2>: T1 - T2
type T1 = string | number | boolean;
type T2 = Exclude<T1, number>;

// NonNullable<Type>: exclude null and undefined
type T3 = string | null | undefined | void;
type T4 = NonNullable<T3>;

export default {};
