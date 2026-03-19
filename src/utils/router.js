import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import TexturesView from '../views/TexturesView.vue'
import ContactView from '../views/ContactView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/textures', component: TexturesView },
  { path: '/contact', component: ContactView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})