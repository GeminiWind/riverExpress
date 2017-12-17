<template>
   <header id="header">
        <div class="row">
          <div class="col-lg-12 col-md-12">
            <div class="header_top">
              <div class="header_top_right">
                  <div class="user-info" v-if="user">
                      Welcome {{ user.profile.first_name }}
                      <a href='#' @click="logout">Logout</a>
                  </div>
                  <div class="login-guess" v-else>
                    <router-link :to="{ name: 'login'}">Login</router-link>
                  </div>
                <form @submit.prevent="searchArticle" class="search_form">
                  <input type="text" placeholder="Type article to search" v-model="search">
                  <input type="submit" value="">
                </form>
              </div>
            </div>
            <div class="header_bottom">
              <div class="header_bottom_left">
                <a class="logo" href="index.html">river
                  <strong>Express</strong>
                  <span>Daily Express For You</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
         data(){
            return {
                search: '',
            }
        },
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
        searchArticle() {
          // direct to search
          // this.$router.push({})
        }
    }
</script>
