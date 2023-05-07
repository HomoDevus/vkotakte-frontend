import { useState } from 'react';
import { getCookie as getItem, setCookie as setItem } from '../utils';

const useCookie = (key: string, defaultValue: any) => {
  const getCookie = () => getItem(key) || defaultValue;
  const [cookie, setCookie] = useState(getCookie());

  const updateCookie = (value: string, numberOfDays: number) => {
    setCookie(value);
    setItem(key, value, numberOfDays);
  };

  return [cookie, updateCookie];
};

export default useCookie;
