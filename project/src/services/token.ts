const LOCAL_STORAGE_TOKEN_KEY = 'token';

type Token = string;

export const saveToken = (token : Token) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
};

export const getToken = () : Token => localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) ?? ''; // так как localStorage может не иметь токена, учитываем это, передавая в ретурн пустую строку

export const removeToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
};
