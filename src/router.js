import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/present' },
  { path: '/:tense', component: () => import('./components/Tense') },
  { path: '*', redirect: '/present' },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
