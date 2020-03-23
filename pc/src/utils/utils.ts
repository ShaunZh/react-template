import { parse } from 'querystring';
// import { pathToRegexp } from 'path-to-regexp';
import pathRegexp from 'path-to-regexp';
// import { Route } from '@/models/connect';

// eslint-disable-next-line
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pathNode = require('path');

export const isUrl = (path: string): boolean => reg.test(path);

const isNode =
  typeof process !== 'undefined' && process.versions !== null && process.versions.node !== null;

export const isBrowser = () =>
  typeof window !== 'undefined' && typeof window.document !== 'undefined' && !isNode;

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
export const getAuthorityFromRouter = <T extends Route>(
  router: T[] = [],
  pathname: string,
  baseUrl = '/'
): T | undefined => {
  let curRoute: Route | null = null;
  // 从路由表中递归获取当前路由信息，并将其放到
  const recur = (r: Route[] = [], pathname: string, baseUrl = '/') => {
    for (let item of r) {
      // 只能匹配一个路由，因此，如果已找到，则退出
      if (curRoute) {
        break;
      }
      const { routes, path = '/' } = item;
      // 当路由表中有嵌套路由时，需要将当前路由的祖先路由path + 当前路由path
      let newPath = pathNode.join(baseUrl, path);
      console.log('newPath: ', newPath);
      // 判断newPath是否等于pathname
      if (newPath && pathRegexp(newPath).exec(pathname)) {
        curRoute = item;
      } else if (routes) {
        // 如果查找到的路由中有子路由，则继续查找
        recur(routes, pathname, newPath);
      } else {
        continue;
      }
    }
  };
  recur(router, pathname, baseUrl);

  console.log('curRoute: ', curRoute);
  if (curRoute) return curRoute;
  return undefined;
};

export const getRouteAuthority = (path: string, routeData: Route[]) => {
  let authorities: string[] | string | undefined;
  routeData.forEach((route) => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      }
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};
