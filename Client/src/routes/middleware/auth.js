import store from '../../store/store.js'

export function auth (Router) {
  
  Router.beforeEach((to, from, next) => {
    if (store.state.auth.token) {
      window.axios.defaults.headers.common['Authorization'] = store.state.auth.token
    }
    if (to.matched.some(record => record.meta.forVisitor)) {
     next();
    } else if (to.matched.some(record => record.meta.forAuth)) {
      if (!store.getters['auth/isAuthenticated']) {
        next({
          path: '/login'
        })
      } else {
        next()
      }
    } else next()
  })
}
