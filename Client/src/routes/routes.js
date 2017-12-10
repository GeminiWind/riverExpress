import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../containers/Auth/Login.vue';
import Register from '../containers/Auth/Register.vue';
import Home from '../containers/Home.vue';
import Article from '../containers/Article.vue';
import Category from '../containers/Category.vue';
import Contact from '../containers/Contact.vue';
import Search from '../containers/Search.vue';
import About from '../containers/About.vue';
import NotFound from '../exceptions/404.vue';
import ServerError from '../exceptions/500.vue';

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      forVisitor: true
    }
  }, {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      forVisitor: true
    }
  },{
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      forVisitor: true
    }
  }, {
    path: '/advanced-search',
    name: 'adv-search',
    component: Search,
    meta: {
      forVisitor: true
    }
  },{
    path: '/article/:article',
    name: 'article',
    component: Article,
    meta: {
      forVisitor: true
    }
  }, {
    path: '/category/:category',
    name: 'category',
    component: Category,
    meta: {
      forVisitor: true
    }
  }, {
    path: '/contact',
    name: 'reset',
    component: Contact,
    meta: {
      forVisitor: true
    }
  }, {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      forVisitor: true
    }
  }, {
    path: '/500',
    name: 'ServerError',
    component: ServerError,
    meta: {
      forVisitor: true
    }
  }, {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      forVisitor: true
    }
  }]
})

// define custom middleware function
router.middlewares = (middlewares) => {
  middlewares.forEach(middleware => {
    middleware(router)
  })
}

export default router
