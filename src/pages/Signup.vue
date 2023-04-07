<template>
  <div class="q-pa-md constraint-signup" position="fixed-center">
    <div class="header">
      <q-toolbar-title class="text-grand-hotel text-bold">
        Vue Instagram
      </q-toolbar-title>
    </div>
    <div class="text-center">
      <span>Sign up to see photos and videos from your friends.</span>
    </div>
    <div>
      <q-btn color="primary" icon="eva-facebook" label="Log in with Facebook" />
    </div>
    <div>
      <hr />
    </div>
    <div class="">
      <q-input
        class="text-box"
        outlined
        v-model="mobile_number"
        label="Mobile Number or email"
        placeholder="Mobile Number or email"
      />
    </div>
    <div class="">
      <q-input
        class="text-box"
        outlined
        v-model="full_name"
        label="Full Name"
        placeholder="Full Name"
      />
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
      <q-btn color="secondary" label="Sign up" />
    </div>
  </div>
  <div class="q-pa-md constraint-signup">
    <small>
      Have an account? <a href="#"><strong>Log in</strong></a>
    </small>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      text: ref(""),
      mobile_number: ref(""),
      full_name: ref(""),
      user_name: ref(""),
      password: ref(""),
      dense: ref(false),
    };
  },
};
</script>
<style lang="scss">
.text-box {
  width: 300px;
}

.constraint-signup > div {
  margin: 1vh;
}
.constraint-signup div span {
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
