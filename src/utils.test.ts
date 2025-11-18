import { isValidAmount } from './utils';

describe('isValidNumber', ()=>{
  it('accepts integers', ()=> expect(isValidAmount('123')).toBe(true));
  it('accepts floats', ()=> expect(isValidAmount('12.34')).toBe(true));
  it('rejects bad numbers', ()=> expect(isValidAmount('100.0.0')).toBe(false));
  it('rejects letters', ()=> expect(isValidAmount('abc')).toBe(false));
});
