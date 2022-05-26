<template>
  <div class="pa-5 d-flex justify-space-between">
    <h1 >Messages</h1>
    <v-btn @click="changeNumber" color="primary">Change Number</v-btn>
  </div>
  <div class="mt-5 pa-5">
    <v-row>
      <v-col md="4" offset-md="4" cols="12">
        <single-message :message="message" v-for="message in state.messages" :key="message.id" />
        <div :class="{ error: v$.message.$errors.length }" class="mt-5">
          <v-text-field
              label="Enter Message"
              variant="outlined"
              v-model="state.message"
              density="compact"
              hide-details="auto"
              @keyup.enter="submit"
              autofocus
            >
            </v-text-field>
            <div class="input-errors" v-for="error of v$.message.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <v-btn
            color="primary"
            text
            block
            class="mt-4"
            @click="submit"
            :disabled="state.loading"
          >
            Send
          </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { defineComponent, inject, onMounted, reactive } from "vue";
import SingleMessage from "./SingleMessage.vue";
import { required } from '@vuelidate/validators'
import router from "@/router";
import qs from 'qs'
import axios from 'axios'
export default defineComponent({
  components: { SingleMessage },
  name: 'MessageList',
  setup() {
    const state = reactive(
      { 
        messages: [],
        message: '',
        loading: false
      }
    )

    const rules = {
      message: { required },
    }

    const phoneNumber = localStorage.getItem("phoneNumber")

    const v$ = useVuelidate(rules, state)
    const db = inject('db')

    onMounted(async () => {
      const snapshot = await db.collection("messages").doc(phoneNumber).get()
      db.collection("messages").doc(phoneNumber).onSnapshot((doc) => {
        state.messages = doc.data().messages
      })
      const data = snapshot.data();
      state.messages = data.messages
    })

    const submit = () => {
      if (v$.value.$invalid) {
        return
      }
      state.loading = true;
      axios({
        method: 'post',
        url: `${process.env.VUE_APP_API_URL}/send_message`,
        data: qs.stringify({to: phoneNumber, message: state.message}),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }).then(() => {
          state.message = ''
          state.loading= false;
      })
    }

    const changeNumber = () => {
      localStorage.removeItem("phoneNumber")
      router.push('/')
    }
    return { state, submit, v$, changeNumber }
  }
})
</script>