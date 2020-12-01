<template>
  <ion-page>
    <ion-header translucent="true">
      <ion-toolbar>
        <ion-label>
          <ion-title> Mi historial </ion-title>
          <ion-button @click="getHistory()">
            Refrescar
            <ion-icon :icon="refreshCircleOutline"></ion-icon>
          </ion-button>
        </ion-label>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen="true">
      <ion-card v-for="(entry, index) in history" v-bind:key="index">
        <ion-item>
          <ion-label v-if="entry.message">
            <ion-icon :icon="chatboxEllipsesOutline" />
            <h3>Mensaje</h3>
            <p>{{ entry.message }}</p>
          </ion-label>
          <ion-label v-if="!entry.message">
            <ion-icon :icon="locationOutline" />
            <h3>Ubicacion</h3>
          </ion-label>
        </ion-item>

        <ion-card-content>
          <p>Posicion: ({{ entry.latitude }},{{ entry.longitude }})</p>
          <p>Fecha: {{ entry.time }}</p>
          <ion-button
            :href="`https://www.google.com/maps/search/${entry.latitude},${entry.longitude}`"
            target="_blank"
          >
            Ver en el mapa
          </ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
} from "@ionic/vue";

import { chatboxEllipsesOutline, locationOutline, refreshCircleOutline } from "ionicons/icons";
import {db, auth} from '../firebase';
export default {
  name: "Tab2",
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonIcon },
  setup() {
    return { chatboxEllipsesOutline, locationOutline, refreshCircleOutline };
  },
  data: () => ({
    user: {},
    history:  [],
  }),
  methods: {
    getUser(){
     return new Promise( (resolve) => { let user = {};
      db.collection("users")
        .get()
        .then((snapshot) => {
            user = snapshot.docs.find((doc) => {
            const u = doc.data();
            if(u.id === auth.currentUser.uid) return true;
          });
        console.log('Matched User -> ', user.data());
        return resolve(user.data());
        });
     })
    },

    async getHistory() {
      const user = await this.getUser();
      this.history = JSON.parse(user.history) || [];
    }
  },
  created(){
    this.getHistory()
    //setInterval(this.getHistory, 1000);
  }
};
</script>
