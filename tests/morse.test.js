import morse from '../src/morse'

test('test encode word "ABC"', () => {
    expect(morse.encode("ABC")).toBe(".- -... -.-.");
});

test('test encode word "ABC"', () => {
    expect(morse.encode("ABC ABC")).toBe(".- -... -.-.   .- -... -.-.");
    expect(morse.encode("A time A")).toBe(".-   - .. -- .   .-");
});