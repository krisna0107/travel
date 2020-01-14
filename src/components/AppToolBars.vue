<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Jelajah Belitung</v-toolbar-title>

      <v-spacer></v-spacer>

      <div id="nav" v-if="!$auth.loading">
        <router-link to="/">
          <v-btn text>Home</v-btn>
        </router-link>
        <!-- <router-link to="/paket">
          <v-btn text>Paket</v-btn>
        </router-link>
        <v-btn text>About</v-btn> -->
        <!-- show login when not authenticated -->
        <v-btn v-if="!$auth.isAuthenticated" @click="login" text color="accent">Log in</v-btn>
        <!-- show logout when authenticated -->
        <v-btn v-if="$auth.isAuthenticated" text color="accent" to="/cart">
          <v-icon>mdi-cart</v-icon>
        </v-btn>
        <v-menu v-model="menu" :close-on-content-click="false" offset-y v-if="$auth.isAuthenticated">
          <template v-slot:activator="{ on }">
            <v-avatar size="36">
              <img :src="$auth.user.picture" :alt="$auth.user.nickname" dark v-on="on">
            </v-avatar>
          </template>
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <img :src="$auth.user.picture" :alt="$auth.user.nickname">
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="$auth.user.name"></v-list-item-title>
                  <v-list-item-subtitle>{{this.$email = $auth.user.email}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list dense nav>
              <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn v-if="$auth.isAuthenticated" @click="logout" text color="primary">Log out</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'AppToolBars',
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
    items: [
      { title: 'Edit Profile', icon: 'mdi-account', to:'/profile' },
      { title: 'History', icon: 'mdi-history', to:'/history' },
    ],
  }),
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  },
}
</script>
