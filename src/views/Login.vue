<template>
  <v-dialog
    v-model="showDialogLogin"
    @input="$root.$emit('SLIDE_SHOW_CLOSED')"
    max-width="650px"
  >
    <v-row>
      <v-col cols="12">
        <v-card max-width="650px" elevation="8" class="ml-6">
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="input password"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>

              <!-- <v-select
              v-model="select"
              :items="items"
              :rules="[v => !!v || 'Item is required']"
              label="Item"
              required
            ></v-select> -->

              <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'Mark if you want to continue!']"
                label="Are you Human?"
                required
              ></v-checkbox>

              <v-btn
                :disabled="!valid"
                color="#7CB342"
                class="mr-4"
                @click="login()"
              >
                Login
              </v-btn>

              <v-btn color="#FFEE58" @click="cancer">
                Cancer
              </v-btn>
            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-dialog>
</template>
<script>
import firebase from 'firebase/app'
export default {
  data: () => ({
    showDialogLogin: true,
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Required.',
      v => v.length >= 8 || 'Min 8 characters'
    ],
    showSlideShow: false,
    show1: false,
    show2: false
    // select: null,
    // items: ['Item 1', 'Item 2', 'Item 3'],
    // checkbox: false
  }),
  form: {
    name: '',
    email: '',
    password: '',
    error: ''
  },
  components: {
  },
  methods: {
    checkbox () {

    },
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    cancer () {
      this.showDialogLogin = null
      setTimeout(() => { this.showDialogLogin = true }, 1500)
    },
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          console.log(user)
          this.$router.push({ name: 'Dashboard' })
        })
        .catch(error => {
          alert(error)
        })
    }

  }
}
</script>
