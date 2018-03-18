<template>
  <section>
    <h1 class="title">NBA Scores</h1>
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
</section>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      scores: [],
      fullScores: [],
      URL: 'https://api.mysportsfeeds.com/v1.2/pull/nba/2017-2018-regular/scoreboard.json?fordate=20180316',

    }
  },
  created: function(){
    this.fetchScores();
  },
  computed: {

  },

  methods: {
   fetchScores: function() {
       axios.get(this.URL,{auth: {username: 'radstlman',password: 'McRn4ever!'}},)
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
p{
    padding-top: 20px;
}

th{
  text-decoration: none;
}

.table td.is-selected, .table th.is-selected {
    background-color: lightgray;
    color: black;
}

.left-align{
  text-align: left;
}

.content-wrapper {
    padding: 20px;
    margin: auto;
    width: 80%;
}

.standings-wrapper {
    padding: 20px;
    margin: auto;
    overflow-x:auto;
    width: 80%;
}

.playOff-CutOff{
  border-bottom: solid #4a4a4a;
}

.static-icon{
  min-width: 24px;
}

.row {
    overflow-x: scroll;
}

.main-grid {
    display: grid;
    grid-template: 1fr 1fr 1fr/auto;
    grid-row-gap: 15px;
    grid-column-gap: 15px;
}

.sidebar{
    border-right: solid black 3px;
    padding-right: 10px;
}

.card{
    margin: auto;
}

.title {
    font-size: 35px;
}

.box {
    text-align: center;
}

.logo {
    height:auto;
    width:75px;
}

.ESPN {
    background: #FF4227;
}

.more-padding {
    padding: 10px;
}

#twitterwidget[style]{
    width:100%;
}



.no-border {
    border:none;
}

.game-info {
    display: flex;
    justify-content: flex-start;
}

.game-info-ul{
    list-style-type: none;
    padding: 0;
}

.score-grid {
    display: grid;
    grid-template: auto auto/1fr;
    grid-column-gap: 15px;
}



td {
    font-size: 12px;
}

tr{
    font-size: 12px;
}

.center-Scores {
    text-align: center;
}

@media screen and (max-width: 759px) {
    .score-grid {
        margin: auto;

    }

    td{
        font-size: 14px;
    }

    tr{
        font-size: 14px;
    }

    .content-wrapper{
        width: 100%;
    }

}

table{
    min-width: 357.317px;
}

.ui-datepicker table{
    min-width: 0;
}

.score-grid{

    align-content: center;

}

.team-name{
    font-size: 12px;
}

.gameStatus{
    font-size: 10px;
    color: red;
}

section{
    padding-bottom: 35px;
}

.score-child{
    max-width: 380px;
    min-width: 380px;
    height: 189px;

}

.today-red{
  color: red;
}

#dateScores{
  font-size: 20px;
  padding-bottom: 25px;
  text-align: center;
}

.margin-inherit{
  margin: inherit;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 25px;
  position: relative;
}

.dates{
    justify-content: center;
}

.date p{
    padding-top: 0;
}
.date {
    font-size: 14px;
}

.twitter{
    width: 50%;
    margin: auto;
}


.hero.is-success {
    background: #fff;
}
.hero .nav, .hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
}
.box-log-in {
    margin-top: 5rem;
}
.avatar {
    margin-top: -70px;
    padding-bottom: 20px;
}
.avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
}

.button.is-danger {
    background-color: #FF4227;
    border-color: transparent;
    color: #fff;
}

.button.is-danger:hover{
    opacity: .7;
    background-color: #FF4227;
}

.button.is-danger.is-outlined {
    background-color: transparent;
    border-color: #FF4227;
    color: #FF4227;
}

.button.is-danger.is-outlined:hover {
    background-color: #FF4227;
    color: #fff;
}
input {
    font-weight: 300;
}
p {
    font-weight: 700;
}
p.subtitle {
    padding-top: 1rem;
}

.blog-post{
    text-align: left;
}

footer a i{
   text-decoration: none;
    color: black;
}

.insta{
    width: 75%;
    margin-left: auto;
}

.box-Score-Container{
    display: flex;
    justify-content: flex-start;
}
.team-Abbr{
    font-size: 32px;
    padding-left: 10px;
}

.team-record{
    padding-top: 0;
}

.right-boxscore-team{
    margin-left: auto;
}
.game-Status{
    margin-left: auto;
    margin-right: auto;
}

.team-header{
    text-align: left;
}

@media screen and (max-width: 667px) {
    .team-Abbr {
        font-size: 25px;
    }
}


@media screen and (min-width: 760px) {
    .main-grid {
        display: grid;
        grid-template: 1fr/auto auto auto;
        grid-row-gap: 15px;
        grid-column-gap: 15px;
    }


    .margin-inherit{
      margin: inherit;
      border-radius: 10px;
      padding: 10px;
      margin-bottom: 25px;
      position: relative;
    }

    .score-grid {
        display: grid;
        grid-template: auto/1fr 1fr;
        grid-column-gap: 15px;
        width: 100%;
    }


    .score-child:nth-child(odd) {
        margin-left: auto;
    }


    .score-child:nth-child(even) {
        margin-right: auto;
    }

    .score-left{
      margin-left: auto;
    }

    .score-right{
      margin-right: auto;
    }

    td {
        font-size: 15px;
    }

    tr{
        font-size: 15px;
    }



}

@media screen and (max-width: 892px){
  .standings-wrapper {
      margin: auto;
      width: 100%;
  }
}

@media screen and (max-width: 759px) {
    .score-child{
        margin: auto;
    }
    .margin-inherit{
      margin: inherit;
      border-radius: 10px;
      padding: 10px;
      margin-bottom: 25px;
      position: relative;
    }
}

</style>
