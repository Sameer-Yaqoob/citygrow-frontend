<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Enter the phone number of receiver
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="4" offset-md="4" cols="12">
        <div :class="{ error: v$.phoneNumber.$errors.length }">
          <v-text-field
              label="Enter Phone Number"
              variant="outlined"
              v-model="state.phoneNumber"
              autofocus
              density="compact"
              hide-details="auto"
              @keyup.enter="submit"
            >
            </v-text-field>
            <div class="input-errors" v-for="error of v$.phoneNumber.$errors" :key="error.$uid">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <v-btn
            color="primary"
            text
            block
            class="mt-4"
            @click="submit"
          >
            Submit
          </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent, reactive, inject } from "@vue/runtime-core"
import useVuelidate from "@vuelidate/core"
import { required } from '@vuelidate/validators'
import router from '@/router'
import 'firebase/firestore';

export default defineComponent({
  name: 'PhoneForm',
  setup(){
    const state = reactive({phoneNumber: ''})
    
    const rules = {
      phoneNumber: { required },
    }

    const v$ = useVuelidate(rules, state)

    const db = inject('db')

    const submit = async () => {
      if (v$.value.$invalid) {
        v$.value.$touch()
        return
      }

      localStorage.setItem("phoneNumber", state.phoneNumber)
      const doc = await db.collection("messages").doc(state.phoneNumber).get()
      if(!doc.exists){
        db.collection("messages").doc(state.phoneNumber)
          .set({ messages: [] })
          .then(() => {
            router.push('messages')
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      }
      else{
        router.push('messages')
      }
    }

    return { state, submit, v$ }
  }
})
</script>
