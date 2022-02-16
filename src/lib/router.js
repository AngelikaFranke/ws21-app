import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: Home },
    { path: '/pokedex', component: Pokedex },
    { path: '/calculator', component: Calculator },
    { path: '/guesser', component: Guesser },
];

// Here we create our own Vue Router Instance
const router = createRouter({
    history: createWebHistory('configure-admin'),
    routes,
  });

  export default router