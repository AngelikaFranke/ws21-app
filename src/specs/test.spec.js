function adder(x, y) {
    if(typeof x == 'string' || typeof y == 'string') throw new Error('Nah');
    return x + y;
}

test('can add two value', () => {
    expect(adder(1, 2)).toBe(3);
});

test('does add strings', () => {
    expect(() => adder('hello', 1)).toThrow();
});