import morse from '../src/morse'

test('test encode word "ABC"', () => {
    expect(morse.encode("ABC")).toBe(".- -... -.-.");
});

test('test encode word "ABC"', () => {
    expect(morse.encode("ABC ABC")).toBe(".- -... -.-.   .- -... -.-.");
    expect(morse.encode("A time A")).toBe(".-   - .. -- .   .-");
});


test('decode encoded word "ABC"', () => {
    expect(morse.decode(".- -... -.-.")).toBe("abc");
});

test('discover if text is morse code', () => {
    expect(morse.isMorseCode(".- -... -.-.")).toBe(true);
    expect(morse.isMorseCode("teste")).toBe(false);
});