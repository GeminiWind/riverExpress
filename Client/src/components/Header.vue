<template>
   <header id="header">
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <div class="header_top">
              <div class="header_top_right">
                  <div class="user-info" v-if="user">
                      <h3>Welcome<strong> {{ user.profile.first_name }}</strong></h3>
                      <a href='#' @click="logout">Logout</a>
                  </div>
                  <div class="login-guess" v-else>
                    <router-link :to="{ name: 'login'}">Login</router-link>
                  </div>
              </div>
            </div>
            <div class="header_bottom">
              <div class="header_bottom_left">
                <router-link :to="{name: 'home'}" class="logo">river
                  <strong>Express</strong>
                  <span>Daily Express For You</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </header>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: mapGetters({
            user: 'auth/user',
        }),
        methods: {
          async logout() {
            await this.$store.dispatch('auth/logout');
            // go back
            window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push('/')
          }
        },
    }
</script>
