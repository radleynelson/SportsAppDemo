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

</style>
