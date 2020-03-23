/*
 * @Description:
 * @Author: Hexon
 * @Date: 2020-03-19 17:18:25
 * @LastEditors: Hexon
 * @LastEditTime: 2020-03-20 18:06:29
 */
const routes: Route[] = [
  {
    path: '/',
    component: '../layouts/GeneralLayout',
    routes: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: 'home',
        name: 'home',
        icon: 'smile',
        component: './home'
      },
      {
        path: 'download',
        routes: [
          {
            path: 'win',
            name: 'downloadWin',
            component: './download/win'
          },
          {
            path: 'mac',
            name: 'downloadMac',
            component: './download/mac'
          },
          {
            path: 'app',
            name: 'downloadApp',
            component: './download/app'
          }
        ]
      },
      {
        path: 'course',
        routes: [
          {
            name: 'list',
            path: 'list',
            component: './course/list/'
          },
          {
            name: 'detail',
            path: 'detail',
            component: './course/detail'
          }
        ]
      },
      {
        path: 'auth',
        component: '../layouts/UserLayout',
        routes: [
          {
            path: 'notice',
            name: 'notice',
            icon: 'smile',
            component: './notice',
            authority: 'notice'
          },
          {
            path: 'school-register',
            name: 'school-register',
            icon: 'smile',
            authority: 'school-register'
          },
          {
            path: 'my/collection',
            name: 'my/collection',
            icon: 'smile',
            component: './my/collection'
          },
          {
            path: 'my/order',
            name: 'myOrder',
            icon: 'smile',
            component: './my/order'
          },
          {
            path: 'my/school',
            name: 'mySchool',
            icon: 'smile',
            component: './my/school'
          },
          {
            path: 'my/servicer',
            name: 'myServicer',
            icon: 'smile',
            component: './my/servicer'
          },
          {
            path: 'my/course',
            name: 'myCourse',
            icon: 'smile',
            component: './my/course'
          }
        ]
      }
    ]
  }
];

export default routes;
