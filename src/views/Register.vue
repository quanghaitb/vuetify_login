<template>
<v-dialog v-model="showDialogRegister" @input="$root.$emit('SLIDE_SHOW_CLOSED')" max-width="700px" elevation="8">
  <v-row>
    <v-container>
      <v-card max-width="700px" class="ml-6">
        <v-col cols="12">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="30"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>

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
            <v-btn
              :disabled="!valid"
              color="#7CB342"
              class="mr-4"
              @click="register()"
            >
              Register
            </v-btn>

            <v-btn color="#FFEE58" @click="cancer">
              Cancer
            </v-btn>
          </v-form>
        </v-col>
      </v-card>
    </v-container>
  </v-row>
</v-dialog>
</template>
<script>
import firebase from 'firebase/app'
export default {
  data: () => ({
    showDialogRegister: true,
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v.length >= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    showSlideShow: false,
    show1: false,
    show2: false,
    password: '',
    passwordRules: [
      v => !!v || 'Required.',
      v => v.length >= 8 || 'Min 8 characters'
    ]
    // select: null,
    // items: ['Item 1', 'Item 2', 'Item 3'],
    // checkbox: false
  }),
  form: {
    name: '',
    email: '',
    password: ''
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    cancer () {
      this.showDialogRegister = null
      setTimeout(() => { this.showDialogRegister = true }, 1500)
    },
    register () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.form.name
            })
            .then(() => {
              alert('Create account success!')
            })
        })
        .catch(err => {
          this.error = err.message
        })
      this.$refs.form.reset()
    }
  }
}

</script>
