import React from 'react';
import LoginStore from '../models/login';
import UserStore from '../models/user';
import UiStore from '../models/ui';

export const storesContext = React.createContext({
  loginStore: new LoginStore(),
  userStore: new UserStore(),
  uiStore: new UiStore()
});
