<template>
  <div class="content_bottom">
    <div class="col-lg-8 col-md-8">
      <div class="content_bottom_left">
        <div class="single_page_area">
          <ol class="breadcrumb">
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'category', params: { category: article.category }}">{{ article.category }}</router-link>
            </li>
            <li class="active">{{ article.title}} </li>
          </ol>
          <h2 class="post_titile">{{ article.title }}</h2>
          <div class="single_page_content">
            <div class="post_commentbox"> <a href="#"><i class="fa fa-user" v-if="article.author.name"></i>{{ article.author.name }}</a> <span><i class="fa fa-calendar"></i>{{ article.created_at | moment("dddd, MMMM Do YYYY, h:mm a") }}</span> <router-link :to="{ name: 'category', params: { category: article.category }}"><i class="fa fa-tags"></i>{{ article.category }}</router-link>            </div>
            <img class="img-center" :src="article.image" alt="">
            <p>{{ article.content }}</p>
            <div v-for="(tag, index) in article.tags" :key="index">
              <button class="btn btn-primary">{{ tag }}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="post_pagination">
        <div class="prev"> <a class="angle_left" href="#"><i class="fa fa-angle-double-left"></i></a>
          <div class="pagincontent"> <span>Previous Post</span> <a href="#">Aliquam quam orci in molestie a tempor nec</a> </div>
        </div>
        <div class="next">
          <div class="pagincontent"> <span>Next Post</span> <a href="#">Aliquam quam orci in molestie a tempor nec</a> </div>
          <a class="angle_right" href="#"><i class="fa fa-angle-double-right"></i></a> </div>
      </div>
      <div class="share_post"> <a class="facebook" href="#"><i class="fa fa-facebook"></i>Facebook</a> <a class="twitter" href="#"><i class="fa fa-twitter"></i>Twitter</a> <a class="googleplus" href="#"><i class="fa fa-google-plus"></i>Google+</a>
        <a class="linkedin" href="#"><i class="fa fa-linkedin"></i>LinkedIn</a> <a class="stumbleupon" href="#"><i class="fa fa-stumbleupon"></i>StumbleUpon</a> <a class="pinterest" href="#"><i class="fa fa-pinterest"></i>Pinterest</a> </div>
      <div v-if="user">
        <div class="comment_encourage" v-if="article.comments.length === 0">
          <p><b> Be the first person commeting on this article </b></p>
        </div>
        <vue-editor v-model="comment"></vue-editor>
        <div class="pull-left"> You are commenting as
          <vue-letter-avatar name=user.profile.first_name size='25'></vue-letter-avatar>
        </div>
        <button class="btn btn-primary pull-right" @click="sendComment">Send</button>
        <hr/>
        <h3>Comments</h3>
        <div class="comment_area" v-for="(comment, index) in article.comments" :key="index" v-if="article.comments.length > 0">
          <div class="row">
            <div class="col-md-3">
              <vue-letter-avatar name="comment.user.profile.first_name" size='25'></vue-letter-avatar>
            </div>
            <div class="col-md-9" v-html="comment.content">
              <p>{{ comment.content }}</p>
              <p class="pull-right">{{ comment.created_at | moment("Do ddd, hA")}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="similar_post">
        <h2>Similar Post You May Like <i class="fa fa-thumbs-o-up"></i></h2>
        <ul class="small_catg similar_nav wow fadeInDown animated">
          <li>
            <div class="media wow fadeInDown animated" style="visibility: visible; animation-name: fadeInDown;">
              <a class="media-left related-img" href="#"><img src="../assets/images/112x112.jpg" alt=""></a>
              <div class="media-body">
                <h4 class="media-heading"><a href="#">Duis condimentum nunc pretium lobortis </a></h4>
                <p>Nunc tincidunt, elit non cursus euismod, lacus augue ornare metus, egestas imperdiet nulla nisl quis mauris. Suspendisse a pharetra </p>
              </div>
            </div>
          </li>
          <li>
            <div class="media wow fadeInDown animated" style="visibility: visible; animation-name: fadeInDown;">
              <a class="media-left related-img" href="#"><img src="../assets/images/112x112.jpg" alt=""></a>
              <div class="media-body">
                <h4 class="media-heading"><a href="#">Duis condimentum nunc pretium lobortis </a></h4>
                <p>Nunc tincidunt, elit non cursus euismod, lacus augue ornare metus, egestas imperdiet nulla nisl quis mauris. Suspendisse a pharetra </p>
              </div>
            </div>
          </li>
          <li>
            <div class="media wow fadeInDown animated" style="visibility: visible; animation-name: fadeInDown;">
              <a class="media-left related-img" href="#"><img src="../assets/images/112x112.jpg" alt=""></a>
              <div class="media-body">
                <h4 class="media-heading"><a href="#">Duis condimentum nunc pretium lobortis </a></h4>
                <p>Nunc tincidunt, elit non cursus euismod, lacus augue ornare metus, egestas imperdiet nulla nisl quis mauris. Suspendisse a pharetra </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Sidebar></Sidebar>
  </div>
</template>

<script>
  import Sidebar from '../components/sidebar/right/Sidebar.vue';
  import {
    mapGetters
  } from 'vuex';
  import {
    VueEditor
  } from 'vue2-editor'
  export default {
    computed: mapGetters({
      user: 'auth/user',
    }),
    components: {
      Sidebar,
      VueEditor
    },
    data() {
      return {
        article: {},
        comment: ''
      }
    },
    created() {
      this.fetch(this.$route.params.article);
    },
    methods: {
      async fetch(articleSlug) {
        try {
          const {
            data
          } = await this.$http.get(`/articles/${articleSlug}`);
          this.article = data.data;
        } catch (error) {
          this.$router.push({
            path: '/500'
          });
        }
      },
      async sendComment() {
        try {
          const articleSlug = this.$route.params.article;
          const {
            data
          } = await this.$http.post(`/articles/${articleSlug}/comment`, {
            content: this.comment
          });
          this.article.comments.push(data.data);
        } catch (error) {
          this.$router.push({
            path: '/500'
          });
        }
      }
    }
  }
</script>