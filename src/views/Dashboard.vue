<template>
  <v-app>
    <v-app-bar
      app
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
        <img
          src="https://i1-dulich.vnecdn.net/2020/06/25/Best-Milky-Way-photos-of-the-year-1593071125.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=zCf9CiORVnX3hKJDXFKxNA"
        />
      </v-avatar>
      <v-toolbar-title class="text-h6 text-sm-h5"
        >Material Design Showcase</v-toolbar-title
      >
      <v-spacer />
      <v-btn text @click="cardClickedLogout" dark>
        <v-icon>mdi-login-variant</v-icon>
        <span class="ml-2"> Logout</span>
      </v-btn>
    </v-app-bar>
    <v-main id="scrolling-target" class="grey lighten-4">
      <v-container fluid>
        <v-row>
          <v-col
            v-for="n in members.length"
            v-bind:key="n"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-skeleton-loader
              :loading="skeletonLoading"
              transition="scale-transition"
              class="mx-auto"
              max-width="300"
              type="card"
            >
              <Member :memberItem="members[n - 1]" />
            </v-skeleton-loader>
          </v-col>
        </v-row>
        <v-btn
        text style="float: right;"
        @click="clickDialogCreate">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
        <New v-if="showDialogAdd" />
        <!-- <v-layout justify-center="true">
          <v-dialog v-model="showDialogConfirm" persistent max-width="300">
            <v-card>
              <v-card-title
                class="error headline"
                style="font-weight: bold; color: white;"
                >Confirm Logout</v-card-title
              >
              <v-card-text>Are you sure want to logout?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="clickDialogLogout = false">No</v-btn>
                <v-btn color="error" flat @click="clickDialogLogout">Yes</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout> -->
      </v-container>
    </v-main>
    <v-footer app class="grey darken-3 white--text">
      <div class="ml-3 text-caption text-sm-body-2">
        Made with
        <v-icon class="red--text" style="vertical-align: middle;" _large
          >mdi-heart-outline</v-icon
        >
        by
        <a class="white--text" href="https://vuetifyjs.com" target="_blank"
          >Vuetify</a
        >
        and
        <a
          class="white--text"
          href="https://github.com/hoangtuan151"
          target="_blank"
          >Author</a
        >
      </div>
      <v-spacer />
      <div class="mr-3 hidden-xs-only">
        Copyright &copy; 2020
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import db from '../firebaseApp'
import firebase from 'firebase/app'
import Member from './Member'
import New from './CreateNewMember'
export default {
  name: 'Dashboard',
  components: {
    Member,
    New
  },

  data () {
    return {
      skeletonLoading: true,
      showDialogConfirm: false,
      showDialogAdd: false,
      members: []
    }
  },

  created () {
    setTimeout(() => {
      this.skeletonLoading = false
    }, 1500)
    db.collection('members').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          id: doc.id,
          member_id: doc.data().member_id,
          name: doc.data().name,
          dept: doc.data().dept,
          position: doc.data().position
        }
        this.members.push(data)
      })
    })
    console.log('showDialogConfirm::created()')
    this.$root.$on('SLIDE_SHOW_CLOSED', () => {
      this.showDialogConfirm = false
    })
    console.log('New::created()')
    this.$root.$on('SLIDE_SHOW_CLOSED', () => {
      this.showDialogAdd = false
    })
  },
  methods: {
    cardClickedLogout () {
      this.$confirm(
        {
          message: 'Are you sure?',
          button: {
            no: 'No',
            yes: 'Yes'
          },
          callback: confirm => {
            if (confirm) {
              firebase.auth().signOut().then(() => {
                this.$router.push({ name: 'AboutPage' })
                this.$confirm.close()
              })
            }
            this.$router.push({ name: 'Dashboard' })
          }
        }
      )
    },
    clickDialogCreate () {
      this.showDialogAdd = true
    }
  }

}
</script>
