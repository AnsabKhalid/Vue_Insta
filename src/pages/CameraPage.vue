<template>
  <q-page class="constraint-camera q-pa-md">
    <div class="camera-frame q-pa-md">
      <video
        v-show="!imageCaptured"
        ref="video"
        class="full-width"
        autoplay
        playsinline
      />

      <canvas
        v-show="imageCaptured"
        ref="canvas"
        class="full-width"
        height="240"
      />
    </div>
    <div class="text-center q-pa-md">
      <q-btn
        v-if="hasCameraSupport"
        @click="captureImage"
        round
        color="grey-10"
        size="lg"
        icon="eva-camera"
      />

      <q-file
        v-else
        outlined
        v-model="imageUpload"
        @update:model-value="captureImageFile"
        accept="image/*"
        label="Choose an Image"
      >
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>

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
          :loading="locationLoading"
          label="Location"
          dense
        >
          <template v-slot:append>
            <q-btn
              v-if="!locationLoading && locationSupported"
              @click="getLocation"
              round
              dense
              flat
              icon="eva-navigation-2-outline"
            />
          </template>
        </q-input>
      </div>
      <div class="row justify-center q-mt-xl">
        <q-btn
          unelevated
          rounded
          color="primary"
          label="Post Image"
          @click="savePost"
        />
      </div>
    </div>

    <q-card
      v-for="post in posts"
      :key="post.id"
      class="card-post q-mb-md"
      flat
      bordered
    >
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/parallax2.jpg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">Bridge</q-item-label>
          <q-item-label caption>
            {{ post.location }}
          </q-item-label>
        </q-item-section>
        <q-btn
          round
          color="red"
          icon="eva-trash-2"
          @click="deletePost"
          style="float: right; margin-right: 10px;"
        ></q-btn>
        <q-btn
          round
          color="green"
          icon="eva-edit-2"
          style="float: right;"
          @click="editPostData(post)"
        ></q-btn>
      </q-item>

      <q-separator />

      <q-img :src="post.photo" class="post-image" />

      <q-card-section>
        <div>{{ post.caption }}</div>
        <div class="text-caption text-grey">{{ formatDate(post.date) }}</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { uid } from "quasar";
require("md-gum-polyfill");
import { defineComponent } from "vue";
import { date } from "quasar";

let postIdCounter = 0;

function generatePostId() {
  postIdCounter++;
  return postIdCounter;
}

export default defineComponent({
  name: "CameraPage",
  post_name: "posts",
  data() {
    return {
      post: {
        id: generatePostId(),
        caption: "",
        location: "",
        photo: null,
        date: Date.now(),
      },
      imageCaptured: false,
      imageUpload: [],
      hasCameraSupport: true,
      locationLoading: false,
      editPost: null,
    };
  },
  computed: {
    locationSupported() {
      if ("geolocation" in navigator) {
        return true;
      } else {
        return false;
      }
    },
    posts() {
      return JSON.parse(localStorage.getItem("posts")) || [];
    },
  },
  methods: {
    initCamera() {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          this.$refs.video.srcObject = stream;
        })
        .catch((error) => {
          this.hasCameraSupport = false;
        });
    },
    captureImage() {
      let video = this.$refs.video;
      let canvas = this.$refs.canvas;

      canvas.width = video.getBoundingClientRect().width;
      canvas.height = video.getBoundingClientRect().height;

      let context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      this.imageCaptured = true;
      this.post.photo = canvas.toDataURL();
      this.disableCamera();
    },
    captureImageFile(file) {
      console.log("file:", file);

      this.post.photo = file;

      let canvas = this.$refs.canvas;
      let context = canvas.getContext("2d");

      var reader = new FileReader();
      reader.onload = (event) => {
        var img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          this.imageCaptured = true;
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    disableCamera() {
      console.log("first");
      this.$refs.video.srcObject.getVideoTracks().forEach((track) => {
        track.stop();
      });
    },
    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(",")[1]);

      // separate out the mime component
      var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);

      // create a view into the buffer
      var ia = new Uint8Array(ab);

      // set the bytes of the buffer to the correct values
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      var blob = new Blob([ab], { type: mimeString });
      return blob;
    },
    getLocation() {
      this.locationLoading = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.getCityAndCountry(position);
        },
        (err) => {
          this.locationError();
        },
        {
          timeout: 7000,
        }
      );
    },
    getCityAndCountry(position) {
      let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`;
      this.$axios
        .get(apiUrl)
        .then((result) => {
          console.log("result: ", result);
          this.locationSuccess(result);
        })
        .catch((err) => {
          this.locationError();
        });
    },
    locationSuccess(result) {
      this.post.location = result.data.city;
      if (result.data.country) {
        this.post.location += `, ${result.data.country}`;
      }
      this.locationLoading = false;
    },
    locationError() {
      this.$q.dialog({
        title: "Error",
        message: "Could not find your location",
      });
      this.locationLoading = false;
    },
    savePost() {
      if (this.editPost) {
        let index = this.posts.findIndex(
          (post) => post.id === this.editPost.id
        );
        this.posts[index].caption = this.post.caption;
        this.posts[index].location = this.post.location;
        this.posts[index].photo = this.post.photo;
        localStorage.setItem("posts", JSON.stringify(this.posts));
        this.editPost = null;
      } else {
        this.post.id = generatePostId();
        this.posts.unshift(this.post);
        localStorage.setItem("posts", JSON.stringify(this.posts));

        window.location.reload();
      }
      this.post.caption = "";
      this.post.location = "";
      this.post.photo = null;
      this.imageCaptured = false;
      this.imageUpload = [];
      this.initCamera();
    },
    deletePost() {
      let posts = JSON.parse(localStorage.getItem("posts")) || [];
      const index = posts.findIndex((p) => p.id === this.post.id);
      if (index === -1) {
        console.error("Post not found in local storage:", this.post);
        return;
      }
      posts.splice(index, 1);
      localStorage.setItem("posts", JSON.stringify(posts));
      console.log("Post deleted from local storage:", this.post);

      window.location.reload();
    },
    formatDate(timestamp) {
      return date.formatDate(timestamp, "MMM D h:mmA");
    },
    editPostData(post) {
      this.editPost = post;
      this.post.caption = post.caption;
      this.post.location = post.location;
      this.post.photo = post.photo;
    },
  },
  mounted() {
    this.initCamera();
  },
  beforeRouteLeave() {
    if (this.hasCameraSupport) {
      this.disableCamera();
    }
  },
});
</script>

<style lang="scss">
.camera-frame {
  border: 2px solid $grey-10;
  border-radius: 14px;
}
</style>
