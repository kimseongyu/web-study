import { add } from './fn';

test('1 is 1', () => {
    expect(1).toBe(1);
});

test('2 add 3 is 5', () => {
    expect(add(2, 3)).toEqual(5);
});

test('3 add 3 is not 5', () => {
    expect(add(3, 3)).not.toBe(5);
});
