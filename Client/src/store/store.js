import Vue from 'vue'
import Vuex from 'vuex'
import {default as authModule} from './modules/Auth'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    auth: authModule,
  },
  plugins: [
    createPersistedState({
      paths: ['auth.token', 'auth.expirationAt', 'auth.profile'],
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 30 })
    })]
})
