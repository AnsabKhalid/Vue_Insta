<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="constraint">
        <q-btn
          flat
          round
          to="/camera"
          class="large-screen-only q-mr-sm"
          icon="eva-camera-outline"
          dense
        />

        <q-btn
          flat
          round
          to="/"
          class="large-screen-only"
          icon="eva-home-outline"
          dense
        />
        <q-separator vertical spaced />
        <q-toolbar-title class="text-grand-hotel text-bold display-inline">
          <i
            class="fa fa-instagram"
            style="font-size: 25px; color: #ff0066; padding-right: 20px;"
          ></i>
          Vue-Insta App
        </q-toolbar-title>
        <q-separator vertical spaced />
        <div class="q-pa-md">
          <q-btn-dropdown flat text-color="black" color="white" label="Jamil">
            <q-list>
              <q-item
                v-if="user == 1"
                to="/signin"
                clickable
                v-close-popup
                @click="onItemClick"
              >
                <q-item-section>
                  <q-item-label>Signin</q-item-label>
                </q-item-section>
              </q-item>

              <q-item to="/signup" clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Signup</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Profile Settings</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-footer reveal class="bg-white small-screen-only" bordered>
      <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent"
      >
        <q-route-tab to="/" icon="eva-home-outline" />
        <q-route-tab to="/camera" icon="eva-camera-outline" />
      </q-tabs>
    </q-footer>

    <q-page-container class="bg-white">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

const linksList = [];

export default defineComponent({
  name: "MainLayout",
  data() {
    return {
      user: 1,
    };
  },
});
</script>

<style lang="scss">
.q-toolbar {
  @media (min-width: $breakpoint-sm-min) {
    height: 50px;
  }
}

.q-footer .q-tab__icon {
  font-size: 35px;
}

.q-toolbar__title {
  font-size: 25px;

  @media (max-width: $breakpoint-xs-max) {
    text-align: center;
  }
}
</style>
