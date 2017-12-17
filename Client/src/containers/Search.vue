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
                <li class="active"><a href="#">Search</a></li>
              </ol>
            </div>
            <form class="form-inline" @submit.prevent="search">
              <div class="form-group">
                <label for="tag">Tag:</label>
                <input type="tag" class="form-control" id="tag" v-model="tag">
              </div>
              <div class="form-group">
                <label for="tag">Category:</label>
                <input type="category" class="form-control" id="category" v-model="category">
              </div>
                <div class="form-group">
                <label for="tag">Author :</label>
                <input type="category" class="form-control" id="author" v-model="author">
              </div>
              <button class="btn btn-primary" type="submit" style="margin-top: 20px"><i class="fa fa-search"></i> Submit</button>
            </form>
            <h2> <span class="bold_line"><span></span></span> <span class="solid_line"></span> <span class="title_text">Result</span> </h2>
            <div v-if="articles.length ===0">
              <h3  style="text-align:center">No result for your search</h3>
            </div>
            <div v-else>
               <h3 style="text-align:center">There are {{ articles.length }} results with your search </h3>
            <paginate name="articles" :list="articles" :per="4">
              <li v-for="article in paginated('articles')" :key="article.slug">
                <div class="business_category_left wow fadeInDown">
                  <ul class="fashion_catgnav">
                    <li>
                      <div class="catgimg2_container">
                        <router-link :to="{ name: 'article', params: { article: article.slug }}"><img alt="" :src="article.image"></router-link>
                      </div>
                      <h2 class="catg_titile">
                        <router-link :to="{ name: 'article', params: { article: article.slug }}">{{ article.title }}</router-link>
                      </h2>
                      <div class="comments_box"> <span class="meta_date">{{ article.created_at | moment("ddd,hA")}}</span> <span class="meta_comment"><router-link :to="{ name: 'article', params: { article: article.slug }}">{{ article.comments.length }} Comments</router-link></span>                      <span class="meta_more"><router-link :to="{ name: 'article', params: { article: article.slug }}">Read More...</router-link></span> </div>
                      <p v-html="article.short_intro">{{ article.short_intro | substring(93) }}</p>
                    </li>
                  </ul>
                </div>
              </li>
            </paginate>
            </div>
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
        tag: '',
        category: '',
        author: '',
        paginate: ['articles']
      }
    },
    created () {
      this.boot();
    },
    methods: {
      async boot() {
        this.tag = (this.$route.query.tag) ? this.$route.query.tag : this.tag;
        this.category = (this.$route.query.category) ? this.$route.query.category : this.category;
        this.author = (this.$route.query.author) ? this.$route.query.author : this.author;
        if (this.tag !== '' || this.category !== '' || this.author !== '') {
          await this.search();
        }
      },
      async search() {
        try {
          let searchQuery = (this.tag !== '') ? `tag=${this.tag}` : '';
          searchQuery = (this.category !== '') ? `${searchQuery}&category=${this.category}` : searchQuery;
          searchQuery = (this.author !== '') ? `${searchQuery}&author=${this.author}`: searchQuery;

          const {
            data
          } = await this.$http.get(`/articles?${searchQuery}`);
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