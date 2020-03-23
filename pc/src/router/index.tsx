import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';

// import routes from './routes'
// import AuthorizedRoute from '@/components/authWrapper/authorizedRoute'

import GeneralLayout from '@/layouts/GeneralLayout';
import SecurityLayout from '@/layouts/SecurityLayout';
import UserLayout from '@/layouts/UserLayout';
import BlankLayout from '@/layouts/BlankLayout';

import Login from '@/pages/user/login';
import Register from '@/pages/user/register';

import Home from '@/pages/home';
import MyCollection from '@/pages/my/collection';
import MyOrder from '@/pages/my/order';
import MySchool from '@/pages/my/school';
import MyServicer from '@/pages/my/servicer';
import MyCourse from '@/pages/my/course';

import SchoolRegister from '@/pages/schoolRegister';
import DownloadApp from '@/pages/download/app';
import DownloadWin from '@/pages/download/win';
import DownloadMac from '@/pages/download/mac';
import Notice from '@/pages/notice';

class RouteConfig extends Component<{}> {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/user/login" component={Login} exact />
          <Route path="/user/register" component={Register} exact />
          <Redirect from="/" to="/home" exact />
          <Route
            path="/"
            render={({ history }) => (
              <GeneralLayout history={history}>
                <Route path="/home" component={Home} />
                <Route path="/download/app" component={DownloadApp} exact />
                <Route path="/download/win" component={DownloadWin} exact />
                <Route path="/download/mac" component={DownloadMac} exact />
                <Route path="/notice" component={Notice} exact />
                <Route
                  path="/auth"
                  render={() => (
                    <BlankLayout>
                      <Route path="/auth/school-register" component={SchoolRegister} exact />
                      <Route
                        path="/auth/my"
                        render={() => (
                          <UserLayout>
                            <Route path="/auth/my/collection" component={MyCollection} exact />
                            <Route path="/auth/my/order" component={MyOrder} exact />
                            <Route path="/auth/my/school" component={MySchool} exact />
                            <Route path="/auth/my/servicer" component={MyServicer} exact />
                            <Route path="/auth/my/course" component={MyCourse} exact />
                          </UserLayout>
                        )}
                      />
                    </BlankLayout>
                  )}
                />
              </GeneralLayout>
            )}
          />
        </Switch>

        {/* <MainLayout>
          <Switch>
            <Redirect from="/" to="/activity-photo" exact />
            {routes.map((rc) => {
              const { path, component, auth = '', redirectPath = '/no-auth', ...rest } = rc
              return (
                <AuthorizedRoute
                  render={() => {
                    return <div>无渲染内容</div>
                  }}
                  key={path}
                  path={path}
                  component={component}
                  auth={auth}
                  redirectPath={redirectPath}
                  {...rest}
                />
              )
            })}
          </Switch>
        </MainLayout> */}
      </BrowserRouter>
    );
  }
}

export default RouteConfig;
