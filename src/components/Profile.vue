<template>
  <div>
    <!-- <div>
      <img :src="$auth.user.picture">
      <h2>{{ $auth.user.name }}</h2>
      <p>{{ $auth.user.email }}</p>
    </div>

    <div>
      <pre>{{ JSON.stringify($auth.user, null, 2) }}</pre>
    </div> -->

    <v-card class="mx-auto pa-8">
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img :src="$auth.user.picture" :alt="$auth.user.nickname">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="$auth.user.name"></v-list-item-title>
            <v-list-item-subtitle>{{$auth.user.email}}</v-list-item-subtitle>
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
        <v-list-item>
          <v-list-item-content>
              <v-list-item-title>Nomor Telepon</v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
              <v-list-item-title>{{ users.telp }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-button>
              <v-btn text color="accent" @click.stop="dialog = true">Edit</v-btn>
          </v-list-item-button>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- <v-btn v-if="$auth.isAuthenticated" @click="logout" text color="primary">Log out</v-btn> -->
      </v-card-actions>
    </v-card>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="434">
      <v-card>
          <v-card-title class="headline">Edit No Telp</v-card-title>
          <v-card-text>
            <v-text-field v-model="notelp" type="number" label="No Telp" required></v-text-field>
          </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Cencel</v-btn>
          <v-btn color="green darken-1" text @click="setTelp(notelp); dialog = false">Save</v-btn>
          </v-card-actions>
      </v-card>
      </v-dialog>
  </v-row>
  </div>
</template>


<script>
import axios from 'axios'
  export default {
    data: () => ({
        baseurl: "https://www.travel.ykyj.xyz/api",
        fav: true,
        dialog: false,
        notelp:'',
        cards: [{ 
            id: '', 
            judul: '',  
            harga: '', 
            url_photo: ''
        }],
        users: { 
            id: '', 
            email: '',  
            telp: '', 
        },
        user: { 
            id: '', 
            email: '',  
            telp: '', 
        },
    }),
    mounted(){
        this.getAkun()
    },
    methods: {
        getAkun(){
            axios.post(this.baseurl+"/akuns/"+this.$auth.user.email+"/email").then(res => {
                this.users = res.data
                window.console.log(res.data)
            }).catch ((err) => {
                window.console.log(err);
            })
        },

        setTelp(telp){
            axios.post(this.baseurl+"/akuns/"+this.$auth.user.email+"/email/"+telp+"/telp").then(res => {
                this.users = res.data
                window.console.log(res.data)
            }).catch ((err) => {
                window.console.log(err);
            })
        },
    },
  }
</script>
