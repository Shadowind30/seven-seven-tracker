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
        <p>Ubicacion: {{ location }}</p>
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
    location: 'Cargando...',
    currentTime: 'Cargando...',
    formText: '',
    user: {}
  }),
  methods:{
    getTime() {
    const date = new Date();
    return date.toLocaleString();
  },

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
        return resolve(user);
        });
     })
    },

  async addEntry(coords, message = '') {
    const rawUser = await this.getUser();
    const user = rawUser.data()
    let currentHistory = [];
    if (user.history) {
      currentHistory = JSON.parse(user.history);
    }

    currentHistory.unshift({
        latitude: coords.latitude,
        longitude: coords.longitude,
        location: this.getLocation(),
        time: this.getTime(),
        message: message,
      })

    
    console.log(user)
    db.collection('users').doc(rawUser.id).update({
      nombre: user.nombre,
      correo: user.correo,
      id: user.id,
      history: JSON.stringify(currentHistory)
    });

    //localStorage.setItem('history', JSON.stringify(this.history))
  },
  getCoords() {
    let coords;
    return new Promise(resolve => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
            }
      console.info('Coords ->', coords)
      resolve(coords); 
      });
    }
    })
  },
  async getPosition() {
      const coords = await this.getCoords();
      this.latitude = coords.latitude;
      this.longitude = coords.longitude; 
      this.currentTime = this.getTime();
      this.location = await this.getLocation(coords);
      this.addEntry(coords); 
  },
  getLocation(coords){
    let location;
    const API_KEY = 'AIzaSyA2mGO8I-qBhHz0y7qQupiuz0ZLSR2Pt8A';
    return new Promise(resolve => {
    fetch(
         "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
         coords.latitude +
         "," +
         coords.longitude +
         `&key=${API_KEY}`
      ).then(response => response.json()).then(data => {
        console.log('The Location After Finsihed ->', data.results[0].formatted_address)
        location = data.results[0].formatted_address
        resolve(location);
        })
})
 },
  addMessage() {
    const currentCoords = {
      latitude: this.latitude,
      longitude: this.longitude,
      } 
    this.addEntry(currentCoords, this.formText)
    this.formText = ''
  },
},
  created(){
    this.getPosition();
    setInterval(this.getPosition, 300000);
    this.getUser();
    //setInterval(this.getUser, 5000);
    // fetch('http://worldtimeapi.org/api/timezone/America/Santo_Domingo')
    // .then(res => res.json())
    // .then(data => console.log(data.datetime))
  }
 }
</script>
