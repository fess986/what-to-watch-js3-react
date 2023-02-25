import { getDuration, parseCommentDate, parseMinutes } from './utils';
import {fakerObject} from './mocks';

let globalTestValue : number;

describe('Utils functiions tests', () => {

  describe('Function: getDuration', () => {

    beforeEach(() => { // инициализируется перед каждым запуском
      globalTestValue = 30; // объявляем без CONST
    });

    afterAll(() => { // после каждого
      globalTestValue = 31; // в принципе это бесмысленно, так как перед каждым случаем переопределяем
    });

    it('should return string "1h 1m"', () => { // тут описываем конкретные тесты
    // Тестовый случай
      const testValue = 61;
      expect(getDuration(testValue)).toBe('1h 1m'); // ожидаем чтобы выражение в expect было равно '1h 1m'
      expect(getDuration(testValue)).not.toBe(null); // обратное утверждение
      expect(getDuration(testValue)).toEqual('1h 1m'); // схожа по работе с toBe , но при этом не так строго сравнивает, например 2 одинаковых объекта можно сравнить, и чисто поля будут сравниваться
    });

    it('should return string "0h 30m"', () => {
    // Тестовый случай
      expect(getDuration(globalTestValue)).toBe('0h 30m');
    });

    test('should return something', ()=> {
      expect(getDuration(fakerObject.number)).toBeDefined();
    });

    test('should return string "0h 0m"', () => { // тут тоже описываем конкретные тесты
    // Тестовый случай
      const testValue = -10;
      globalTestValue = 0;

      expect(getDuration(testValue)).toBe('0h 0m');
      expect(getDuration(globalTestValue)).toBe('0h 0m');
    });

    test('should return string "1h 15m"', () => {
    // Тестовый случай
      const testValue = 75.5;
      expect(getDuration(testValue)).toBe('1h 15m');
    });
  });

  describe('Function: parseCommentDate', () => {

    test('should return something', ()=> {
      expect(parseCommentDate('2019-05-08T14:13:56.569Z')).toBeDefined();
    });

    test('should return May 08, 2019', ()=> {
      expect(parseCommentDate('2019-05-08T14:13:56.569Z')).toBe('May 08, 2019');
    });

    test('should return not Array Prototype', ()=> {
      expect(parseCommentDate('2019-05-08T14:13:56.569Z')).not.toBeInstanceOf(Array);
    });

  });

  describe('Function: parseMinutes', () => {

    beforeEach(() => { // инициализируется перед каждым запуском
      globalTestValue = 30;
    });

    test('should return something', ()=> {
      expect(parseMinutes(fakerObject.number)).toBeDefined();
    });

    test('should return 00:00:30', ()=> {
      expect(parseMinutes(globalTestValue)).toBe('00:00:30');
    });

    test('should return 00:15:01', ()=> {
      expect(parseMinutes(901)).toBe('00:15:01');
    });

    test('should return 01:01:40', ()=> {
      expect(parseMinutes(3700)).toBe('01:01:40');
    });

  });

});
