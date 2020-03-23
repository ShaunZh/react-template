/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-03-17 16:42:03
 * @LastEditors: Hexon
 * @LastEditTime: 2020-03-19 00:02:53
 */

import { observable, flow } from 'mobx';
import userApi from '@/services/user';

export interface ICurrentUser {
  avatar?: string;
  name?: string;
  number?: string;
}

export interface IUserStore {
  currentUser: ICurrentUser;
  fetchCurrentUser: () => void;
}

class UserStore {
  @observable public currentUser: ICurrentUser = {
    name: '',
    avatar: '',
    number: ''
  };

  public fetchCurrentUser = flow(this.fetch);

  // public constructor() {
  //   this.currentUser = {
  //     name: '',
  //     avatar: '',
  //     number: ''
  //   };
  // }

  public *fetch() {
    try {
      const { result } = yield userApi.queryCurrent(); // 用 yield 代替 await
      this.currentUser = { ...result };
    } catch (e) {
      console.error('fetch error: ', e.message);
    }
  }
}

export default UserStore;
