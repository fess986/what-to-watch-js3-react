import {renderHook, act} from '@testing-library/react';
import {useLoginFormView} from './use-login-form-view';

describe('user hook useLoginFormView tests', () => {
  it('test output signature', () => {
    const {result} = renderHook(() => useLoginFormView()); // рендерим пользовательский хук useLoginFormView и помещаем результат его выполнения в специальный объект с полем result, которое и хранит результат выполнения

    const formObject = result.current; // сохраняем объект

    // проверяем сигнатуру полученных данных
    expect(formObject).toBeInstanceOf(Object);

    const {values, setUserNotFound, setErrorAdress, setErrorPass, setNormal} = formObject;

    // проверяем сигнатуру полученных данных
    expect(values).toBeInstanceOf(Object);
    expect(setUserNotFound).toBeInstanceOf(Function);
    expect(setErrorAdress).toBeInstanceOf(Function);
    expect(setErrorPass).toBeInstanceOf(Function);
    expect(setNormal).toBeInstanceOf(Function);

    const {message, inputClassListAdress, inputClassListPass} = values;

    // по умолчанию, объект хранит состояние 'normal', в котором значения таковы:
    expect(message).toBe('');
    expect(inputClassListAdress).toBe('sign-in__field');
    expect(inputClassListPass).toBe('sign-in__field');

  });

  it('test functions', () => {
    const {result} = renderHook(() => useLoginFormView());

    let formObject = result.current;
    const {setUserNotFound} = formObject; // так как мы не переопределяем эту функцию, сохраним как константу
    let {values, setErrorAdress, setErrorPass, setNormal} = formObject;
    let {message, inputClassListAdress, inputClassListPass} = values;

    // проверяем начальное состояние normal:
    expect(message).toBe('');
    expect(inputClassListAdress).toBe('sign-in__field');
    expect(inputClassListPass).toBe('sign-in__field');

    // меняем состояние через функцию setUserNotFound
    act(() => setUserNotFound());

    // переприсваиваем значения
    formObject = result.current;
    ({values, setErrorAdress} = formObject); // обязательно оборачиваем присваивание в скобки () - иначе компилятор будет думать, что выражение в {} -обычный блок кода и выдаст ошибку
    ({message, inputClassListAdress, inputClassListPass} = values);

    // проверяем новое состояние userNotFound:
    expect(message).toBe('We can’t recognize this email and password combination. Please try again.');
    expect(inputClassListAdress).toBe('sign-in__field');
    expect(inputClassListPass).toBe('sign-in__field');

    // выполняем следущую функцию
    act(() => setErrorAdress());

    formObject = result.current;
    ({values, setErrorPass} = formObject); // обязательно оборачиваем присваивание в скобки () - иначе компилятор будет думать, что выражение в {} -обычный блок кода и выдаст ошибку
    ({message, inputClassListAdress, inputClassListPass} = values);

    // проверяем новое состояние userNotFound:
    expect(message).toBe('Please enter a valid email address');
    expect(inputClassListAdress).toBe('sign-in__field sign-in__field--error');
    expect(inputClassListPass).toBe('sign-in__field');

    // выполняем следущую функцию
    act(() => setErrorPass());

    formObject = result.current;
    ({values, setNormal} = formObject); // обязательно оборачиваем присваивание в скобки () - иначе компилятор будет думать, что выражение в {} -обычный блок кода и выдаст ошибку
    ({message, inputClassListAdress, inputClassListPass} = values);

    // проверяем новое состояние userNotFound:
    expect(message).toBe('Please enter a valid password');
    expect(inputClassListAdress).toBe('sign-in__field');
    expect(inputClassListPass).toBe('sign-in__field sign-in__field--error');

    // выполняем следущую функцию
    act(() => setNormal());

    formObject = result.current;
    ({values} = formObject); // обязательно оборачиваем присваивание в скобки () - иначе компилятор будет думать, что выражение в {} -обычный блок кода и выдаст ошибку
    ({message, inputClassListAdress, inputClassListPass} = values);

    // проверяем новое состояние userNotFound:
    expect(message).toBe('');
    expect(inputClassListAdress).toBe('sign-in__field');
    expect(inputClassListPass).toBe('sign-in__field');


  });


});
