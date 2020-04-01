/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-03-19 17:18:25
 * @LastEditors: Hexon
 * @LastEditTime: 2020-04-01 15:47:31
 */
import { IRoute } from './renderRouter';

import GeneralLayout from '@/layouts/GeneralLayout';
import UserLayout from '@/layouts/UserLayout';
import BlankLayout from '@/layouts/BlankLayout';

import Home from '@/pages/home';
import MyInfo from '@/pages/my/info';
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

import Page404 from '@/pages/404';

const routes: IRoute[] = [
  {
    path: '/',
    component: GeneralLayout,
    routes: [
      {
        path: '',
        exact: true,
        redirect: '/home'
      },
      {
        path: 'home',
        name: 'home',
        exact: true,
        component: Home
      },
      {
        path: 'download',
        authority: [],
        routes: [
          {
            path: 'win',
            name: 'downloadWin',
            exact: true,
            component: DownloadWin
          },
          {
            path: 'mac',
            name: 'downloadMac',
            exact: true,
            component: DownloadMac
          },
          {
            path: 'app',
            name: 'downloadApp',
            exact: true,
            component: DownloadApp
          }
        ]
      },
      // {
      //   path: 'course',
      //   routes: [
      //     {
      //       name: 'list',
      //       path: 'courseList',
      //       component: './course/list/'
      //     },
      //     {
      //       name: 'detail',
      //       path: 'courseDetail',
      //       component: './course/detail'
      //     }
      //   ]
      // },
      {
        path: 'auth',
        component: BlankLayout,
        routes: [
          {
            path: 'notice',
            name: 'authNotice',
            icon: 'smile',
            component: Notice
            // authority: 'notice'
          },
          {
            path: 'school-register',
            name: 'schoolRegister',
            icon: 'smile',
            exact: true,
            component: SchoolRegister
            // authority: 'school-register'
          },
          {
            path: 'my',
            component: UserLayout,
            routes: [
              {
                path: 'Info',
                name: 'myInfo',
                icon: 'smile',
                exact: true,
                component: MyInfo
              },
              {
                path: 'collection',
                name: 'myCollection',
                icon: 'smile',
                exact: true,
                component: MyCollection
              },
              {
                path: 'order',
                name: 'myOrder',
                icon: 'smile',
                exact: true,
                component: MyOrder
              },
              {
                path: 'school',
                name: 'mySchool',
                icon: 'smile',
                exact: true,
                component: MySchool
              },
              {
                path: 'servicer',
                name: 'myServicer',
                icon: 'smile',
                exact: true,
                component: MyServicer
              },
              {
                path: 'course',
                name: 'myCourse',
                icon: 'smile',
                exact: true,
                component: MyCourse
              },

              {
                path: '*',
                component: Page404
              }
            ]
          },
          {
            path: '*',
            component: Page404
          }
        ]
      },
      {
        path: '*',
        component: Page404
      }
    ]
  }
];

export default routes;
