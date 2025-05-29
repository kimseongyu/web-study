import { add, getAge, getName, makeUser } from './fn';

let num = 0;

// beforeEach, AfterEach: 각 test마다 전후로 함수 실행
beforeEach(() => {
    num = 0;
    console.log('before each');
});

afterEach(() => {
    console.log('after each');
});

// beforeAll, AfterAll: test 전후로 함수 실행
beforeAll(async () => {
    // connectDb()
    console.log('before all');
});

afterAll(async () => {
    // disconnectDb()
    console.log('after all');
});

test('1 is 1', () => {
    num = add(num, 1);
    expect(num).toBe(1);
});

test('1 is 1', () => {
    num = add(num, 2);
    expect(num).toBe(2);
});

// skip
test.skip('test skip', () => {
    num = add(num, 2);
    expect(num).toBe(2);
});
