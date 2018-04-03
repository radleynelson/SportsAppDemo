<template lang="html">

</template>

<script>
import axios from 'axios';
export default {
  data(){
    return{
      URL: 'https://api.mysportsfeeds.com/v1.2/pull/mlb/2018-regular/game_playbyplay.json?gameid=43428',
      playByPlay: {}
    }
  },
  created: function(){
    this.fetchGame();
  },
  methods: {
    fetchGame: function(){
      axios.get(this.URL,{auth: {username: 'radstlman', password: 'McRn4ever!'}},).then(response => {
        this.playByPlay = response.data;
        return true
      }).catch(err => {
        console.log(err);
      });
    }
  }
}
</script>

<style lang="css">
</style>
