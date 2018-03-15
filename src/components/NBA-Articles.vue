<template lang="html">
  <div>
    <h1 class="title">NBA News</h1>
    <div class="container">
      <template v-for="article in articles">
        <div v-html='article["Embed HTML"]'>

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
      newArticles: [],

    }
  },
  created: function() {
     this.getArticles();
     //this.getTest();

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

    cleanArticles: function(){
      for (var iCount = 0; iCount < this.articles.length; iCount++){
        var temp = replaceall("\\", " ",this.articles[iCount]['Embed HTML']);
        this.articlesClean.push(temp);
      }
      this.articles = this.articlesClean;

    }
  }

</script>

<style>
  .container {
    width: 80%;
    margin: auto;
  }
</style>
