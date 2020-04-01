/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-03-31 15:25:43
 * @LastEditors: Hexon
 * @LastEditTime: 2020-04-01 15:39:56
 */
import React from 'react';
import { Router, MemoryRouter, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import renderRouter from './renderRouter';

const routes = renderRouter({
  routes: [
    {
      path: '/',
      component: (props: any) => (
        <>
          <h1 data-testid="layout">Layout</h1>
          {props.children}
        </>
      ),
      routes: [
        {
          path: '',
          exact: true,
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'home',
          icon: 'smile',
          exact: true,
          // component: './page-home.tsx'
          component: () => <h1 data-testid="test">Home</h1>
        },
        {
          path: '/download',
          routes: [
            {
              path: 'win',
              name: 'downloadWin',
              exact: true,
              component: () => <h1 data-testid="test">download win</h1>
            },

            {
              path: 'mac',
              name: 'downloadMac',
              exact: true,
              component: () => <h1 data-testid="test">download mac</h1>
            }
          ]
        },
        {
          path: '/auth',
          component: (props: any) => (
            <>
              <h1 data-testid="test">Auth Layout</h1>
              {props.children}
            </>
          ),
          routes: [
            {
              path: 'notice',
              name: 'notice',
              exact: true,
              icon: 'smile',
              component: () => <h1 data-testid="test">auth notice</h1>,
              authority: 'notice'
            },
            {
              path: 'school-register',
              name: 'school-register',
              icon: 'smile',
              exact: true,
              component: () => <h1 data-testid="test">auth school register</h1>,
              authority: 'school-register'
            }
          ]
        },
        {
          path: '*',
          component: () => <div>404 page</div>
        }
      ]
    }
  ]
});

test('home redirect', () => {
  const history = createMemoryHistory();
  history.push('/');
  // const { container } = render(routesConstant(history));
  const { container } = render(<Router history={history}>{routes}</Router>);
  expect(container.innerHTML).toMatch('Home');
});

test('home', () => {
  const history = createMemoryHistory();
  history.push('/home');
  // const { container } = render(routesConstant(history));
  const { container } = render(<Router history={history}>{routes}</Router>);
  expect(container.innerHTML).toMatch('Home');
});

test('auth layout', () => {
  const history = createMemoryHistory();
  history.push('/auth');
  // const { container } = render(routesConstant(history));
  const { container } = render(<Router history={history}>{routes}</Router>);
  expect(container.innerHTML).toMatch('Auth Layout');
});

test('download win', () => {
  const history = createMemoryHistory();
  history.push('/download/win');
  // const { container } = render(routesConstant(history));
  const { container } = render(<Router history={history}>{routes}</Router>);
  expect(container.innerHTML).toMatch('download win');
});

test('auth', () => {
  const history = createMemoryHistory();
  history.push('/auth/school-register');
  // const { container } = render(routesConstant(history));
  const { container } = render(<Router history={history}>{routes}</Router>);
  expect(container.innerHTML).toMatch('auth school register');
});

test('404', () => {
  const history = createMemoryHistory();
  history.push('/aaaa');
  // const { container } = render(routesConstant(history));
  const { container } = render(<Router history={history}>{routes}</Router>);
  expect(container.innerHTML).toMatch('404 page');
});
