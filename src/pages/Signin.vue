<template>
  <div class="q-pa-md constraint-signin" position="fixed-center">
    <div class="header">
      <q-toolbar-title class="text-grand-hotel text-bold">
        Vue Instagram
      </q-toolbar-title>
    </div>

    <div class="">
      <q-input
        class="text-box"
        outlined
        v-model="user_name"
        label="Username"
        placeholder="Username"
      />
    </div>
    <div class="">
      <q-input
        class="text-box"
        type="password"
        outlined
        v-model="password"
        label="Password"
        placeholder="Password"
      />
    </div>
    <div>
      <q-btn color="primary" label="Log in" />
    </div>
  </div>
  <div class="q-pa-md constraint-signin">
    <small>
      Don't Have an account? <a href="#"><strong>Sign up</strong></a>
    </small>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      email: ref(""),
      password: ref(""),
    };
  },
};
</script>
<style lang="scss">
.text-box {
  width: 300px;
}

.constraint-signin > div {
  margin: 1vh;
}
.constraint-signin div span {
  font-size: 3vh;
  text-align: center;
}
a,
u {
  text-decoration: none;
}
div > small {
  font-size: 2vh;
}
</style>
