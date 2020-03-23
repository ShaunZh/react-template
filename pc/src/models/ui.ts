/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-03-18 00:35:05
 * @LastEditors: Hexon
 * @LastEditTime: 2020-03-20 15:15:36
 */
import { observable, action } from 'mobx';

export interface IUiStore {
  isMobile: boolean;
  updateIsMobile: (state: boolean) => void;
}

class UiStore implements IUiStore {
  @observable public isMobile = false;

  @action public updateIsMobile = (state: boolean) => {
    console.log('update is mobile: ', state);
    this.isMobile = state;
  };
}

export default UiStore;
