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
         <div class="has-text-centered"><button v-on:click="getGame(score.game.ID, score.game.homeTeam.Abbreviation, score.game.awayTeam.Abbreviation, score.gameStatus, score.isUnplayed)" class="button is-outlined is-info">Box-Score</button></div>
      </div>
    </div>

    <div class="modal" v-bind:class="{isActive: boxScore}">
    <div v-on:click="closeGame()" class="modal-background"></div>
    <div class="modal-content">
      <!-- Any other Bulma elements you want -->
      <template v-if="currentGame.homeTeam != undefined">
        <section id="gameBoxScore">
           <div class="card">
              <div class="card-content content-wrapper">
                 <div class="box-Score-Container">
                    <div>
                       <p id="home-team-image"><img class="is-64x64" v-bind:src="filePath + currentGame.game.homeTeam.Abbreviation + fileExt"></p>
                    </div>
                    <div>
                       <p id="home-abr" class="team-Abbr">{{currentGame.game.homeTeam.Abbreviation}}</p>
                       <p id="home-record" class="team-record">52-18</p>
                    </div>
                    <div>
                       <p>
                          <strong id="home-game-score" class="team-Abbr">{{currentGame.homeTeam.homeTeamStats.Pts["#text"]}}</strong>
                       </p>
                    </div>
                    <div class="game-Status">{{currentGame.GameStatus}}</div>
                    <div class="right-boxscore-team">
                       <p id="away-abr" class="team-Abbr">{{currentGame.game.awayTeam.Abbreviation}}</p>
                       <p id="away-record" class="team-record">43-29</p>
                    </div>
                    <div>
                       <p>
                          <strong id="away-game-score" class="team-Abbr">{{currentGame.awayTeam.awayTeamStats.Pts["#text"]}}</strong>
                       </p>
                    </div>
                    <div>
                       <p id="away-team-image"><img class="is-64x64" v-bind:src="filePath + currentGame.game.awayTeam.Abbreviation + fileExt"></p>
                    </div>
                 </div>
              </div>
           </div>
           <div class="box">
              <div id="HomeHeader" class="title is-left team-header">{{currentGame.game.homeTeam.City}}&nbsp;{{currentGame.game.homeTeam.Name}}</div>
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
                       <tbody id="hPlayers">
                          <tr v-for="player in currentGame.homeTeam.homePlayers.playerEntry">
                             <td class="PlayerPostiong">{{player.player.Position}}</td>
                             <td clas="PlayerName">{{player.player.LastName}}</td>
                             <td class="PlayerMins">{{Math.floor((player.stats.MinSeconds["#text"]/60))}}</td>
                             <td class="FGM-FGA">{{player.stats.FgMade["#text"]}}-{{player.stats.FgAtt["#text"]}}</td>
                             <td class="PlayerReb">{{player.stats.Reb["#text"]}}</td>
                             <td class="PlayerAST">{{player.stats.Ast["#text"]}}</td>
                             <td class="PTS">{{player.stats.Pts["#text"]}}</td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>
              <div id="AwayHeader" class="title is-left team-header">{{currentGame.game.awayTeam.City}}&nbsp;{{currentGame.game.awayTeam.Name}}</div>
              <div>
                 <div class="content row">
                    <table class="table is-narrow is-striped">
                       <thead>
                         <tr v-for="player in currentGame.awayTeam.awayPlayers.playerEntry">
                            <td class="PlayerPostiong">{{player.player.Position}}</td>
                            <td clas="PlayerName">{{player.player.LastName}}</td>
                            <td class="PlayerMins">{{Math.floor((player.stats.MinSeconds["#text"]/60))}}</td>
                            <td class="FGM-FGA">{{player.stats.FgMade["#text"]}}-{{player.stats.FgAtt["#text"]}}</td>
                            <td class="PlayerReb">{{player.stats.Reb["#text"]}}</td>
                            <td class="PlayerAST">{{player.stats.Ast["#text"]}}</td>
                            <td class="PTS">{{player.stats.Pts["#text"]}}</td>
                         </tr>
                       </thead>
                       <tbody id="aPlayers">
                          <tr id="&quot; + awayPlayerData[iCount].playerID+&quot;">
                             <td class="PlayerPostiong">SG</td>
                             <td clas="PlayerName">Abrines</td>
                             <td class="PlayerMins">6</td>
                             <td class="FGM-FGA">2-2</td>
                             <td class="PlayerReb">0</td>
                             <td class="PlayerAST">0</td>
                             <td class="PTS">6</td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
        </section>
    </template>
    <!-- If the game hasn't started yet .playerstatsentry -->
    <template v-else-if="homePlayers.playerstatsentry != undefined" >
      <section id="gameBoxScore">
         <div class="card">
            <div class="card-content content-wrapper">
               <div class="box-Score-Container">
                  <div>
                     <p id="home-team-image"><img class="is-64x64" v-bind:src="filePath + homePlayers.playerstatsentry[0].team.Abbreviation + fileExt"></p>
                  </div>
                  <div>
                     <p id="home-abr" class="team-Abbr">{{homePlayers.playerstatsentry[0].team.Abbreviation}}</p>
                     <p id="home-record" class="team-record">52-18</p>
                  </div>
                  <div>
                     <p>
                        <strong id="home-game-score" class="team-Abbr">-</strong>
                     </p>
                  </div>
                  <div class="game-Status">{{homePlayers.GameStatus}}</div>
                  <div class="right-boxscore-team">
                     <p id="away-abr" class="team-Abbr">{{awayPlayers.playerstatsentry[0].team.Abbreviation}}</p>
                     <p id="away-record" class="team-record">43-29</p>
                  </div>
                  <div>
                     <p>
                        <strong id="away-game-score" class="team-Abbr">-</strong>
                     </p>
                  </div>
                  <div>
                     <p id="away-team-image"><img class="is-64x64" v-bind:src="filePath + awayPlayers.playerstatsentry[0].team.Abbreviation + fileExt"></p>
                  </div>
               </div>
            </div>
         </div>
         <div class="box">
            <div id="HomeHeader" class="title is-left team-header">{{homePlayers.playerstatsentry[0].team.City}}&nbsp;{{homePlayers.playerstatsentry[0].team.Name}}</div>
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
                     <tbody id="hPlayers">
                        <tr v-for="player in homePlayers.playerstatsentry">
                           <td class="PlayerPostiong">{{player.player.Position}}</td>
                           <td clas="PlayerName">{{player.player.LastName}}</td>
                           <td class="PlayerMins">{{Math.floor((player.stats.MinSecondsPerGame["#text"]/60))}}</td>
                           <td class="FGM-FGA">{{player.stats.FgMadePerGame["#text"]}}-{{player.stats.FgAttPerGame["#text"]}}</td>
                           <td class="PlayerReb">{{player.stats.RebPerGame["#text"]}}</td>
                           <td class="PlayerAST">{{player.stats.AstPerGame["#text"]}}</td>
                           <td class="PTS">{{player.stats.PtsPerGame["#text"]}}</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
            <div id="AwayHeader" class="title is-left team-header">{{awayPlayers.playerstatsentry[0].team.City}}&nbsp;{{awayPlayers.playerstatsentry[0].team.Name}}</div>
            <div>
               <div class="content row">
                  <table class="table is-narrow is-striped">
                     <thead>
                       <tr v-for="player in awayPlayers.playerstatsentry">
                          <td class="PlayerPostiong">{{player.player.Position}}</td>
                          <td clas="PlayerName">{{player.player.LastName}}</td>
                          <td class="PlayerMins">{{Math.floor((player.stats.MinSecondsPerGame["#text"]/60))}}</td>
                          <td class="FGM-FGA">{{player.stats.FgMadePerGame["#text"]}}-{{player.stats.FgAttPerGame["#text"]}}</td>
                          <td class="PlayerReb">{{player.stats.RebPerGame["#text"]}}</td>
                          <td class="PlayerAST">{{player.stats.AstPerGame["#text"]}}</td>
                          <td class="PTS">{{player.stats.PtsPerGame["#text"]}}</td>
                       </tr>
                     </thead>
                     <tbody id="aPlayers">
                        <tr id="&quot; + awayPlayerData[iCount].playerID+&quot;">
                           <td class="PlayerPostiong">SG</td>
                           <td clas="PlayerName">Abrines</td>
                           <td class="PlayerMins">6</td>
                           <td class="FGM-FGA">2-2</td>
                           <td class="PlayerReb">0</td>
                           <td class="PlayerAST">0</td>
                           <td class="PTS">6</td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </section>
  </template>
    </div>
    <button v-on:click="closeGame()" class="modal-close"></button>
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
      URL: 'https://api.mysportsfeeds.com/v1.2/pull/nba/2018-2019-regular/scoreboard.json?fordate=',
      date: new Date(),
      boxScore: false,
      GameURL: 'https://api.mysportsfeeds.com/v1.2/pull/nba/2018-2019-regular/game_boxscore.json?gameid=',
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
         axios.get(("https://api.mysportsfeeds.com/v1.2/pull/nba/2018-2019-regular/cumulative_player_stats.json?sort=stats.PTS/G.D&team="+homeAbbr),{auth: {username: 'radstlman',password: 'McRn4ever!'}},).then(response => {
           console.log(response.data);
           this.homePlayers = response.data.cumulativeplayerstats;
           this.homePlayers.GameStatus = gameStatus;
           this.boxScore = true;
           return true
         }).then(yellow => {
           axios.get(("https://api.mysportsfeeds.com/v1.2/pull/nba/2018-2019-regular/cumulative_player_stats.json?sort=stats.PTS/G.D&team="+awayAbbr),{auth: {username: 'radstlman',password: 'McRn4ever!'}},).then(response =>{
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
    width: 123px;
}

.modal.isActive {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}


</style>

<style scoped>
.title{
  font-size: 50px;
}
</style>
