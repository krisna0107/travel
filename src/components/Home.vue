<template>
    <div>
      <v-carousel hide-delimiters :show-arrows="false" cycle height="400">
          <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" reverse-transition="fade-transition" transition="fade-transition" style="height:100%;width:auto;"></v-carousel-item>
      </v-carousel>
      <div id="quote">
        <h1><p>Jelajah Belitung</p></h1>
        <p>Belitung, atau Belitong, dulunya dikenal sebagai Billiton adalah sebuah pulau di lepas pantai timur Sumatra, Indonesia, diapit oleh Selat Gaspar dan Selat Karimata.</p>
        <p>Mari berlibur bersama kami.</p>
      </div>
      <Paket />
    </div>
</template>

<script>
import Paket from '@/components/Paket'
  export default {
    components:{Paket},
    data () {
      return {
        dialog: false,
        items: [
          {
            src: 'https://www.travel.ykyj.xyz/img/h1.jpg',
          },
          {
            src: 'https://www.travel.ykyj.xyz/img/h2.jpg',
          },
          {
            src: 'https://www.travel.ykyj.xyz/img/h3.jpeg',
          },
          {
            src: 'https://www.travel.ykyj.xyz/img/Danau-Kaolin.jpg',
          },
          {
            src: 'https://www.travel.ykyj.xyz/img/Museum-Kata.jpg',
          },
          {
            src: 'https://www.travel.ykyj.xyz/img/Pantai-Tanjung-Kelayang.jpg',
          },
          {
            src: 'https://www.travel.ykyj.xyz/img/Pulau-Lengkuas.jpg',
          },
          {
            src: 'https://www.travel.ykyj.xyz/img/Pulau-Pasir.jpg',
          },
        ],
        navs: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' },
        ],
      }
    },
  }
</script>
