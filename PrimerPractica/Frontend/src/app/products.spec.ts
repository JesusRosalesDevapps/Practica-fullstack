import { Products } from './products';

describe('Products', () => {
  it('should create an instance', () => {
    expect(new Products(1, 'Test Product', 'Electronica', 100, 10, true)).toBeTruthy();
  });
});