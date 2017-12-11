<template>
  <div class="content_bottom">
    <div class="col-lg-8 col-md-8">
      <div class="content_bottom_left">
        <div class="single_category wow fadeInDown">
          <div class="archive_style_1">
            <div style="margin-top:15px;">
              <ol class="breadcrumb">
                <li>
                  <router-link to='/'> Home </router-link>
                </li>
                <li class="active"><a href="#">{{ $route.params.category }}</a></li>
              </ol>
            </div>
            <h2> <span class="bold_line"><span></span></span> <span class="solid_line"></span> <span class="title_text">Latest Updates</span> </h2>
            <paginate name="articles" :list="articles" :per="4">
              <li v-for="article in paginated('articles')" :key="article.slug">
                <div class="business_category_left wow fadeInDown">
                  <ul class="fashion_catgnav">
                    <li>
                      <div class="catgimg2_container">
                        <router-link :to="{ name: 'article', params: { article: article.slug }}"><img alt="" :src="article.image" /></router-link>
                      </div>
                      <h2 class="catg_titile">
                        <router-link :to="{ name: 'article', params: { article: article.slug }}">{{ article.title }}</router-link>
                        </a>
                      </h2>
                      <div class="comments_box"> <span class="meta_date">{{ article.created_at | moment("ddd,hA")}}</span> <span class="meta_comment"><router-link :to="{ name: 'article', params: { article: article.slug }}">{{ article.comments.length }} Comments</router-link></span><span class="meta_more"><router-link :to="{ name: 'article', params: { article: article.slug }}">Read More...</router-link></span> </div>
                      <p>{{ article.short_intro }}</p>
                    </li>
                  </ul>
                </div>
              </li>
            </paginate>
          </div>
        </div>
      </div>
      <div class="pagination_area">
        <nav>
          <paginate-links for="articles" class="pagination"></paginate-links>
        </nav>
      </div>
    </div>
    <Sidebar></Sidebar>
  </div>
</template>

<script>
  import Sidebar from '../components/sidebar/right/Sidebar.vue';
  export default {
    components: {
      Sidebar
    },
    data() {
      return {
        articles: [],
        paginate: ['articles']
      }
    },
    created() {
      this.fetch(this.$route.params.category);
    },
    methods: {
      async fetch(category) {
        try {
          const {
            data
          } = await this.$http.get(`/articles?category=${category}`);
          this.articles = data.data;
        } catch (error) {
          this.$router.push({
            path: '/500'
          });
        }
      },
    }
  }
</script>