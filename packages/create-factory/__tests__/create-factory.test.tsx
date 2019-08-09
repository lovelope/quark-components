// @ts-ignore ts2691
import CreateFactory from '../src/create-factory.tsx';

describe('create-factory', () => {
  it('should be defined', () => {
    expect(CreateFactory).toBeDefined();
  });

  it('should be a function', () => {
    expect(typeof CreateFactory === 'function').toBeTruthy();
  });
});
