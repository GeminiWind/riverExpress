<template>
   <div class="single_bottom_rightbar">
            <ul role="tablist" class="nav nav-tabs custom-tabs">
              <li class="active" role="presentation"><a data-toggle="tab" role="tab" aria-controls="home" href="#mostPopular">Most Popular</a></li>
              <li role="presentation"><a data-toggle="tab" role="tab" aria-controls="messages" href="#recentComent">Recent Comment</a></li>
            </ul>
            <div class="tab-content">
              <div id="mostPopular" class="tab-pane fade in active" role="tabpanel">
                <ul class="small_catg popular_catg wow fadeInDown">
                  <li v-for="popular in populars" :key="popular.slug">
                    <div class="media wow fadeInDown">
                      <router-link :to="{ name: 'article', params: { article: popular.slug }}" class="media-left"><img :src="popular.image" alt="" width="112" height="112">
                      </router-link>
                      <div class="media-body">
                        <h4 class="media-heading">
                          <router-link :to="{ name: 'article', params: { article: popular.slug }}">{{ popular.title }} </router-link>
                        </h4>
                        <p> {{ popular.short_intro | substring(93) }} </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div id="recentComent" class="tab-pane fade" role="tabpanel">
                <ul class="small_catg popular_catg">
                  <li v-for="recentComment in recentComments" :key="recentComment.slug">
                    <div class="media wow fadeInDown">
                      <router-link :to="{ name: 'article', params: { article: recentComment.slug }}" class="media-left"><img :src="recentComment.image" width="112" height="112" alt=""></router-link>
                      <div class="media-body">
                        <h4 class="media-heading">
                          <router-link :to="{ name: 'article', params: { article: recentComment.slug }}">{{ recentComment.title }} </router-link>
                        </h4>
                        <p v-html="recentComment.short_intro">{{ recentComment.short_intro }}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
</template>

<script>
export default {
  data() {
      return {
          populars: [],
          recentComments: [],
    }
  },
  created(){
      this.fetchPopulars();
      this.fetchRecentComments();
  },
  methods: {
      async fetchPopulars() {
          const { data } = await this.$http.get('/articles/popular');
          this.populars = data.data.slice(0,3);
      },
      async fetchRecentComments() {
        const { data } = await this.$http.get('/articles/comments/recent');
        this.recentComments = data.data.filter(comment => comment !== null).slice(0,3);
      }
  }
  
}
</script>

