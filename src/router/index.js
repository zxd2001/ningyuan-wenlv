import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/destinations',
    name: 'Destinations',
    component: () => import('@/views/DestinationsView.vue'),
    meta: { title: '目的地' }
  },
  {
    path: '/culture',
    name: 'Culture',
    component: () => import('@/views/CultureView.vue'),
    meta: { title: '文化体验' }
  },
  {
    path: '/planning',
    name: 'Planning',
    component: () => import('@/views/PlanningView.vue'),
    meta: { title: '行程规划' }
  },
  {
    path: '/food-lodging',
    name: 'FoodLodging',
    component: () => import('@/views/FoodLodgingView.vue'),
    meta: { title: '美食住宿' }
  },
  {
    path: '/transportation',
    name: 'Transportation',
    component: () => import('@/views/TransportationView.vue'),
    meta: { title: '交通指南' }
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import('@/views/EventsView.vue'),
    meta: { title: '活动日历' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: '走进宁远' }
  },
  {
    path: '/government',
    name: 'Government',
    component: () => import('@/views/GovernmentView.vue'),
    meta: { title: '政务公开' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | 宁远县文化旅游网` : '宁远县文化旅游网'
})

export default router
