<template>
  <div>
    <v-card class="mx-auto pa-8">
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Pembayaran</v-list-item-title>
            <v-list-item-subtitle>{{$auth.user.email}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list dense nav>
          <v-list-item>
          <v-list-item-content>
              <v-list-item-title>Booking</v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
              <v-list-item-title>Paket</v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
              <v-list-item-title>Tanggal</v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
              <v-list-item-title>Jumlah</v-list-item-title>
          </v-list-item-content>

          <v-list-item-button>
              <v-list-item-title>Action</v-list-item-title>
          </v-list-item-button>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
              <v-list-item-title>{{this.carts.kd_book}}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
              <v-list-item-title>{{this.carts.konten_id}}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
              <v-list-item-title>{{this.carts.tanggal}}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-content>
              <v-list-item-title>{{this.carts.jumlah}}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-button>
              <v-btn text color="accent" @click.stop="hapus(carts.kd_book);" v-if="carts.kd_book">
                  <v-icon>mdi-delete</v-icon>
              </v-btn>
          </v-list-item-button>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-col class="d-flex" cols="12" sm="2">
            <v-select v-model="selects" :items="banks" label="Pilih Bank" outlined v-if="$auth.isAuthenticated && carts.kd_book"></v-select>
        </v-col>
        <v-btn v-if="$auth.isAuthenticated && carts.kd_book" text color="primary" @click.stop="bayar(carts.kd_book, carts.total_harga, carts.user_id, selects); dialog=true">Bayar</v-btn>
      </v-card-actions>
    </v-card>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="434">
      <v-card>
          <v-card-title class="headline">Transfer Bank</v-card-title>
          <v-card-text>
            Bank {{payment.va_numbers[0].bank}}
          </v-card-text>

          <v-card-text>
            <b>{{payment.va_numbers[0].va_number}}</b>
          </v-card-text>

          <v-card-text>
            Rp. {{payment.gross_amount}}
          </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Cencel</v-btn>
          <v-btn color="green darken-1" text @click="konfirmasi(carts.kd_book, carts.user_id, selects); dialog = false">Konfirmasi</v-btn>
          </v-card-actions>
      </v-card>
      </v-dialog>

      <v-dialog v-model="dialogbank" persistent max-width="434">
      <v-card>
          <v-card-title class="headline">Transfer Bank Sukses</v-card-title>
          <v-card-text>
            Bank {{payment.va_numbers[0].bank}}
          </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialogbank = false" to="/">Ok</v-btn>
          </v-card-actions>
      </v-card>
      </v-dialog>

      <v-dialog v-model="dialogcancel" persistent max-width="434">
      <v-card>
          <v-card-title class="headline">Pembatalan</v-card-title>
          <v-card-text>
            Sukses melakukan Pembatalan.
          </v-card-text>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="cancelTrf(carts.kd_book); dialogbank = false" to="/cart">Ok</v-btn>
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
        dialogbank: false,
        selects:'BNI',
        banks: ['BNI', 'BCA'],
        carts:{
            kd_book: '',
            user_id: '',
            konten_id: '',
            tanggal: '',
            jumlah: '',
            total_harga: '',
            status: '',
            bank: '',
            va: '',
        },
        payment:{
            status_code:'',
            status_message: '',
            transaction_id: '',
            order_id: '',
            merchant_id: '',
            gross_amount: '',
            currency: '',
            payment_type: '',
            transaction_time: '',
            transaction_status: '',
            va_numbers: [{
                bank: '',
                va_number: ''
            }],
            fraud_status: ''
        },
    }),
    mounted(){
        this.load()
    },
    methods: {
        load(){
            axios.post(this.baseurl+"/akuns/"+this.$auth.user.email+"/email").then(resUser => {
                axios.get(this.baseurl+"/pesans/"+resUser.data.id+"/user/P/status").then(res => {
                    this.carts = res.data
                    window.console.log(res.data)
                }).catch ((err) => {
                    window.console.log(err);
                })
                window.console.log(resUser.data)
            }).catch ((err) => {
                window.console.log(err);
            })
        },
        bayar(kdbook, harga, userid, bank){
            axios.post(this.baseurl+"/mids/"+harga+"/harga/"+kdbook+"/book/"+userid+"/user/"+bank+"/bank").then(res => {
                this.payment = res.data
                window.console.log(res.data)
            }).catch ((err) => {
                window.console.log(err);
            })
        },
        konfirmasi(kdbook, userid, bank){
            axios.get(this.baseurl+"/mids/"+kdbook+"/book/status").then(res => {
              if(res.data.transaction_status=="settlement"){
                axios.post(this.baseurl+"/pesans/"+kdbook+"/booking/"+userid+"/user/"+bank+"/bank/"+this.payment.va_numbers[0].va_number+"/va/"+res.data.transaction_status).then(resCek => {
                    // this.payment = res.data
                    this.dialogbank = true
                    window.console.log(resCek.data)
                }).catch ((err) => {
                    window.console.log(err);
                })
              }else{
                this.dialog = true
              }
              window.console.log(res.data)
            }).catch ((err) => {
                window.console.log(err);
            })
        },
        cancelTrf(kdbook){
          axios.get(this.baseurl+"/mids/"+kdbook+"/book/cancel").then(res => {
              this.dialogcancel = true
              window.console.log(res.data)
            }).catch ((err) => {
                window.console.log(err);
            })
        },
        hapus(kdbook){
            axios.delete(this.baseurl+"/pesans/"+kdbook+"/del").then(res => {
                this.carts = []
                window.console.log(res.data)
            }).catch ((err) => {
                window.console.log(err);
            })
        },
    },
  }
</script>
