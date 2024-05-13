import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/MachineStatus',
      name: 'MachineStatus',
      component: () => import('../views/MachineStatus.vue')
    },
    {
      path: '/MachinesManage',
      name: 'MachinesManage',
      component: () => import('../views/MachinesManage.vue')
    },
    {
      path: '/CarbonEmission',
      name: 'CarbonEmission',
      component: () => import('../views/CarbonEmission.vue')
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/Member/Machine',
      name: 'Member',
      component: () => import('../views/Member.vue'),
      children:[
        {
        path: '/Member/Machine',
        name: 'MemberMachine',
        component: ()=> import('../views/MemberMachine.vue')
      },
        {
        path: '/Member/Order',
        name: 'Order',
        component: ()=> import('../views/MemberOrder.vue')
      },
      ]
    }
  ]
})

export default router
