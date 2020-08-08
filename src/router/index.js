import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        layout: 'StartLayout'
      },
      component: () => import('../views/Home.vue')
    },
    {
      path: '/sign-in',
      name: 'Auth',
      meta: {
        layout: 'AuthLayout'
      },
      component: () => import('../views/Auth.vue')
    },
    {
      path: '/account',
      name: 'Account',
      meta: {
        layout: 'MainLayout',
        auth: true
      },
      component: () => import('../views/Account.vue')
    },
    {
      path: '/register',
      name: 'Registration',
      meta: {
        layout: 'AuthLayout',
        auth: false
      },
      component: () => import('../views/Register.vue')
    },
    {
      path: '/account/activity',
      name: 'Activity',
      meta: {
        layout: 'MainLayout',
        auth: true
      },
      component: () => import('../views/Activity.vue')
    },
    {
      path: '/account/profile',
      name: 'Profile',
      meta: {
        layout: 'MainLayout',
        auth: true
      },
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/add-company',
      name: 'Company',
      meta: {
        layout: 'AuthLayout',
        auth: true
      },
      component: () => import('../views/Company.vue')
    },
    {
      path: '/account/employees',
      name: 'Employees',
      meta: {
        layout: 'MainLayout',
        auth: true
      },
      component: () => import('../views/Employees.vue')
    },
    {
      path: '/account/general',
      name: 'General',
      meta: {
        layout: 'MainLayout',
        auth: true
      },
      component: () => import('../views/General.vue')
    },
    {
      path: '/account/employees/add',
      name: 'AddEmployees',
      meta: {
        layout: 'MainLayout',
        auth: true
      },
      component: () => import('../views/AddEmployee.vue')
    },
    {
      path: '/account/sections/:id',
      name: 'Section',
      meta: {
        layout: 'MainLayout',
        auth: true
      },
      component: () => import('../views/InSection.vue')
    },
    {
      path: '/account/sections/:id/articles/:articleId',
      name: 'Article',
      meta: {
        layout: 'MainLayout',
        auth: true
      },
      component: () => import('../views/InArticle.vue')
    },
    {
      path: '/account/add-section',
      name: 'AddSection',
      meta: {
        layout: 'EditorLayout',
        auth: true
      },
      component: () => import('../views/AddSection.vue')
    },
    {
      path: '/account/add-document',
      name: 'AddArticle',
      meta: {
        layout: 'EditorLayout',
        auth: true
      },
      component: () => import('../views/AddArticle.vue')
    },
    {
      path: '/sign-up/add-company',
      name: 'AddCompanySignUp',
      meta: {
        layout: 'AuthLayout',
        auth: true
      },
      component: () => import('../views/AddEmployeesSignUp.vue')
    },
    {
      path: '/account/works',
      name: 'Works',
      meta: {
        layout: 'MainLayout',
        auth: true
      },
      component: () => import('../views/Works.vue')
    },
    {
      path: '/account/integrations',
      name: 'Integrations',
      meta: {
        layout: 'MainLayout',
        auth: true
      },
      component: () => import('../views/Integrations.vue')
    },
    { path: '*', 
      meta: {
        layout: 'NotFound',
        auth: false
      },
      component: () => import('../layouts/NotFound.vue') 
    }
  ]
})

router.beforeEach((to,from,next)=>{
  const user = localStorage.getItem('token') || ''
  const isAuth = to.matched.some(record => record.meta.auth)
  
  if (user === '' && isAuth){
    next('/sign-in?message=authRequired')
  } else {next()}

  if (user != '' && to.path === '/sign-in' || user != '' && to.path === '/register'){
    next('/account?message=authTrue')
  }
})

export default router
