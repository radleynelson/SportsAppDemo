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
              <a v-on:click="news()">News</a>

            </li>
            <li>
                <router-link to="/NBA-Galary">Galary</router-link>
            </li>
            <li class="right">
                <router-link to="/User-Login"><i class="fa fa-user-circle icons" aria-hidden="true"></i></router-link>
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

     },
     news: function(){
       this.$router.push('/NBA-News');
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
