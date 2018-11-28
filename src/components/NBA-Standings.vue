<template>
  <section>
    <div class="box standings-wrapper has-text-centered">
       <h1 class="title is-5 left-align">Wester Conference standings</h1>
       <table class="table">
          <thead>
             <tr>
                <th><abbr title="Position">Pos</abbr></th>
                <th></th>
                <th>Team</th>
                <th><abbr title="Total Games Played">GP</abbr></th>
                <th><abbr title="Won">W</abbr></th>
                <th><abbr title="Lost">L</abbr></th>
                <th><abbr title="Pct">Pct</abbr></th>
                <th><abbr title="Games Back">GB</abbr></th>
                <th><abbr title="PPG">PPG</abbr></th>
                <th><abbr title="Opp PPG">OPP-PPG</abbr></th>
                <th><abbr title="Point Differential Per Game">+-</abbr></th>
                <th><abbr title="Field Goal Percentage">FgPct</abbr></th>
             </tr>
          </thead>
          <tfoot>
             <tr>
                <th><abbr title="Position">Pos</abbr></th>
                <th></th>
                <th>Team</th>
                <th><abbr title="Total Games Played">GP</abbr></th>
                <th><abbr title="Won">W</abbr></th>
                <th><abbr title="Lost">L</abbr></th>
                <th><abbr title="Pct">Pct</abbr></th>
                <th><abbr title="Games BAck">GB</abbr></th>
                <th><abbr title="PPG">PPG</abbr></th>
                <th><abbr title="Opp PPG">Opp-PPG</abbr></th>
                <th><abbr title="Point Differential Per Game">+-</abbr></th>
                <th><abbr title="Field Goal Percentage">FgPct</abbr></th>
             </tr>
          </tfoot>
          <tbody id="westerConferenceStandings">
             <tr v-for="team in westernStandings">
                <th><template v-if="team.rank < 9">{{team.rank}}</template></th>
                <th><img class="icon static-icon" v-bind:src="filePath +team.team.Abbreviation + fileExt "></th>
                <td>{{team.team.City}}&nbsp; {{team.team.Name}}</td>
                <td>{{team.stats.GamesPlayed["#text"]}}</td>
                <td>{{team.stats.Wins["#text"]}}</td>
                <td>{{team.stats.Losses["#text"]}}</td>
                <td>{{team.stats.WinPct["#text"]}}</td>
                <td>{{team.stats.GamesBack["#text"]}}</td>
                <td>{{team.stats.PtsPerGame["#text"]}}</td>
                <td>{{team.stats.PtsAgainstPerGame["#text"]}}</td>
                <td>{{team.stats.PlusMinusPerGame["#text"]}}</td>
                <td>{{team.stats.FgPct["#text"]}}</td>
             </tr>

          </tbody>
       </table>
    </div>


    <div class="box standings-wrapper has-text-centered">
       <h1 class="title is-5 left-align">Eastern Conference standings</h1>
       <table class="table">
          <thead>
             <tr>
                <th><abbr title="Position">Pos</abbr></th>
                <th></th>
                <th>Team</th>
                <th><abbr title="Total Games Played">GP</abbr></th>
                <th><abbr title="Won">W</abbr></th>
                <th><abbr title="Lost">L</abbr></th>
                <th><abbr title="Pct">Pct</abbr></th>
                <th><abbr title="Games Back">GB</abbr></th>
                <th><abbr title="PPG">PPG</abbr></th>
                <th><abbr title="Opp PPG">OPP-PPG</abbr></th>
                <th><abbr title="Point Differential Per Game">+-</abbr></th>
                <th><abbr title="Field Goal Percentage">FgPct</abbr></th>
             </tr>
          </thead>
          <tfoot>
             <tr>
                <th><abbr title="Position">Pos</abbr></th>
                <th></th>
                <th>Team</th>
                <th><abbr title="Total Games Played">GP</abbr></th>
                <th><abbr title="Won">W</abbr></th>
                <th><abbr title="Lost">L</abbr></th>
                <th><abbr title="Pct">Pct</abbr></th>
                <th><abbr title="Games BAck">GB</abbr></th>
                <th><abbr title="PPG">PPG</abbr></th>
                <th><abbr title="Opp PPG">Opp-PPG</abbr></th>
                <th><abbr title="Point Differential Per Game">+-</abbr></th>
                <th><abbr title="Field Goal Percentage">FgPct</abbr></th>
             </tr>
          </tfoot>
          <tbody id="easternConferenceStandings">
             <tr v-for="team in easternStandings">
                <th><template v-if="team.rank < 9">{{team.rank}}</template></th>
                <th><img class="icon static-icon" v-bind:src="filePath +team.team.Abbreviation + fileExt "></th>
                <td>{{team.team.City}}&nbsp; {{team.team.Name}}</td>
                <td>{{team.stats.GamesPlayed["#text"]}}</td>
                <td>{{team.stats.Wins["#text"]}}</td>
                <td>{{team.stats.Losses["#text"]}}</td>
                <td>{{team.stats.WinPct["#text"]}}</td>
                <td>{{team.stats.GamesBack["#text"]}}</td>
                <td>{{team.stats.PtsPerGame["#text"]}}</td>
                <td>{{team.stats.PtsAgainstPerGame["#text"]}}</td>
                <td>{{team.stats.PlusMinusPerGame["#text"]}}</td>
                <td>{{team.stats.FgPct["#text"]}}</td>
             </tr>

          </tbody>
       </table>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: 'NBA-Standings',
  data() {
    return {
      westernStandings: [],
      easternStandings: [],
      filePath: "/static/",
      fileExt: ".png",
      url: "https://api.mysportsfeeds.com/v1.2/pull/nba/2018-2019-regular/conference_team_standings.json?",
    }
  },
  created: function(){
    this.fetchStandings();
  },
  computed: {

  },
  methods: {
    fetchStandings: function(){
      axios.get((this.url),{auth: {username: 'radstlman',password: 'McRn4ever!'}},).then(response => {
        this.westernStandings = response.data.conferenceteamstandings.conference[1].teamentry;
        this.easternStandings = response.data.conferenceteamstandings.conference[0].teamentry;
        return true;
      }).catch(err => {
        console.log(err);
      })
    }
  },
}
</script>

<style>
</style>
