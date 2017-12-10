<template>
  <div class="single_bottom_rightbar">
            <h2>Recent Post</h2>
            <ul class="small_catg popular_catg wow fadeInDown" v-for="recent in recents">
              <li>
                <div class="media wow fadeInDown"><router-link :to="{ name: 'article', params: { article: recent.slug }}" class="media-left"><img alt="" :src=recent.image width="112" height="112"></router-link>
                  <div class="media-body">
                    <h4 class="media-heading"><router-link :to="{ name: 'article', params: { article: recent.slug }}">{{ recent.title }} </router-link></h4>
                    <p>{{ recent.short_intro | substring(93) }} </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
</template>

<script>
export default {
  data() {
      return {
          recents: [],
    }
  },
  created(){
      this.fetchRecents();
  },
  methods: {
      async fetchRecents() {
          const { data } = await this.$http.get('/articles');
          this.recents = data.data.slice(0,3);
      }
  }
}
</script>

