<template>
  <v-simple-table v-if="$auth.isAuthenticated">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Kode Book</th>
          <th class="text-left">Paket</th>
          <th class="text-left">Tanggal</th>
          <th class="text-left">Jumlah</th>
          <th class="text-left">Total Harga</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pesans" :key="item.name">
          <td>{{ item.kd_book }}</td>
          <td>Paket {{ item.konten_id }}</td>
          <td>{{ item.tanggal }}</td>
          <td>{{ item.jumlah }}</td>
          <td>{{ item.total_harga }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import axios from 'axios'
  export default {
    data: () => ({
        baseurl: "https://www.travel.ykyj.xyz/api",
        pesans:{
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
    }),
    mounted(){
        this.load()
    },
    methods: {
        load(){
            axios.post(this.baseurl+"/akuns/"+this.$auth.user.email+"/email").then(resUser => {
                axios.get(this.baseurl+"/pesans/"+resUser.data.id+"/user/D/status/5/limit").then(res => {
                    this.pesans = res.data.data
                    window.console.log(res.data)
                }).catch ((err) => {
                    window.console.log(err);
                })
                window.console.log(resUser.data)
            }).catch ((err) => {
                window.console.log(err);
            })
        },
    }
  }
</script>