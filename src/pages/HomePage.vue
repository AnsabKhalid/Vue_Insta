<template>
  <q-page class="constraint q-pa-md">

    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <q-card v-for="post in posts" :key="post.id" class="card-post q-mb-md" flat bordered>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/parallax2.jpg">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-bold">Bridge</q-item-label>
              <q-item-label caption>
                {{ post.location }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-img :src="post.imageUrl" class="post-image" />

          <q-card-section>
            <div>{{ post.caption }}</div>
            <div class="text-caption text-grey">{{ formatDate(post.date) }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="55px">
              <img src="https://cdn.quasar.dev/img/parallax2.jpg">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">Bridge</q-item-label>
            <q-item-label caption>
              Location
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'

export default defineComponent({
  name: 'HomePage',
  data() {
    return {
      posts: [
        {
          id: 1,
          caption: 'Golden Gate Bridge',
          date: Date.now(),
          location: 'San Francisco, United States',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg'
        },
        {
          id: 2,
          caption: 'Eiffel Tower',
          date: Date.now(),
          location: 'Paris, France',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg'
        },
        {
          id: 3,
          caption: 'Sydney Opera House',
          date: Date.now(),
          location: 'Sydney, Australia',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg'
        },
        {
          id: 4,
          caption: 'Taj Mahal',
          date: Date.now(),
          location: 'Agra, India',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg'
        },
        {
          id: 5,
          caption: 'Great Wall of China',
          date: Date.now(),
          location: 'Beijing, China',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg'
        }
      ]
    }
  },
  methods: {
    formatDate(timestamp) {
      return date.formatDate(timestamp, 'MMM D h:mmA')
    }
  }
})
</script>

<style lang="scss">
.card-post .post-image {
  min-height: 200px;
}
</style>
