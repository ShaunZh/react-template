/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-03-19 17:49:33
 * @LastEditors: Hexon
 * @LastEditTime: 2020-03-19 17:54:15
 */
interface MenuDataItem {
  authority?: string[] | string;
  children?: MenuDataItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: React.ReactNode;
  locale?: string;
  name?: string;
  key?: string;
  path?: string;
  [key: string]: any;
  parentKeys?: string[];
}

interface Route extends MenuDataItem {
  routes?: Route[];
}
