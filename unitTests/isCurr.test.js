import { isCurr } from "../src/secondaryFunctions";

// const from = 123;
// const to = undefined;

// test('Checking received data from the library', () => {
//     let result = isCurr(from, to)
//     expect(result).toBe('No such currency')
// })

describe(
    'Checking received data from the library in function "isCurr"',
    () => {
        const testsFalse = [
            {
                from: 123,
                to: undefined
            },
            {
                from: undefined,
                to: 123,
            },
            {
                from: undefined,
                to: undefined,
            },
        ]

        const testsTrue = [
            {
                from: 123,
                to: 123, 
            },
            {
                from: '123',
                to: '123', 
            },
        ]

        testsFalse.forEach((element) => {
            test(
                'Expect false', () => {
                    const result = isCurr(element.from, element.to)
                    expect(result).toBe('No such currency')
                }
            )
        })

        testsTrue.forEach((element) => {
            test(
                'Expect nothing', () => {
                    const result = isCurr(element.from, element.to)
                    expect(result).toBe(true)
                }
            )
        })
    }
)