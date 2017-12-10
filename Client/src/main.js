import Vue from 'vue';
import { Http, Swal } from './plugins';
import store from './store/store';
import Router from './routes';
import Header from './components/Header.vue';
import Navigation from './components/Navigation.vue';
import MyFooter from './components/Footer.vue';
import VuePaginate from 'vue-paginate';
import VeeValidate from 'vee-validate';
import VueLetterAvatar from 'vue-letter-avatar';


require('./boot');

Vue.use(VuePaginate)
Vue.use(VeeValidate);
Vue.use(VueLetterAvatar);
Vue.use(require('vue-moment'));
Vue.use(Http);
Vue.use(Swal);

Vue.component('app-header', Header);
Vue.component('app-nav', Navigation);
Vue.component('app-footer', MyFooter);

Vue.filter('substring', (string, value) => {
  if (string.length < value) {
    return string;
  }
  return `${string.substring(0, value)}...`;
});

new Vue({
  el: '#app',
  router: Router,
  store,
});