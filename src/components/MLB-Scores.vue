<template lang="html">
  <section>
    <h1 class="title">MLB Scores</h1>
    <br>
    <div style="width: 15%; margin: auto" class="Datepicker">
      <datepicker @closed="fetchScores()" @selected="fetchScores()" placeholder="Select Date" v-model="date"></datepicker>
    </div>
    <br>
    <h2>Scores for {{date.toDateString()}}</h2>
    <div calss="">
      <div v-for="(score,index) in scores">
        <table  class="box table is-narrow no-border mlbScores" v-bind:id="score.game.ID">
          <thead class="no-border">
            <tr>
              <th class="gameStatus">
                {{score.gameStatus}}
              </th>
              <th></th>
              <th v-for="(inning,i) in score.inningSummary.inning">{{i+1}}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="awayAbr" v-bind:lable="score.game.awayTeam.Abbreviation">
                <img class="icon" :src="scores[index].awayPhotoLink" alt="">
              </td>
              <td>
                <strong>{{score.game.awayTeam.Name}}</strong>
              </td>
              <td v-for="(inning, i) in score.inningSummary.inning">
                {{inning.awayScore}}
              </td>
              <th>{{score.awayScore}}</th>
            </tr>
            <tr>
              <td class="homeAbr" v-bind:label="score.game.homeTeam.Abbreviation">
                <img class="icon" :src="scores[index].homePhotoLink" alt="">
              </td>
              <td>
                <strong>{{score.game.homeTeam.Name}}</strong>
              </td>
              <td v-for="(inning,i) in score.inningSummary.inning">
                {{inning.homeScore}}
              </td>
              <th>{{score.homeScore}}</th>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </section>

</template>

<script>
import axios from 'axios';
import Datepicker from 'vuejs-datepicker';
export default {
  components:{
    Datepicker
  },
  data() {
    return {
      scores: [],
      fullScores: [],
      URL: 'https://api.mysportsfeeds.com/v1.2/pull/mlb/2018-regular/scoreboard.json?fordate=',
      date: new Date(),
      boxScore: false,
      GameURL: 'https://api.mysportsfeeds.com/v1.2/pull/nba/2017-2018-regular/game_boxscore.json?gameid=',
      currentGame: {},
      filePath: "/static/",
      fileExt: ".png",
      homePlayers: {},
      awayPlayers: {},
    }
  },
  created: function(){
    this.fetchScores();
  },
  computed: {
    dateForApi: function() {
    var today = this.date;
    var year = today.getFullYear().toString();
    var month = ((today.getMonth()) + 1);
    var formatedMonth;
    var day = today.getDate();
    var formatedDay;
    var formatedDate;

    if (month < 10)
    {
        formatedMonth = "0" + month.toString();
    }
    else {
        formatedMonth = month.toString();
    }

    if(day < 10)
    {
        formatedDay = "0" + day.toString();
    }
    else
    {
        formatedDay = day.toString();
    }

    formatedDate = year + formatedMonth + formatedDay;
    return formatedDate;
    }
  },

  methods: {
   fetchScores: function() {
       axios.get((this.URL + this.dateForApi),{auth: {username: 'radstlman',password: 'McRn4ever!'}},)
       .then(response => {
          this.scores = response.data.scoreboard.gameScore;
          //console.log(response);
          this.cleanScores();
           return true;
       }).catch(err => {
         console.log(err);
       });
     },

     getGame: function(gameID, homeAbbr, awayAbbr, gameStatus, isUnplayed) {
       if(isUnplayed == "false"){
         axios.get((this.GameURL + gameID),{auth: {username: 'radstlman',password: 'McRn4ever!'}},).then(response => {
           this.currentGame = response.data.gameboxscore;
           this.boxScore = true;
           this.currentGame.GameStatus = gameStatus;
           console.log(response.data);
           return true;
         }).catch(err => {
           console.log(err);
         })
       }
       else{
         axios.get(("https://api.mysportsfeeds.com/v1.2/pull/nba/2017-2018-regular/cumulative_player_stats.json?sort=stats.PTS/G.D&team="+homeAbbr),{auth: {username: 'radstlman',password: 'McRn4ever!'}},).then(response => {
           console.log(response.data);
           this.homePlayers = response.data.cumulativeplayerstats;
           this.homePlayers.GameStatus = gameStatus;
           this.boxScore = true;
           return true
         }).then(yellow => {
           axios.get(("https://api.mysportsfeeds.com/v1.2/pull/nba/2017-2018-regular/cumulative_player_stats.json?sort=stats.PTS/G.D&team="+awayAbbr),{auth: {username: 'radstlman',password: 'McRn4ever!'}},).then(response =>{
             this.awayPlayers = response.data.cumulativeplayerstats;
           })
         }).catch(err => {
           console.log(err);
         })
       }

     },

     closeGame: function(){
       this.boxScore = false;
       this.currentGame = {};
     },
     cleanScores: function(){
       for (var i = 0; i < this.scores.length; i++) {
         this.scores[i].homePhotoLink = "/static/" + this.scores[i].game.homeTeam.Abbreviation + '.png';
         this.scores[i].awayPhotoLink = '/static/' + this.scores[i].game.awayTeam.Abbreviation + '.png';
         if (this.scores[i].isUnplayed == "true"){
           this.scores[i].gameStatus = this.scores[i].game.time;
         }
         else if(this.scores[i].currentIntermission == '4'|| this.scores[i].isCompleted == "true"){
           this.scores[i].gameStatus = "Final";
         }
         else if(this.scores[i].isUnplayed == "false" && this.scores[i].isInProgress == "true"){
          let minLeft = Math.floor((this.scores[i].currentQuarterSecondsRemaining)/60);
          let secLeft = this.scores[i].currentQuarterSecondsRemaining - (minLeft * 60);
          if (secLeft < 10) {
             secLeft = '0' + secLeft;
          }
           if(this.scores[i].currentQuarter == 1){
             this.scores[i].gameStatus = minLeft + ":"+ secLeft + "-1st";
           }
           else if(this.scores[i].currentQuarter == 2){
             this.scores[i].gameStatus = minLeft + ":"+ secLeft + "-2nd";
           }
           else if(this.scores[i].currentQuarter == 3){
             this.scores[i].gameStatus = minLeft + ":"+ secLeft + "-3rd";
           }
           else if(this.scores[i].currentQuarter == 4){
             this.scores[i].gameStatus = minLeft + ":"+ secLeft + "-4th";
           }
           else if(this.scores[i].currentQuarter > 4){
             let OT = this.scores[i].currentQuarter - 4;
             if(OT == 0){
               OT = "";
             }
             this.scores[i].gameStatus = minLeft + ":"+ secLeft + OT + "OT";
           }
         }
         else if(this.scores[i].gameStatus == undefined){
           if(this.currentIntermission == 1){
             this.scores[i].gameStatus = "End of 1st"
           }
           else if(this.currentIntermission == 2){
             this.scores[i].gameStatus = "Half"
           }
           else if(this.currentIntermission == 3){
             this.scores[i].gameStatus = "End of 3rd"
           }
         }
       }
     },



  }

}
</script>

<style>

input, select {
    padding: .75em .5em;
    font-size: 100%;
    border: 1px solid #ccc;
    width: 100%;
}

.modal.isActive {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.mlbScores{
  margin: auto;
  margin-bottom: 10px;
  width: 500px;
}


</style>

<style scoped>
.title{
  font-size: 50px;
}
.gameStatus{
  color: black;
  font-size: 15px;
}
</style>
