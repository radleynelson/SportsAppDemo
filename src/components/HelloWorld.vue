<template>
  <section>
    <div class="content-wrapper is-centered">
        <h1 class="title has-text-centered is-1">
            Headlines
        </h1>
    </div>


    <div class="content-wrapper">
        <div class="card jumbo-tron">
            <div class="card-content">
                <div class="card-image">
                    <img src="https://img.bleacherreport.net/cms/media/image/c9/91/9b/17/1263/4549/bf9b/7453127b7e00/crop_exact_full_image.jpeg?h=4000&w=6000&q=70&crop_x=center&crop_y=top">
                </div>
                <h1 class="card-header-title is-centered title">
                    <a target="_blank" href="http://bleacherreport.com/articles/2765073-dennis-lindsey-on-suns-jazz-fight-you-expect-players-to-be-protected-by-nba">Jazz GM Calls on NBA to 'Protect Players</a>
                </h1>

                <!-- <p class="card-content has-text-centered">
                    The rookie out of Louisville is making noise and a good argument he should
                    be rookie of the year....
                </p> -->
                <div class="has-text-centered">
                    <a target="_blank" href="http://bleacherreport.com/articles/2765073-dennis-lindsey-on-suns-jazz-fight-you-expect-players-to-be-protected-by-nba" class="button is-danger is-outlined">See More</a>
                </div>


            </div>
        </div>
    </div>

    <div class="content-wrapper">
        <div class="main-grid">
            <div v-for="insta in getRandomPosts">
              <div v-html="insta['html']">

              </div>
            </div>
            <!-- <div v-html="instaEmbeds[0].html">

            </div>
            <div v-html="instaEmbeds[5].html">

            </div>
            <div v-html="instaEmbeds[4].html">

            </div> -->

        </div>

    </div>

</section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HelloWorld',
  data () {
    return {
      instaURLs: [],
      instaEmbeds: [],
      articles: [],
    }
  },
  created: function(){
    this.getPosts();
    let ckeditor = document.createElement('script');
    ckeditor.setAttribute('src',"//www.instagram.com/embed.js?v="+(new Date().getTime()) + 1);
    document.body.appendChild(ckeditor);
  },
  computed: {
    getRandomPosts: function(){
      this.getArticles();
      return [this.instaEmbeds[5], this.instaEmbeds[0], this.instaEmbeds[2]];
    }
  },
  methods: {
    getPosts: function(){
      axios.get("/api/insta").then(response =>{
        this.instaEmbeds = response.data;
        //this.getArticles();
        return true;
      }).catch(err => {
        console.log(err);
      })
    },
    getArticles: function() {
      axios.get("https://api.mozenda.com/rest?WebServiceKey=D185B582-0CDB-41EE-B299-1C357F17A82B&Service=Mozenda10&Operation=View.GetItems&ViewID=11126&ResponseFormat=JSON").then(response => {
        this.articles = response.data.Item;
        return true;
      }).catch(err => {
        console.log(err);
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
