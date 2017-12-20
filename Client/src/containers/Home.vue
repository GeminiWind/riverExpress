<template>
  <div>
    <div class="content_top">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm6">
          <slick ref="slick" :options="slickOptions">
            <div class="single_iteam" v-for="popular in populars" :key="popular.slug"><img :src="popular.image" alt="">
              <h2><router-link :to="{ name: 'article', params: { article: popular.slug }}" class="slider_tittle">{{ popular.title | substring(93) }}</router-link></h2>
            </div>
          </slick>
        </div>
        <div class="col-lg-6 col-md-6 col-sm6">
          <div class="content_top_right">
            <ul class="featured_nav wow fadeInDown">
              <li v-for="(politics, index) in politicses" :key="politics.slug" v-if="index<4"><img :src="politics.image" alt="">
                <div class="title_caption"><router-link :to="{ name: 'article', params: { article: politics.slug }}">{{ politics.title | substring(93) }}</router-link></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="content_middle">
      <div class="col-lg-3 col-md-3 col-sm-3">
        <div class="content_middle_leftbar">
          <div class="single_category wow fadeInDown">
            <h2> <span class="bold_line"><span></span></span> <span class="solid_line"></span> <router-link :to="{ name: 'category', params: { category: 'Lifestyle' } }" class="title_text">Lifestyle</router-link> </h2>
            <ul class="catg1_nav">
              <li v-for="(lifestyle, index) in lifestyles" :key="lifestyle.slug" v-if="index <2">
                <div class="catgimg_container">
                  <router-link :to="{ name: 'article', params: { article: lifestyle.slug }}" class="catg1_img"><img alt="" :src="lifestyle.image"></router-link>
                </div>
                <h3 class="post_titile"><router-link :to="{ name: 'article', params: { article: lifestyle.slug }}">{{ lifestyle.title | substring(93) }}</router-link></h3>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6">
        <div class="content_middle_middle">
          <slick ref="slick" :options="slick2">
            <div class="single_featured_slide" v-for="popular in populars" :key="popular.slug">
              <router-link :to="{ name: 'article', params: { article: popular.slug }}"><img :src="popular.image" alt=""></router-link>
              <h2><router-link :to="{ name: 'article', params: { article: popular.slug }}">{{ popular.title }}</router-link></h2>
              <p v-html="popular.short_intro">{{ popular.short_intro }}</p>
            </div>
          </slick>
        </div>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-3">
        <div class="content_middle_rightbar">
          <div class="single_category wow fadeInDown">
            <h2> <span class="bold_line"><span></span></span> <span class="solid_line"></span> <router-link :to="{ name: 'category', params: { category: 'Travel' } }" class="title_text">Travel</router-link> </h2>
            <ul class="catg1_nav">
              <li v-for="(travel, index) in travels" :key="travel.slug" v-if="index <2">
                <div class="catgimg_container">
                  <router-link :to="{ name: 'article', params: { article: travel.slug }}" class="catg1_img"><img alt="" :src="travel.image"></router-link>
                </div>
                <h3 class="post_titile"><router-link :to="{ name: 'article', params: { article: travel.slug }}">{{ travel.title | substring(93) }}</router-link></h3>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="content_bottom">
      <div class="col-lg-8 col-md-8">
        <div class="content_bottom_left">
          <div class="single_category wow fadeInDown">
            <h2> <span class="bold_line"><span></span></span> <span class="solid_line"></span> <router-link :to="{ name: 'category', params: { category: 'Bussiness' } }" class="title_text">Business</router-link> </h2>
            <div class="business_category_left wow fadeInDown">
              <ul class="fashion_catgnav">
                 <li>
                    <div class="catgimg2_container">
                      <router-link :to="{ name: 'article', params: { article: bussinesses[0].slug }}"><img alt="" :src="bussinesses[0].image"></router-link>
                    </div>
                    <h2 class="catg_titile">
                      <router-link :to="{ name: 'article', params: { article: bussinesses[0].slug }}">{{ bussinesses[0].title }}</router-link>
                    </h2>
                    <div class="comments_box"> <span class="meta_date">{{ bussinesses[0].created_at | moment("ddd, hA")}}</span> <span class="meta_comment"><router-link :to="{ name: 'article', params: { article: bussinesses[0].slug }}">{{ bussinesses[0].comments.length}} comments</router-link></span>                    <span class="meta_more"><router-link :to="{ name: 'article', params: { article: games[0].slug }}">Read More...</router-link></span> </div>
                    <p v-html="bussinesses[0].short_intro">{{ bussinesses[0].short_intro | substring(93) }}</p>
                  </li>
              </ul>
            </div>
            <div class="business_category_right wow fadeInDown">
              <ul class="small_catg">
                  <li v-for="(bussiness, index) in bussinesses" :key="bussiness.slug" v-if="index >0 && index <3">
                    <div class="media">
                      <router-link :to="{ name: 'article', params: { article: bussiness.slug }}" class="media-left">
                        <img :src="bussiness.image" alt="" width="112" height="112">
                      </router-link>
                      <div class="media-body">
                        <h4 class="media-heading">
                          <router-link :to="{ name: 'article', params: { article: bussiness.slug }}">
                            {{ bussiness.title | substring(93) }}
                          </router-link>
                        </h4>
                        <div class="comments_box"> <span class="meta_date">{{ bussiness.created_at | moment("ddd,hA")}}</span> <span class="meta_comment"><router-link :to="{ name: 'article', params: { article: bussiness.slug }}">{{ bussiness.comments.length }} comments</router-link></span> </div>
                      </div>
                    </div>
                  </li>
              </ul>
            </div>
          </div>
          <div class="games_fashion_area">
            <div class="games_category">
              <div class="single_category">
                <h2> <span class="bold_line"><span></span></span> <span class="solid_line"></span> <router-link :to="{ name: 'category', params: { category: 'Game' } }" class="title_text">Game</router-link> </h2>
                <ul class="fashion_catgnav wow fadeInDown">
                  <li>
                    <div class="catgimg2_container">
                      <router-link :to="{ name: 'article', params: { article: games[0].slug }}"><img alt="" :src=games[0].image></router-link>
                    </div>
                    <h2 class="catg_titile">
                      <router-link :to="{ name: 'article', params: { article: games[0].slug }}">{{ games[0].title }}</router-link>
                    </h2>
                    <div class="comments_box"> <span class="meta_date">{{ games[0].created_at | moment("ddd, hA")}}</span> <span class="meta_comment"><router-link :to="{ name: 'article', params: { article: games[0].slug }}">{{ games[0].comments.length}} comments</router-link></span>                    <span class="meta_more"><router-link :to="{ name: 'article', params: { article: games[0].slug }}">Read More...</router-link></span> </div>
                    <p v-html="games[0].short_intro">{{ games[0].short_intro | substring(93) }}</p>
                  </li>
                </ul>
                <ul class="small_catg wow fadeInDown">
                  <li v-for="(game,index) in games" :key="game.slug" v-if="index >0 && index <3">
                    <div class="media">
                      <router-link :to="{ name: 'article', params: { article: game.slug }}" class="media-left">
                        <img :src="game.image" alt="" width="112" height="112">
                      </router-link>
                      <div class="media-body">
                        <h4 class="media-heading">
                          <router-link :to="{ name: 'article', params: { article: game.slug }}">
                            {{ game.title }}
                          </router-link>
                        </h4>
                        <div class="comments_box"> <span class="meta_date">{{ game.created_at | moment("ddd,hA")}}</span> <span class="meta_comment"><router-link :to="{ name: 'article', params: { article: game.slug }}">{{ game.comments.length }} comments</router-link></span> </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="fashion_category">
              <div class="single_category">
                <div class="single_category wow fadeInDown">
                  <h2> <span class="bold_line"><span></span></span> <span class="solid_line"></span> <router-link :to="{ name: 'category', params: { category: 'Fashion' } }" class="title_text">Fashion</router-link></h2>
                  <ul class="fashion_catgnav wow fadeInDown">
                    <li>
                      <div class="catgimg2_container">
                        <router-link :to="{ name: 'article', params: { article: fashions[0].slug }}"><img alt="" :src="fashions[0].image" width="112px" height="112px"></router-link>
                      </div>
                      <h2 class="catg_titile">
                        <router-link :to="{ name: 'article', params: { article: fashions[0].slug }}">{{ fashions[0].title }}</router-link>
                      </h2>
                      <div class="comments_box"> <span class="meta_date">{{ fashions[0].created_at | moment("ddd, hA") }}</span> <span class="meta_comment"><router-link :to="{ name: 'article', params: { article: fashions[0].slug }}">{{ fashions[0].comments.length }} Comments</router-link></span>                      <span class="meta_more"><router-link :to="{ name: 'article', params: { article: fashions[0].slug }}">Read More...</router-link></span> </div>
                      <p v-html="fashions[0].short_intro">{{ fashions[0].short_intro | substring(93) }} </p>
                    </li>
                  </ul>
                  <ul class="small_catg wow fadeInDown">
                    <li v-if="index >0 && index <3" v-for="(fashion, index) in fashions" :key="fashion.slug">
                      <div class="media wow fadeInDown">
                        <router-link :to="{ name: 'article', params: { article: fashion.slug }}" class="media-left"><img :src="fashion.image" alt="" width="112px" height="112px"></router-link>
                        <div class="media-body">
                          <h4 class="media-heading">
                            <router-link :to="{ name: 'article', params: { article: fashion.slug }}">{{ fashion.title }} </router-link>
                          </h4>
                          <div class="comments_box"> <span class="meta_date">{{ fashion.created_at | moment("ddd, hA")}}</span> <span class="meta_comment"><router-link :to="{ name: 'article', params: { article: fashion.slug }}">{{ fashion.comments.length }} Comments</router-link></span>                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="technology_catrarea">
            <div class="single_category">
              <h2> <span class="bold_line"><span></span></span> <span class="solid_line"></span>
                <router-link :to="{ name: 'category', params: { category: 'Technology' }}" class="title_text">Technology</router-link>
              </h2>
              <div class="business_category_left">
                <ul class="fashion_catgnav wow fadeInDown">
                  <li>
                    <div class="catgimg2_container">
                      <router-link :to="{ name: 'article', params: { article: technologies[0].slug }}"><img alt="" :src="technologies[0].image"></router-link>
                    </div>
                    <h2 class="catg_titile">
                      <router-link :to="{ name: 'article', params: { article: technologies[0].slug }}">{{ technologies[0].title }}</router-link>
                    </h2>
                    <div class="comments_box"> <span class="meta_date"> {{ technologies[0].created_at | moment("ddd, hA") }}</span> <span class="meta_comment"><router-link :to="{ name: 'article', params: { article: technologies[0].slug }}">{{ technologies[0].comments.length }} Comments</router-link></span>                    <span class="meta_more"><router-link :to="{ name: 'article', params: { article: technologies[0].slug }}">Read More...</router-link></span> </div>
                    <div>
                      <p v-html="technologies[0].short_intro">{{ technologies[0].short_intro | substring(93) }}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="business_category_right">
                <ul class="small_catg wow fadeInDown">
                  <li v-if="index > 0 && index < 4"  v-for="(technology, index) in technologies" :key="technology.slug">
                    <div class="media wow fadeInDown">
                      <router-link :to="{ name: 'article', params: { article: technology.slug }}" class="media-left"><img :src="technology.image" alt="" width="112px" height="112px"></router-link>
                      <div class="media-body">
                        <h4 class="media-heading">
                          <router-link :to="{ name: 'article', params: { article: technology.slug }}">{{ technology.title }}</router-link>
                        </h4>
                        <div class="comments_box"> <span class="meta_date">{{ technology.created_at | moment("ddd, hA") }}</span> <span class="meta_comment"><router-link :to="{ name: 'article', params: { article: technology.slug }}">{{ technology.comments.length }} Comments</router-link></span>                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Sidebar></Sidebar>
    </div>
  </div>
</template>

<script>
  import Sidebar from '../components/sidebar/right/Sidebar.vue';
  import Slick from 'vue-slick';
  export default {
    components: {
      Sidebar,
      Slick
    },
    name: 'home',
    data() {
      return {
        populars: [],
        games: [],
        fashions: [],
        technologies: [],
        bussinesses: [],
        lifestyles: [],
        travels: [],
        economies: [],
        politicses: [],
        recents: [],
        slickOptions: {
          slidesToShow: 4,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slide: 'div',
          autoplay: true,
          autoplaySpeed: 2000,
          cssEase: 'linear',
          arrows: false
        },
        slick2: {
          infinite: true,
          speed: 500,
          autoplay: true,
          autoplaySpeed: 2000,
          fade: true,
          slide: 'div',
          cssEase: 'linear',
          arrows: false,
        }
      }
    },
    created() {
      this.fetchPopulars();
      this.fetchGames();
      this.fetchFashions();
      this.fetchTechnologies();
      this.fetchBussinesses();
      this.fetchTravels();
      this.fetchLifestyles();
      this.fetchEconomies();
      this.fetchPoliticses();
      this.fetchRecents();
    },
    methods: {
      async fetchPopulars() {
          const { data } = await this.$http.get('/articles/popular');
          this.populars = data.data.slice(0,3);
      },
      async fetchByCategory(category) {
        try {
          const {
            data
          } = await this.$http.get(`/articles?category=${category}`);
          return data.data;
        } catch (error) {
          this.$router.push({
            path: '/500'
          });
        }
      },
      async fetchGames() {
        this.games = await this.fetchByCategory('Game');
      },
      async fetchFashions() {
        this.fashions = await this.fetchByCategory('Fashion');
      },
      async fetchTechnologies() {
        this.technologies = await this.fetchByCategory('Technology');
      },
      async fetchBussinesses() {
        this.bussinesses = await this.fetchByCategory('Bussiness');
      },
      async fetchTravels() {
        this.travels = await this.fetchByCategory('Travel');
      },
      async fetchLifestyles() {
        this.lifestyles = await this.fetchByCategory('Lifestyle');
      },
      async fetchEconomies() {
        this.economies = await this.fetchByCategory('Economy');
      },
      async fetchPoliticses() {
        this.politicses = await this.fetchByCategory('Politics');
      },
      async fetchRecents() {
          const { data } = await this.$http.get('/articles');
          this.recents = data.data;
      },
      next() {
        this.$refs.slick.next();
      },
      prev() {
        this.$refs.slick.prev();
      },
      reInit() {
        this.$nextTick(() => {
          this.$refs.slick.reSlick();
        });
      }
    }
  }
</script>