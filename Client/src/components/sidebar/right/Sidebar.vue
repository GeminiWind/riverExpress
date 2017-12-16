<template>
    <div class="col-lg-4 col-md-4">
        <div class="content_bottom_right">
         <Recent></Recent>
         <Popular></Popular>
          <div class="single_bottom_rightbar">
            <h2>Blog Archive</h2>
            <div class="blog_archive wow fadeInDown">
              <form action="#">
                <select>
                  <option value="">Blog Archive</option>
                  <option value="">October(20)</option>
                </select>
              </form>
            </div>
          </div>
          <div class="single_bottom_rightbar wow fadeInDown">
            <h2>Popular Lnks</h2>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Blog Home</a></li>
              <li><a href="#">Error Page</a></li>
              <li><a href="#">Social link</a></li>
              <li><a href="#">Login</a></li>
            </ul>
          </div>
        </div>
      </div>
</template>

<script>
    import Recent from './Recent.vue';
    import Popular from './Popular.vue';
    export default {
        name: 'Sidebar',
        components: {
            Recent,
            Popular
        }
    }
</script>
