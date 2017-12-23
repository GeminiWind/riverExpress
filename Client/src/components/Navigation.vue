<template>
 <div id="navarea">
    <nav class="navbar navbar-default" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav custom_nav">
            <li><router-link to="/">Home</router-link></li>
            <li class="dropdown"> <a href="#" class="" data-toggle="dropdown" role="button" aria-expanded="false">Category</a>
              <ul class="dropdown-menu" role="menu">
                <li><router-link :to="{ name: 'category', params: { category: 'Bussiness' } }">Bussiness</router-link></li>
                <li><router-link :to="{ name: 'category', params: { category: 'Economy' } }">Economy</router-link></li>
                <li><router-link :to="{ name: 'category', params: { category: 'Fashion' } }">Fashion</router-link></li>
                <li><router-link :to="{ name: 'category', params: { category: 'Game' } }">Game</router-link></li>
                <li><router-link :to="{ name: 'category', params: { category: 'Lifestyle' } }">Lifestyle</router-link></li>
                <li><router-link :to="{ name: 'category', params: { category: 'Technology' } }">Technology</router-link></li>
                <li><router-link :to="{ name: 'category', params: { category: 'Travel' } }">Travel</router-link></li>
                <li><router-link :to="{ name: 'category', params: { category: 'Politics' } }">Politics</router-link></li>
              </ul>
            </li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
             <li><router-link :to="{name: 'search'}">Search</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
  </div> 
</template>

<script>
 export default {
     
 }   
</script>
