import Vue from 'vue';
import VueTyper from 'vue-typer';
import App from './App';
import router from './router';
import data from './data';

Vue.use(VueTyper);

Vue.config.productionTip = false;

Vue.mixin({
  data() {
    return data;
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App />',
  router,
});
