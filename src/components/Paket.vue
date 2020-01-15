<template>
    <div>
        <!-- <v-container fluid>
            <v-row dense>
                <v-col v-for="card in cards" :key="card.title" cols="4">
                    <v-card class="mx-auto" max-width="400">
                        <v-img :src="card.url_photo" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px"></v-img>
                        <v-card-title v-text="card.judul"></v-card-title>
                        <v-card-subtitle v-text="card.harga"></v-card-subtitle>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text v-if="!$auth.isAuthenticated" color="primary">Booking Now</v-btn>
                            <v-btn text v-if="$auth.isAuthenticated" color="accent" @click.stop="getAkun(card.harga, card.id); dialog = true">Booking Now</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container> -->
        <h1>Paket apa saja yang tersedia?</h1>
        <v-container fluid>
            <v-row dense>
                <v-col v-for="card in cards" :key="card.title" cols="4">
                <v-card class="mx-auto" max-width="344">
                    <v-img :src="'https://www.travel.ykyj.xyz/'+card.url_photo" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px"></v-img>
                    <v-card-title v-text="card.judul"></v-card-title>
                    <v-card-subtitle>Rp. {{card.harga}}</v-card-subtitle>
                    
                    <v-card-actions>
                    <v-btn text v-if="!$auth.isAuthenticated" color="primary" @click.stop="dialog = true">Booking Now</v-btn>
                    <v-btn text v-if="$auth.isAuthenticated" color="accent" @click.stop="getAkun(card.harga, card.id); dialog = true">Booking Now</v-btn>

                    <v-spacer></v-spacer>

                    <v-btn icon @click="show = !show">
                        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                    <div v-show="show">
                        <v-divider></v-divider>

                        <v-card-text>
                        {{card.deskripsi}}
                        </v-card-text>
                    </div>
                    </v-expand-transition>
                </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="434" v-if="$auth.isAuthenticated">
            <v-card v-if="this.users.telp">
                <v-card-title class="headline">Booking</v-card-title>
                <v-card-text>
                    <v-text-field v-model="jumlah" type="number" label="Jumlah" required></v-text-field>
                </v-card-text>
                <v-card-text>
                    <v-date-picker v-model="picker" color="green lighten-1" header-color="primary"></v-date-picker>
                </v-card-text>
                <v-card-text>
                    Total Harga {{jumlah*harga}}
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">Cencel</v-btn>
                <v-btn color="green darken-1" text @click="setCart(); dialog = false">Masukan Keranjang</v-btn>
                </v-card-actions>
            </v-card>
            <v-card v-else>
                <v-card-title class="headline">Informasi Profile</v-card-title>
                <v-card-text>Lengkapi Profile</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">Cencel</v-btn>
                <v-btn color="green darken-1" text @click="dialog = false" to="/profile">Edit</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>

            <v-dialog v-model="dialog" persistent max-width="434" v-if="!$auth.isAuthenticated">
            <v-card>
                <v-card-title class="headline">Notice</v-card-title>
                <v-card-text>
                    Ga bisa booking!!, Yuk login dulu untuk Booking..
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="login(); dialog = false">Login</v-btn>
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
        dialog: false,
        show:false,
        picker: new Date().toISOString().substr(0, 10),
        jumlah:0,
        harga:0,
        konten:'',
        cards: [{ 
            id: '', 
            judul: '',  
            deskripsi: '',
            harga: '', 
            url_photo: '',
            show:false
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
        this.load()
    },
    methods: {
        load(){
            axios.get(this.baseurl+"/kontens/0/limit").then(res => {
                this.cards = res.data.data
                window.console.log(res.data)
            }).catch ((err) => {
                window.console.log(err);
            })
        },

        // Log the user in
        login() {
            this.$auth.loginWithRedirect();
        },

        getAkun(setHarga, konten){
            axios.post(this.baseurl+"/akuns/"+this.$auth.user.email+"/email").then(res => {
                this.users = res.data
                this.harga = setHarga
                this.konten = konten
                window.console.log(res.data)
            }).catch ((err) => {
                window.console.log(err);
            })
        },

        setCart(){
            axios.post(this.baseurl+"/pesans/"+this.users.id+"/user/"+this.konten+"/konten/"+this.picker+"/tgl/"+this.jumlah+"/jumlah/"+this.harga*this.jumlah+"/harga").then(res => {
                // this.kdbook = res.data.kd_book
                this.harga = 0
                this.konten = ''
                this.jumlah = 0
                window.console.log(res.data)
            }).catch ((err) => {
                window.console.log(err);
            })
        },
    },
  }
</script>
