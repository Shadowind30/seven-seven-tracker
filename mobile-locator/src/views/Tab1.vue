<template>
  <ion-page>
    <ion-header translucent="true">
      <ion-toolbar>
        <ion-title> Inicio </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen="true">
      <ion-title>Ubicacion Actual</ion-title>
      <!-- <ion-title>Cargando...</ion-title> -->
      <div class="coords">
        <p>Latitud: {{ latitude }}</p>
        <p>Longitud: {{ longitude }}</p>
        <p>Actualizado: {{ currentTime }}</p>
        <ion-button
          :disabled="latitude === 'Cargando...'"
          :href="`https://www.google.com/maps/search/${latitude},${longitude}`"
          target="_blank"
          color="secondary"
        >
          Ver en el mapa
        </ion-button>
      </div>
      <div>
        <input
          v-model="formText"
          name="message"
          id="message"
          placeholder="Escribir un mensaje..."
        />
        <ion-button :disabled="formText.length <= 3" @click="addMessage"
          >Enviar</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

import {db, auth} from '../firebase'

export default  {
  name: 'Tab1',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data: () => ({
    latitude: 'Cargando...',
    longitude: 'Cargando...',
    currentTime: 'Cargando...',
    history: JSON.parse(localStorage.getItem('history')) || [],
    formText: '',
  }),
  methods:{
    getTime() {
    const date = new Date();
    return date.toLocaleString();
  },

  addEntry(coords) {
    db.collection(`users/${auth.currentUser.uid}/history`).add({
    latitude: coords.latitude,
    longitude: coords.longitude,
    time: this.getTime(),
    message: this.formText,
    });

    //localStorage.setItem('history', JSON.stringify(this.history))
  },
  getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.currentTime = this.getTime();
      this.addEntry(position.coords)
    });
    }
  },
  addMessage() {
    const currentCoords = {
      latitude: this.latitude,
      longitude: this.longitude,
      } 
    this.addEntry(currentCoords)
    this.formText = ''
  }
  },
  created(){
    this.getPosition();
    setInterval(this.getPosition, 300000);
    fetch('http://worldtimeapi.org/api/timezone/America/Santo_Domingo')
    .then(res => res.json())
    .then(data => console.log(data.datetime))
  },
}
</script>
