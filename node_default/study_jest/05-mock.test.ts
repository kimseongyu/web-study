import { add, getAge, getName, makeUser } from './fn';

// mock: 테스트를 위해 흉내만 내는 함수
const mockfn = jest.fn();

mockfn();
mockfn(1);

// .mock: mock 함수의 정보가 들어있음
test('mock default', () => {
    console.log(mockfn.mock.calls);
    expect(mockfn.mock.calls.length).toBe(2);
});

// mock execute
const mockX = jest.fn(num => num + 1);

mockX(10);
mockX(20);
mockX(30);

test('mock function implement', () => {
    console.log(mockX.mock.results);
    expect(mockX.mock.results[0].value).toBe(11);
});

// mock return
const mockRet = jest.fn();

mockRet.mockReturnValueOnce(10).mockReturnValueOnce(20).mockReturnValueOnce(30).mockReturnValue(40);

mockRet();
mockRet();
mockRet();
mockRet();

test('mock return value', () => {
    console.log(mockRet.mock.results);
    expect(mockRet.mock.results[0].value).toBe(10);
});

// mock async
const mockAsync = jest.fn();

mockAsync.mockResolvedValue({ name: 'Mike' });

test('mock async', () => {
    mockAsync().then((res: { name: string }) => {
        expect(res.name).toBe('Mike');
    });
});

// mock module
// jest.mock(`${module_name}`);

// toBeCalled, toBeCalledTime, ... 다양한 mock 함수 테스트
