<template>

  <section>
    <nav>
        <ul>
            <li class="RSPN">
              <router-link to="/">RSPN</router-link>

            </li>
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li>
                <router-link to="/NBA-Scores">Scores</router-link>
            </li>
            <li>
                <router-link to="/">Standings</router-link>
            </li>
            <li>
              <router-link to="/NBA-News">News</router-link>

            </li>
            <li>
                <router-link to="/NBA-News">About</router-link>
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
   name: 'AppHeader'
 }
</script>

<style scoped>

</style>
