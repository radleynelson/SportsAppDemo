<template lang="html">
  <section class="hero is-fullheight">
    <div class="hero-body">
        <div class="container has-text-centered">
            <div class="column is-4 is-offset-4">
                <h3 class="title has-text-grey">Login</h3>
                <p class="subtitle has-text-grey">Please login to customize your content</p>
                <div class="box box-log-in">
                    <figure class="avatar">
                        <img src="/static/user-login-icon.svg">
                    </figure>
                    <form>
                        <div class="field">
                            <div class="control">
                                <input class="input is-medium" type="email" placeholder="Your Email" autofocus="">
                            </div>
                        </div>

                        <div class="field">
                            <div class="control">
                                <input class="input is-medium" type="password" placeholder="Your Password">
                            </div>
                        </div>
                        <div class="field">
                            <label class="checkbox">
                                <input type="checkbox">
                                Remember me
                            </label>
                        </div>
                        <a class="button is-block is-info is-large is-danger" v-on:click="ComingSoon()">Login</a>
                    </form>
                </div>
                <p class="has-text-grey">
                    <a href="#" v-on:click="ComingSoon()">Sign Up</a> &nbsp;·&nbsp;
                    <a href="#" v-on:click="ComingSoon()">Forgot Password</a> &nbsp;·&nbsp;
                    <a href="#" v-on:click="ComingSoon()">Need Help?</a>
                </p>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
  name: 'User-Login',
  methods: {
    ComingSoon: function(){
      alert('UserLogin will be coming with the next update stay tooned and check back soon!')
    }
  }
}
</script>

<style lang="css">
</style>
