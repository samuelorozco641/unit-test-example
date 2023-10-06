const { sum } = require('../functions/functions')

test('Suma correcta de números positivos', () => {  
    expect(sum(2, 3)).toBe(5);
})

test('Suma números negativos correctamente', () => {
    expect(sum(-1, -1)).toBe(-2);
  });
  
test('Suma un número positivo y un número negativo correctamente', () => {
    expect(sum(5, -3)).toBe(2);
});