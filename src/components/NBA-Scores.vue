<template>
  <section>
    <h1 class="title">NBA Scores</h1>
    <br>
    <div style="width: 15%; margin: auto" class="Datepicker">
      <datepicker @closed="fetchScores()" @selected="fetchScores()" placeholder="Select Date" v-model="date"></datepicker>
    </div>
    <br>
    <h2 style="font-size: 20px; font-weight: bold;">Scores for {{date.toDateString()}}</h2>
    <br>
    <div class="score-grid">
      <div v-for="(score,index) in scores" label="false" class="score-child showModal box margin-inherit">
         <table v-bind:id="score.game.ID" class="table is-narrow no-border">
            <thead class="no-border">
               <tr>
                  <th class="gameStatus">
                    {{score.gameStatus}}
                  </th>
                  <th></th>
                  <template v-if="score.quarterSummary == null">
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                  </template>
                  <template v-else>
                    <th v-for="(quarter, index) in score.quarterSummary.quarter"><template v-if="index < 4">{{index + 1}}</template><template v-else-if="index ==4">OT</template><template v-else>{{index -3}}OT</template></th>
                    <template v-if="score.quarterSummary.quarter.length == 1">
                      <th>2</th>
                      <th>3</th>
                      <th>4</th>
                    </template>
                    <template v-if="score.quarterSummary.quarter.length == 2">
                      <th>3</th>
                      <th>4</th>
                    </template>
                    <template v-if="score.quarterSummary.quarter.length == 3">
                      <th>4</th>
                    </template>
                  </template>
                  <th>T</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td class="awayAbr" v-bind:label="score.game.awayTeam.Abbreviation">
                     <img class="icon" :src="scores[index].awayPhotoLink">
                  </td>
                  <td class="is-bold">
                     <strong class="is-bold team-name away-team-name">{{score.game.awayTeam.Name}}</strong>
                     <!--<span class="is-italic"><br>(40-10)</span>-->
                  </td>
                  <template v-if="score.quarterSummary == null">
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </template>
                  <template v-else>
                    <td v-for="quarter in score.quarterSummary.quarter">{{quarter.awayScore}}</td>
                    <template v-if="score.quarterSummary.quarter.length == 1">
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </template>
                    <template v-if="score.quarterSummary.quarter.length == 2">
                      <td>-</td>
                      <td>-</td>
                    </template>
                    <template v-if="score.quarterSummary.quarter.length == 3">
                      <td>-</td>
                    </template>
                  </template>
                  <template v-if="score.awayScore == undefined || null"><th>-</th></template><template v-else><th>{{score.awayScore}}</th></template>
               </tr>
               <tr>
                  <td class="homeAbr" v-bind:label="score.game.homeTeam.Abbreviation">
                     <img class="icon" :src="scores[index].homePhotoLink">
                  </td>
                  <td class="is-bold">
                     <strong class="is-bold team-name home-team-name">{{score.game.homeTeam.Name}}</strong>
                     <!--<span class="is-italic"><br>(40-10)</span>-->
                  </td>
                  <template v-if="score.quarterSummary == null">
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </template>
                  <template v-else>
                    <td v-for="quarter in score.quarterSummary.quarter">{{quarter.homeScore}}</td>
                    <template v-if="score.quarterSummary.quarter.length == 1">
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </template>
                    <template v-if="score.quarterSummary.quarter.length == 2">
                      <td>-</td>
                      <td>-</td>
                    </template>
                    <template v-if="score.quarterSummary.quarter.length == 3">
                      <td>-</td>
                    </template>
                  </template>
                  <template v-if="score.homeScore == undefined || null"><th>-</th></template><template v-else><th>{{score.homeScore}}</th></template>
               </tr>
            </tbody>
         </table>
         <div class="has-text-centered"><button class="button is-outlined is-info">Box-Score</button></div>
      </div>
    </div>


    <div v-bind:class="{ is-active: boxScore }class="modal">
<div class="modal-background"></div>
<div class="modal-content">
  <!-- Any other Bulma elements you want -->
  <section id="gameBoxScore">
      <div class="card">
          <div class="card-content content-wrapper">
              <div class="box-Score-Container">
                  <div>
                      <p id = "home-team-image"><img class="is-64x64" src=""></p>
                  </div>
                  <div>
                      <p id="home-abr" class="team-Abbr"></p>
                      <p id = "home-record" class="team-record"></p>
                  </div>

                  <div>
                      <p>
                          <strong id="home-game-score" class="team-Abbr"></strong>
                      </p>
                  </div>
                  <div class="game-Status"></div>

                  <div class="right-boxscore-team">
                      <p id="away-abr" class="team-Abbr"></p>
                      <p id="away-record" class="team-record"></p>
                  </div>

                  <div>
                      <p>
                          <strong id="away-game-score" class="team-Abbr"></strong>
                      </p>
                  </div>
                  <div>
                      <p id = "away-team-image"><img class="is-64x64" src=""></p>
                  </div>
              </div>
          </div>
      </div>

      <div class="box">
          <div id="HomeHeader" class="title is-left team-header">
          </div>
          <div>
              <div class="content row">
                  <table class="table is-narrow is-striped">
                      <thead>
                      <tr>
                          <th>P</th>
                          <th>Name</th>
                          <th>MIN</th>
                          <th>FG</th>
                          <th>REB</th>
                          <th>AST</th>
                          <th>PTS</th>

                      </tr>
                      </thead>
                      <tbody id = "hPlayers">

                      </tbody>
                  </table>
              </div>
          </div>

          <div id="AwayHeader" class="title is-left team-header">
          </div>
          <div>
              <div class="content row">
                  <table class="table is-narrow is-striped">
                      <thead>
                      <tr>
                          <th>P</th>
                          <th>Name</th>
                          <th>MIN</th>
                          <th>FG</th>
                          <th>REB</th>
                          <th>AST</th>
                          <th>PTS</th>

                      </tr>
                      </thead>
                      <tbody id="aPlayers">

                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  </section>
</div>
<button class="modal-close"></button>
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
      URL: 'https://api.mysportsfeeds.com/v1.2/pull/nba/2017-2018-regular/scoreboard.json?fordate=',
      date: new Date(),
      boxScore: false,

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
  FixTime: function(gameStatus){
  var fixedTime;
  if (gameStatus.length === 7){
    var play = gameStatus.substring(0,2);
    play = play -2;
    play = play + gameStatus.substr(2,7);
    fixedTime = play;
  }
  //Else subtract two from thr first time digit
  else if(gameStatus.length === 6){
    var play = gameStatus.substr(0,1);
    play = play -2;
    play = play + gameStatus.substr(1,6);
    fixedTime = play;
  }

  return fixedTime;
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


</style>

<style scoped>
.title{
  font-size: 50px;
}
</style>
