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
  // async getLocation(){
  //  try {
  //    const API_KEY = 'AIzaSyA2mGO8I-qBhHz0y7qQupiuz0ZLSR2Pt8A';
  //     const data = await axios.get(
  //        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
  //        '18.4767221' +
  //        "," +
  //        '-69.79838219999999' +
  //        `&key=${API_KEY}`
  //     );
  //     if (data.error_message) {
  //        console.log(data.error_message)
  //     } else {
  //        console.log(data.results[0].formatted_address);
  //     }
  //  } catch (error) {
  //     console.log(error.message);
  //  }
  //  console.log('done')
  // },
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
