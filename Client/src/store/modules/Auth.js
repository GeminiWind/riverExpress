import * as types from '../mutation-types'

const state = {
  error: null,
  token: null,
  expirationAt: null,
  isAuthenticating: false,
  profile: null
}

const mutations = {
  [types.LOGIN_REQUEST](state) {
    state.isAuthenticating = true
  },

  [types.LOGIN_FAILURE](state, { error }) {
    state.error = error
    state.isAuthenticating = false
  },

  [types.LOGIN_SUCCESS](state, { token, expiration }) {
    state.token = token
    state.error = null
    state.expirationAt = parseInt(expiration)
    state.isAuthenticating = false
  },

  [types.LOGOUT](state) {
    state.token = null
    state.profile = null
  },

  [types.GET_PROFILE_FAILURE](state, { error }) {
    state.error = error
  },

  [types.GET_PROFILE_SUCCESS](state, profile) {
    state.profile = profile
    state.error = null
  }
}

const actions = {
  async login({ commit, dispatch, state }, cridential) {
    commit(types.LOGIN_REQUEST);
    try {
      const { data } = await window.axios.post('/login', cridential);
      commit(types.LOGIN_SUCCESS, { token: data.data.token, expiration: data.data.expiration });
      window.axios.defaults.headers.common['Authorization'] = data.data.token;
    } catch (error) {
      commit(types.LOGIN_FAILURE, error);
    }
  },
  logout: ({ commit }) => {
    commit(types.LOGOUT)
    delete window.axios.defaults.headers.common['Authorization']
    return Promise.resolve()
  },
  async getProfile({ commit, dispatch, state }) {
    if (!state.profile) {
      try {
        const profile = await window.axios.get('/user');
        commit(types.GET_PROFILE_SUCCESS, profile.data.data)
      } catch (error) {
        commit(types.GET_PROFILE_FAILURE, { error });
        if (error.response.status === 401) {
          return dispatch(types.LOGOUT)
        }
      }
    }
  }
}

const getters = {
  isAuthenticated: (state) => {
    if (state.token && state.expirationAt > Date.now()) {
      return true
    }
    return false
  },
  user: (state) => {
    return state.profile
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
