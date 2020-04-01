import React from 'react';
import path from 'path';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';

export interface IRoute {
  authority?: string[] | string; // 权限列表
  hidden?: boolean; // 是否隐藏菜单展示
  path: string;
  redirect?: string;
  routes?: IRoute[];
  component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  exact?: boolean;
  key?: any;
  title?: string;
  [key: string]: any;
}

interface IOpts {
  routes: IRoute[];
}

interface IGetRouteElementOpts {
  route: IRoute;
  index: number;
  opts: IOpts;
}

const render = ({ route, opts, props }: { route: IRoute; opts: IOpts; props: object }) => {
  const routes = renderRoutes({
    ...opts,
    routes: route.routes || []
  });

  let { component: Component } = route;
  if (Component) {
    const newProps = {
      ...props,
      route
    };
    return (
      // 此处需要判断传入的是函数组件还是字符串，如果是函数组件，则直接使用，如果是字符串，则表示传入的是组件的路径，
      // 需要通过路径引入数组
      // @ts-ignore
      <Component {...newProps}>{routes}</Component>
    );
  } else {
    return routes;
  }
};

const getRouteElement = ({ route, index, opts }: IGetRouteElementOpts) => {
  const routeProps = {
    exact: route.exact,
    key: index,
    path: route.path
  };
  if (route.redirect) {
    return <Redirect from={route.path} to={route.redirect} {...routeProps} />;
  } else {
    return (
      <Route
        {...routeProps}
        render={(props: object) => {
          return render({ route, opts, props });
        }}
      />
    );
  }
};
/**
 * @description: 将相对路由地址转换为绝对路由地址
 * @param {IRoute[]}routes: 路由表
 * @return: 转换后的路由表
 */
export const dealPath = (routes: IRoute[]) => {
  const recurRoute = (prevPath: string, childrenRoutes: IRoute[]) =>
    childrenRoutes.reduce((acc: IRoute[], route: IRoute) => {
      let newPath = route.path;
      if (route.path[0] !== '/') {
        newPath = path.join(prevPath, route.path);
      }
      if (route.routes?.length) {
        route.routes = recurRoute(newPath, route.routes);
      }
      return acc.concat({ ...route, path: newPath });
    }, []);
  const newRoutes = recurRoute('', routes);
  return newRoutes;
};

function renderRoutes(opts: IOpts) {
  return opts.routes ? (
    <Switch>
      {opts.routes.map((route, index) =>
        getRouteElement({
          route,
          index,
          opts
        })
      )}
    </Switch>
  ) : null;
}

export default function renderRouter(opts: IOpts) {
  opts.routes = dealPath(opts.routes);
  console.info('routes: ', opts.routes);
  return renderRoutes(opts);
}
