import {useState} from 'react';

const LOGIN_STATUS = {
  normal: 'normal',
  userNotFound : 'noUser',
  errorAdress: 'errorAdress',
  errorPass: 'errorPass',
};

export const useLoginFormView = () => {

  const [loginStatus, setloginStatus] = useState(LOGIN_STATUS.normal);

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

  return {
    values: {
      message,
      inputClassListAdress,
      inputClassListPass,
    },

    setUserNotFound: () => setloginStatus(LOGIN_STATUS.userNotFound),
    setErrorAdress: () => setloginStatus(LOGIN_STATUS.errorAdress),
    setErrorPass: () => setloginStatus(LOGIN_STATUS.errorPass),
    setNormal: () => setloginStatus(LOGIN_STATUS.normal),
  };

};
