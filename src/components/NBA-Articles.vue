<template lang="html">
  <div>
    <h1 class="title">NBA News</h1>
    <div class="container">
      <template v-for="article in articles">
        <div class="News" v-html='article["Embed HTML"]'>

        </div>
      </template>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import replaceall from 'replaceall';
export default {
  name: 'NBA-Articles',
  data() {
    return {
      articles: [],
      articlesClean: [],

    }
  },
  created: function() {
     this.getArticles();
     //this.getTest();

   },
   computed: {
     newsArticles: function(){
       return this.articles;
     }
   },

  methods: {
    getArticles: function(){
      axios.get("/api/articles").then(response => {
        this.articles = response.data;
        console.log(response);
        this.cleanArticles();
      }).then(response => {
        this.testing();
        return true;
      }).catch(err => {
      })
    },
    getTest: function(){
      axios.get('https://api.mozenda.com/rest?WebServiceKey=D185B582-0CDB-41EE-B299-1C357F17A82B&Service=Mozenda10&Operation=View.GetItems&ViewID=11151&ResponseFormat=JSON').then(response => {
        console.log(response);
        this.articles = response.data.Item;
        return true;
      }).catch(err => {
        console.log(err);
      })
    },

    },

  }

</script>

<style>
  .container {
    width: 70%;
    margin: auto;
  }

  .News{
    margin-bottom: 35px;
  }

  @media screen and (max-width: 550px){
    .container{
      width:90%;
    }
  }
</style>
