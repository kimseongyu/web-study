import { add, getAge, getName, makeUser } from './fn';

// done
test('done', done => {
    function callback(name: string) {
        expect(name).toBe('Mike');
        done();
    }
    getName(callback, 'Mike');
});

// resolves, rejects
test('resolves, rejects test', () => {
    return expect(getAge(20)).resolves.toBe(20);
});

// async
test('async test', async () => {
    const age = await getAge(20);
    expect(age).toBe(20);
});

test('resolves, rejects test', async () => {
    await expect(getAge(20)).resolves.toBe(20);
});
