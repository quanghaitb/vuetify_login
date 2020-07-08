<template>
  <v-dialog
    v-model="showDialogCreateMember"
    @input="$root.$emit('SLIDE_SHOW_CLOSED')"
    max-width="650px"
  >
    <v-row>
      <v-col cols="12">
        <v-card max-width="650px" elevation="8" class="ml-6">
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="saveMember">
                <v-text-field
                v-model="member_id"
                :rules="member_idRules"
                name=""
                label="Input Member Id"
              ></v-text-field>
              <v-text-field
                v-model="name"
                :rules="nameRules"
                name=""
                label="Input Name"
              ></v-text-field>
              <v-text-field
                v-model="dept"
                :rules="deptRules"
                name=""
                label="Input dept"
              ></v-text-field>
              <v-text-field
                v-model="position"
                :rules="positionRules"
                name="input-10-1"
                label="Input position"
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
                type="submit"
              >
                Submit
              </v-btn>

              <v-btn color="#FFEE58" @click="cancer">
                Cancer
              </v-btn>
              <v-alert v-if="check">Added in Firebase </v-alert>
            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-dialog>
</template>
<script>
import db from '../firebaseApp'
export default {
  data: () => ({
    showDialogCreateMember: true,
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required'
    ],
    dept: '',
    deptRules: [
      v => !!v || 'Required.'
    ],
    position: '',
    positionRules: [
      v => !!v || 'Required.'
    ]
  }),
  form: {
    member_id: '',
    name: '',
    dept: '',
    position: ''
  },
  components: {
  },
  methods: {
    checkbox () {

    },
    cancer () {
      this.showDialogCreateMember = null
      setTimeout(() => { this.showDialogCreateMember = true }, 1500)
    },
    saveMember () {
      db.collection('members').add({
        member_id: this.member_id,
        name: this.name,
        dept: this.dept,
        position: this.position
        // alert('Added in Firebase')
      })
        .then(docRef => this.$router.push('/dashboard'))
    }
  }
}
</script>
