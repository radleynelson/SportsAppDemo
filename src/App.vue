<template>
  <div id="app">
    <app-header/>
    <router-view/>
    <app-footer/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter'
export default {
  name: 'App',
  components: { AppHeader, AppFooter }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@media screen and (min-width: 760px) {
  nav ul {
      display: flex;
      justify-content: flex-start;
  }
  .right{
      margin-left: auto;
      padding-right: 25px;
  }
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav {
  background-color: #2b2c2d;
  margin: 0 auto;
}

nav a {
  text-decoration: none;
  color: white;
  display: block;
  padding: 10px;
  font-size: 18px;
  text-align: center;
}

nav li:hover {
  border: solid white 4px;
  color: white;


}

nav li a:hover {
  color: white;
}

.RSPN:hover {
  border: none;
}

.icons {
  font-size: 27px;
}

.RSPN {
  background-color: #FF4227 ;
}

.RSPN a {
  font-size: 24px;
  font-family: ESPN;
}


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
    font-size: 20px;
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
