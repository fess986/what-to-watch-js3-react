import { getDuration } from './utils';
//export const getDuration = (runTime: number) : string => `${Math.floor(runTime / 60)}h ${runTime % 60}m`;

describe('Function: getDuration', () => {
  it('should return string "1h 1m"', () => {
    // Тестовый случай
    const testValue = 61;
    expect(getDuration(testValue)).toBe('1h 1m');
    expect(getDuration(testValue)).toEqual('1h 1m');
  });

  it('should return string "0h 30m"', () => {
    // Тестовый случай
    const testValue = 30;
    expect(getDuration(testValue)).toBe('0h 30m');
  });

  test('should return string "0h 0m"', () => {
    // Тестовый случай
    const testValue = -10;
    const testValue2 = 0;

    expect(getDuration(testValue)).toBe('0h 0m');
    expect(getDuration(testValue2)).toBe('0h 0m');
  });

  test('should return string "1h 15m"', () => {
    // Тестовый случай
    const testValue = 75.5;
    expect(getDuration(testValue)).toBe('1h 15m');
  });
});

export {};
