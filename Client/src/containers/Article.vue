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
            <div class="post_commentbox"> <router-link :to="{name: 'search', query: { author: article.author.slug }}"><i class="fa fa-user"></i>{{ article.author.name }}</router-link><span><i class="fa fa-calendar"></i>{{ article.created_at | moment("dddd, MMMM Do YYYY, h:mm a") }}</span> <router-link :to="{ name: 'category', params: { category: article.category }}"><i class="fa fa-tags"></i>{{ article.category }}</router-link>            </div>
            <img class="img-center" :src="article.image" alt="">
            <p>{{ article.content }}</p>
            <div v-for="(tag, index) in article.tags" :key="index">
              <router-link :to="{name: 'search', query: { tag: tag }}" class="btn btn-primary">{{ tag }}</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="share_post"> <a class="facebook" href="#"><i class="fa fa-facebook"></i>Facebook</a> <a class="twitter" href="#"><i class="fa fa-twitter"></i>Twitter</a> <a class="googleplus" href="#"><i class="fa fa-google-plus"></i>Google+</a>
        <a class="linkedin" href="#"><i class="fa fa-linkedin"></i>LinkedIn</a> <a class="stumbleupon" href="#"><i class="fa fa-stumbleupon"></i>StumbleUpon</a> <a class="pinterest" href="#"><i class="fa fa-pinterest"></i>Pinterest</a> </div>
      <div v-if="user!= null">
        <div class="comment_encourage" v-if="article.comments.length === 0">
          <p><b> Be the first person commeting on this article </b></p>
        </div>
        <vue-editor v-model="comment" :editorToolbar="customToolbar"></vue-editor>
        <div class="pull-left"> You are commenting as {{ user.profile.first_name }} {{ user.profile.last_name }}
          <vue-letter-avatar :name="user.profile.first_name" size='25'></vue-letter-avatar>
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
              <p v-html="comment.content">{{ comment.content }}</p>
              <p class="pull-right">{{ comment.created_at | moment("Do ddd, hA")}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h3>Please <router-link :to="{ name : 'login'}">login</router-link> to comment.</h3>
      </div>
      <div class="similar_post">
        <h2>Similar Post You May Like <i class="fa fa-thumbs-o-up"></i></h2>
        <ul class="small_catg similar_nav wow fadeInDown animated">
          <li v-for="(related, index) in article.relateds" :key="related.slug" v-if="index < 3">
            <div class="media wow fadeInDown animated" style="visibility: visible; animation-name: fadeInDown;">
              <router-link :to="{ name: 'article', params: { article: article.slug }}" class="media-left related-img"><img :src="related.image" width="112" height="112" alt=""></router-link>
              <div class="media-body">
                <h4 class="media-heading"><router-link :to="{ name: 'article', params: { article: related.slug }}">{{ related.title}}</router-link></h4>
                <p v-html="related.short_intro">{{ related.short_intro }}</p>
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
        comment: '',
        customToolbar: [
          [{ 'font': [] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['align', { 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'align': [] }],
        ]
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