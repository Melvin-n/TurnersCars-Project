const removePunctuation = require('../formatString')

describe('remove punctutation from a string', () => {
    it('remove !', () => {
        const input = '!hello world'
        const expected = ' hello world'
        const actual = removePunctuation(input)
        
        expect(actual).toBe(expected)
    })

    it('return same, no punctuation', () => {
        const input = 'hello world'
        const expected = 'hello world'
        const actual = removePunctuation(input)
        
        expect(actual).toBe(expected)
    })

    it('remove %', () => {
        const input = 'hello%world'
        const expected = 'hello world'
        const actual = removePunctuation(input)
        
        expect(actual).toBe(expected)
    })

    it('remove multiple punctuations', () => {
        const input = ';hello?world!'
        const expected = ' hello world '
        const actual = removePunctuation(input)
        
        expect(actual).toBe(expected)
    })

    it('remove ;', () => {
        const input = 'hello;world'
        const expected = 'hello world'
        const actual = removePunctuation(input)
        
        expect(actual).toBe(expected)
    })
    it('remove ?', () => {
        const input = 'hello world?'
        const expected = 'hello world '
        const actual = removePunctuation(input)
        
        expect(actual).toBe(expected)
    })
})

//“hello world”, “hello%world”, “!hello world”, “;hello?world!”, “hello;world” and “hello world?”.