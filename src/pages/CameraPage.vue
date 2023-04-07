<template>
  <q-page class="constraint-camera q-pa-md">
    <div class="camera-frame q-pa-md">
      <video ref="video" class="full-width" autoplay playsinline />
    </div>
    <div class="text-center q-pa-md">
      <q-btn round color="grey-10" size="lg" icon="eva-camera" />

      <div class="row justify-center q-ma-md">
        <q-input
          class="col col-sm-8"
          v-model="post.caption"
          label="Caption"
          dense
        />
      </div>
      <div class="row justify-center q-ma-md">
        <q-input
          class="col col-sm-8"
          v-model="post.location"
          label="Location"
          dense
        >
          <template v-slot:append>
            <q-btn round dense flat icon="eva-navigation-2-outline" />
          </template>
        </q-input>
      </div>
      <div class="row justify-center q-mt-xl">
        <q-btn unelevated rounded color="primary" label="Post Image" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { uid } from "quasar";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CameraPage",
  data() {
    return {
      post: {
        id: uid(),
        caption: "",
        location: "",
        photo: null,
        date: Date.now(),
      },
    };
  },
  methods: {
    initCamera() {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          this.$refs.video.srcObject = stream;
        });
    },
  },
  mounted() {
    this.initCamera();
  },
});
</script>

<style lang="scss">
.camera-frame {
  border: 2px solid $grey-10;
  border-radius: 14px;
}
</style>
