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
    }
  ]
})

export default router
