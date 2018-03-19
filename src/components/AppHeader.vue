<template>

  <section>
    <nav>
        <ul>
            <li class="RSPN">
              <a v-on:click="reload()">RSPN</a>
            </li>
            <li>
                <a v-on:click="reload()">RSPN</a>
            </li>
            <li>
                <router-link to="/NBA-Scores">Scores</router-link>
            </li>
            <li>
                <router-link to="/NBA-Standings">Standings</router-link>
            </li>
            <li>
              <router-link to="/NBA-News">News</router-link>

            </li>
            <li>
                <router-link to="/NBA-Galary">Galary</router-link>
            </li>
            <li class="right">
                <router-link to="/"><i class="fa fa-user-circle icons" aria-hidden="true"></i></router-link>
            </li>
        </ul>
    </nav>
</section>
</template>

<script>
 export default {
   name: 'AppHeader',
   methods: {
     reload: function(){
       this.$router.push('/');
       location.reload();

     }
   }
 }
</script>

<style scoped>
@font-face {
    font-family: ESPN;
    src: url('/static/esp.ttf') format("truetype")
}

</style>
