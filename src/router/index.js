import { createRouter, createWebHistory } from 'vue-router'
import PhoneForm from '@/components/PhoneForm'
import MessageList from '@/components/MessageList'
import NotFound from '@/pages/NotFound'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PhoneForm,
    meta: {
      pageTitle: 'Home',
    },
  },
  {
    path: '/phone-form',
    name: 'PhoneForm',
    component: PhoneForm,
    meta: {
      pageTitle: 'PhoneForm',
    },
  },
  {
    path: '/messages',
    name: 'MessageList',
    component: MessageList,
    meta: {
      pageTitle: 'MessageList',
    },
  },
  {
    // path: "*",
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
})

export default router
