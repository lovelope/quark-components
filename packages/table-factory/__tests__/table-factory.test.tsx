// @ts-ignore ts2691
import TableFactory from '../src/table-factory.tsx';

describe('table-factory', () => {
  it('should be defined', () => {
    expect(TableFactory).toBeDefined();
  });

  it('should be a function', () => {
    expect(typeof TableFactory === 'function').toBeTruthy();
  });
});
