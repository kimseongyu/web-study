// Class
// Access Modifier: public, private, protected
class Car {
    // public define: can use always
    color: string;

    // private define: can not use in child class
    private name: string = 'car';
    // #name: string = 'car';

    // protected define: can use only in class
    protected price: number = 10000;

    // static
    static wheels = 4;

    // must define variable
    constructor(color: string) {
        this.color = color;
    }

    // use readonly
    // constructor(readonly color: string) {
    //     this.color = color;
    // }

    start() {
        console.log('start');
        console.log(this.name);
    }
}

class Bmw extends Car {
    constructor(color: string) {
        super(color);
    }
    // not work
    // showName() {
    //     console.log(super.name);
    // }
    showColor() {
        console.log(this.color);
    }
    showPrice() {
        console.log(this.price);
    }
}

const bmw = new Bmw('red');
console.log(bmw.color);
// not work
// console.log(bmw.price);
console.log(Bmw.wheels);

// abstract class
abstract class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    start() {
        console.log("i'm human");
    }
    abstract doSomething(): void;
}

// not work
// const person = new Person('ham');

class Sun extends Person {
    constructor(name: string) {
        super(name);
    }
    doSomething(): void {
        console.log('do!');
    }
}

const sun = new Sun('sun');

export default {};
