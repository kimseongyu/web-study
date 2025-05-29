// literal type
const name1 = 'hello';
let name2 = 'world';

type job = 'police' | 'devloper' | 'teacher';

interface User {
    name: string;
    job: job;
    grade: 1 | 2 | 3;
}

const user: User = {
    name: name1,
    job: 'police',
    grade: 1,
};

// Union Type
interface Car {
    name: 'car';
    color: string;
    start(): void;
}

interface Mobile {
    name: 'mobile';
    color: string;
    call(): void;
}

function getGift(gift: Car | Mobile) {
    if (gift.name === 'car') {
        gift.start();
    } else {
        gift.call();
    }
}

// Intersectoin Type
interface Name {
    name: string;
}

interface Toy {
    name: string;
    color: string;
    price: number;
}

const toyCar: Toy & Name = {
    name: 'toy',
    color: 'yellow',
    price: 10000,
};

export default {};
