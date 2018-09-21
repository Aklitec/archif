export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        component: './Dashboard/Users',
      },
      // list
      {
        path: '/student',
        icon: 'user',
        name: 'student',
        routes: [
          {
            path: '/student/list',
            name: 'list',
            component: './Student/TableList',
          },
          {
            path: '/student/add',
            name: 'add',
            component: './Forms/BasicForm',
          },
        ],
      },
      {
        name: 'certificat',
        icon: 'user',
        path: '/certificat',
        component: './Certificat/certificat',
      },
      {
        component: '404',
      },
    ],
  },
];

/*

  / : dashboard

  /user
    /user/list
    /user/{id}
    /user/{id}/edit
    /user/{id}/delete

  /student
    /student/list
    /student/{id}
    /student/{id}/edit

  /certificate
    /certificate/list

 */
