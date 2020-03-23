/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-03-17 15:35:49
 * @LastEditors: Hexon
 * @LastEditTime: 2020-03-20 18:00:55
 */

import { observable, action } from 'mobx';

export interface ILoginStore {
  token: string;
  updateToken: (token: string) => void;
  logout: () => void;
}

class LoginStore implements ILoginStore {
  @observable public token = '';

  public constructor() {
    this.token = '';
  }

  @action public updateToken = (token: string) => {
    this.token = token;
  };
  @action public logout = () => {
    this.token = '';
  };
}

export default LoginStore;
