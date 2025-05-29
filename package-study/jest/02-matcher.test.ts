import { add, makeUser } from './fn';

// 객체나 배열은 재귀적으로 돌며 값을 확인해줘야 함으로 to Equal 사용
test('test object toBe', () => {
    expect(makeUser('Mike', 30)).toBe({
        name: 'Mike',
        age: 30,
    });
});

test('test object to Equal', () => {
    expect(makeUser('Mike', 30)).toEqual({
        name: 'Mike',
        age: 30,
    });
});

// 엄격한 비교는 toStrictEqual 사용
test('test object to Equal', () => {
    expect(makeUser('Mike', 30)).toStrictEqual({
        name: 'Mike',
        age: 30,
    });
});

// 소수 값 확인할 경우 toBeClose 사용하여 근사치 확인
test('0.1 add 0.2', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
});

test('regex test', () => {
    expect('Hello').toMatch(/H/);
});

test('err test', () => {
    expect(() => {
        throw 'hello';
    }).toThrow();
});

// 등등 다양한 상황에 맞는 함수 사용 가능
