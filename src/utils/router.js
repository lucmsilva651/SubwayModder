import { createWebHistory, createRouter } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import HackView from '../views/HackView.vue';
import TexturesView from '../views/TexturesView.vue';
import AboutView from '../views/AboutView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/hacks', component: HackView },
  { path: '/textures', component: TexturesView },
  { path: '/about', component: AboutView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});