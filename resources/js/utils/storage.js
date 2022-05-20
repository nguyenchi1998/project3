// eslint-disable
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../config/constants';

const storage = window.localStorage;

export const set = (key, value) => storage.setItem(key, value);

export const get = (key) => storage.getItem(key);

export const remove = (key) => storage.removeItem(key);

export const clear = () => storage.clear();

export const setAccessToken = (access) => {
  set(ACCESS_TOKEN, access);
};

export const setAuthToken = ({access_token, refresh_token}) => {
  set(ACCESS_TOKEN, access_token);
  set(REFRESH_TOKEN, refresh_token);
};

export const getAccessToken = () => get(ACCESS_TOKEN);

export const getRefreshToken = () => get(REFRESH_TOKEN);

export const removeAccessToken = () => {
  remove(ACCESS_TOKEN);
};

export const removeAuthToken = () => {
  remove(ACCESS_TOKEN);
  remove(REFRESH_TOKEN);
};

export const setLang = (lang) => storage.setItem('i18nextLng', lang);

export const getLang = () => storage.getItem('i18nextLng');
