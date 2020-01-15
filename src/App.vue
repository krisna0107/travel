<template>
  <div>
    <v-app>
      <AppToolBars/>
      <router-view/>
      <AppFooter/>
    </v-app>
  </div>
</template>

<script>
import AppToolBars from './components/AppToolBars'
import AppFooter from './components/AppFooter'

export default {
  name: 'App',
  components:{AppToolBars, AppFooter},
  mounted(){
    // this.getEmailAuth0()
  },
  methods: {
    getEmailAuth0(){
      if(this.$auth.isAuthenticated){
        this.$email = this.$auth.user.email;
      }
    },
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#quote{
  background: #E0E0E0;
  padding: 40px;

  h1{
    padding-bottom: 30px;
  }
  p{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 25px;
    text-align: center;
  }
}

h1{
  text-align: center;
  padding: 20px;
}
</style>
