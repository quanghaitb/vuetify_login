<template>
  <v-app>
    <v-app-bar app
      _absolute
      color="dark"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/900/300?random"
      fade-img-on-scroll
      scroll-target="#scrolling-target"
      scroll-threshold="500"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(65, 120, 163,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-avatar _size="48" class="mr-2">
        <img src="https://i1-dulich.vnecdn.net/2020/06/25/Best-Milky-Way-photos-of-the-year-1593071125.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=zCf9CiORVnX3hKJDXFKxNA">
      </v-avatar>
      <v-toolbar-title class="text-h6 text-sm-h5">Material Design Showcase</v-toolbar-title>

      <v-spacer/>
      <v-btn
      text
      @click="cardClickedLogin"
      dark>
        <v-icon>mdi-login-variant</v-icon>
        <span class="ml-2"> Login</span>
      </v-btn>
      <v-btn
      text
      @click="cardClickedRegister"
      dark>
        <v-icon>mdi-account-plus-outline</v-icon>
        <span class="ml-2"> Register</span>
      </v-btn>
    </v-app-bar>

    <v-main id="scrolling-target" class="grey lighten-4">
      <v-container fluid>
        <Login v-if="showLogin"/>
        <Register v-if="showRegister" />
        <router-link to="/new">Add</router-link>
      </v-container>
    </v-main>

    <v-footer app class="grey darken-3 white--text">
      <div class="ml-3 text-caption text-sm-body-2">
          Made with <v-icon class="red--text" style="vertical-align: middle;" _large>mdi-heart-outline</v-icon>
          by <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
          and <a class="white--text" href="https://github.com/hoangtuan151" target="_blank">Author</a>
      </div>
      <v-spacer/>
      <div class="mr-3 hidden-xs-only">
          Copyright &copy; 2020
      </div>
    </v-footer>

  </v-app>
</template>

<script>
import Login from '@/views/Login'
import Register from '@/views/Register'

export default {
  name: 'AboutPage',
  components: {
    Login,
    Register
  },

  data: () => ({
    showLogin: false,
    showRegister: false
  }),

  async created () {
    setTimeout(() => {
      this.skeletonLoading = false
    }, 1500)
    console.log('Login::created()')
    this.$root.$on('SLIDE_SHOW_CLOSED', () => {
      this.showLogin = false
    })
    console.log('Register::created()')
    this.$root.$on('SLIDE_SHOW_CLOSED', () => {
      this.showRegister = false
    })
  },
  methods: {
    cardClickedLogin () {
      this.showLogin = true
    },
    cardClickedRegister () {
      this.showRegister = true
    }
  }

}
</script>
