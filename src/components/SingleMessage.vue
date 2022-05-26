<template>
  <v-row no-gutters class="mt-3">
    <v-col cols="12"  :class="{start: isMine(props.message.senderId), end: !isMine(props.message.senderId)}">
    <span class="message" :class="{myMessage: isMine(props.message.senderId), otherMessage: !isMine(props.message.senderId)}">{{props.message.message}}</span>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: 'SingleMessage',
  props: ['message'],
  setup(props) {
    const phoneNumber = localStorage.getItem("phoneNumber")
    const isMine = (localPhone) => {
      return phoneNumber === localPhone
    }
    return { props, isMine }
  }
})
</script>

<style  scoped>
.start {
  display: flex;
  justify-content: flex-start;
}

.end {
  display: flex;
  justify-content: flex-end;
}

.message {
  border-radius: 1.5rem;
  padding: 0.5rem 1rem;
  word-break: break-all;
  min-width: 75px;
}

.myMessage {
  background: #f1f1f1;
  color: black;
}

.otherMessage{
  background: #6200ee;
  color: white;
}
</style>