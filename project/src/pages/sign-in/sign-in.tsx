// страница регистрации
import React, {useState, ChangeEvent, FormEvent, useRef} from 'react';
import { useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';

import Logo from '../../components/logo/Logo';
import { AppRoute } from '../../const/const';
import { Link } from 'react-router-dom';
import { loginAction } from '../../store/api-actions';

function SignIn(): JSX.Element {

  const LOGIN_STATUS = {
    normal: 'normal',
    userNotFound : 'noUser',
    errorAdress: 'errorAdress',
    errorPass: 'errorPass',
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginStatus, setloginStatus] = useState(LOGIN_STATUS.errorPass);

  const emailAdress = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);

  let message :string;
  let inputClassListAdress: string;
  let inputClassListPass: string;

  switch (loginStatus) {
    case LOGIN_STATUS.normal :
      message = '';
      inputClassListAdress = 'sign-in__field';
      inputClassListPass = 'sign-in__field';
      break;
    case LOGIN_STATUS.userNotFound :
      message = `We can’t recognize this email
      and password combination. Please try again.`;
      inputClassListAdress = 'sign-in__field';
      inputClassListPass = 'sign-in__field';
      break;
    case LOGIN_STATUS.errorAdress :
      message = 'Please enter a valid email address';
      inputClassListAdress = 'sign-in__field sign-in__field--error';
      inputClassListPass = 'sign-in__field';
      break;
    case LOGIN_STATUS.errorPass :
      message = 'Please enter a valid password';
      inputClassListAdress = 'sign-in__field';
      inputClassListPass = 'sign-in__field sign-in__field--error';
      break;
    default :
      message = '';
      inputClassListAdress = 'sign-in__field';
      inputClassListPass = 'sign-in__field';
      break;
  }

  const emailChangeHandler = (event : ChangeEvent<HTMLInputElement>) : void => {
    event.preventDefault();
  };

  const loginSubmit = (event : FormEvent) : void => {
    event.preventDefault();
    setloginStatus(LOGIN_STATUS.userNotFound);

    if (emailAdress.current === null || emailAdress.current.value === '') {
      setloginStatus(LOGIN_STATUS.errorAdress);
      return;
    }

    if (password.current === null || password.current.value === '') {
      setloginStatus(LOGIN_STATUS.errorPass);
      return;
    }

    if (emailAdress.current !== null && password.current !== null) {
      dispatch(loginAction({
        email: emailAdress.current.value,
        password: password.current.value
      }));

      // navigate(AppRoute.Main);  // раньше перенаправляли так, теперь делаем это через middleware
    }

  };

  const emailFocusHandler = () => {
    setloginStatus(LOGIN_STATUS.normal);
  };

  const passwordFocusHandler = () => {
    setloginStatus(LOGIN_STATUS.normal);
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">

        <Logo />

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form className="sign-in__form" onSubmit={loginSubmit}>
          <div className="sign-in__message">
            <p>{message}</p>
            {/* Please enter a valid email address */}
          </div>
          <div className="sign-in__fields">
            <div className={inputClassListAdress}>
              <input
                ref={emailAdress}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                onChange={emailChangeHandler} onFocus={emailFocusHandler}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className={inputClassListPass}>
              <input
                ref={password}
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                onFocus={passwordFocusHandler}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <Link to={AppRoute.Main} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default SignIn;
