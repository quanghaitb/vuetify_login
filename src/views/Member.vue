<template>
    <div>
        <v-hover v-slot:default=" { hover } ">
            <v-card class="mx-auto" max-width="350" :elevation=" hover? 12:2 " @click="cardMember()">
                <v-img :src="`https://source.unsplash.com/350x200/?${memberItem.dept}`" _height="450px" contain></v-img>

                <v-card-title>
                {{ memberItem.name }}
                </v-card-title>

                <v-card-subtitle>
                {{ memberItem.dept }}
                </v-card-subtitle>
            </v-card>
        </v-hover>
    </div>
</template>
<script>
export default {
  name: 'Member',
  components: {

  },

  data: () => ({
    // showSlideShow: false
  }),

  props: ['memberItem'],
  methods: {
    cardMember () {
    //   this.showSlideShow = true
    }
  },

  created () {
    // console.log('ShowCase::created()')
    // this.$root.$on('SLIDE_SHOW_CLOSED', () => {
    //   this.showSlideShow = false
    // })
  }
}
</script>
