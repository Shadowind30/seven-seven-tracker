<template>
  <ion-page>
    <ion-header translucent="true">
      <ion-toolbar>
        <ion-title> Cuenta </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar v-if="!isLoggedIn">
          <ion-title size="large">Acceder</ion-title>
        </ion-toolbar>
        <ion-toolbar v-if="isLoggedIn">
          <ion-title size="large">Usuario 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="login-form" v-if="!isLoggedIn">
        <ion-item>
          <ion-label position="floating">Correo</ion-label>
          <ion-input type="email" v-model="emailField"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Contraseña</ion-label>
          <ion-input type="password" v-model="passwordField"></ion-input>
        </ion-item>
        <ion-button
          :disabled="!emailField || passwordField.length < 8"
          @click="login()"
          >Entrar</ion-button
        >
      </div>
      <!-- <div class="register-form" v-if="!isLoggedIn">
        <ion-item>
          <ion-label position="floating">Nombre</ion-label>
          <ion-input type="text" v-model="nameField"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Correo</ion-label>
          <ion-input type="email" v-model="emailField"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Contraseña</ion-label>
          <ion-input type="password" v-model="passwordField"></ion-input>
        </ion-item>
        <ion-button
          :disabled="!emailField || !nameField || passwordField.length < 8"
          @click="register()"
          >Crear Cuenta</ion-button
        >
      </div> -->
      <div v-if="isLoggedIn">
        <p v-if="!user.emailVerified">
          Su correo no ha sido verificado, antes de usar la aplicacion necesita
          verificarse
        </p>
        <ion-title>{{ user.displayName }}</ion-title>
        <h3>{{ user.email }}</h3>
        <ion-button @click="signOut()">Salir</ion-button>
      </div>
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
  IonInput,
  IonLabel,
  IonItem,
} from "@ionic/vue";

import {auth} from '../firebase'
export default {
  name: "Tab3",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonInput,
    IonLabel,
    IonItem,
  },

  data: () => ({
    nameField: "",
    emailField: "",
    passwordField: "",
    isLoggedIn: false,
    user: {}
  }),

  methods: {
    login() {
      auth.signInWithEmailAndPassword(this.emailField, this.passwordField);
      this.emailField = "";
      this.passwordField = "";
    },
    register() {
      auth.createUserWithEmailAndPassword(this.emailField, this.passwordField)
      .then((user) => {
        if (user) {
        console.log('Created User->', user)
        this.user = user;
        this.isLoggedIn = true;
        user.user.sendEmailVerification();
        console.log('Verification Email sent');
        this.updateName();
        }
      });
      this.emailField = "";
      this.passwordField = "";
    },
    updateName() {
      auth.currentUser.updateProfile({
          displayName: this.nameField
        }).then(() => console.log('Updated username'));
     this.nameField = "";
    },
    checkAuthStatus() {
      auth.onAuthStateChanged((user) => {
        if (user) {
       console.log('Logged User ->', user)
        this.user = user;
        this.isLoggedIn = true;
        } else {
          console.log('No user is signed in')
        }
      });
    },
    signOut() {
      auth.signOut().then(() => {
        alert('Se ha cerrado la sesion...');
        this.isLoggedIn = false;
        this.user = {};
      }).catch((error) => {
        console.error(error);
      });
    }
  },
  created() {
    this.checkAuthStatus()
    //setInterval(this.checkAuthStatus, 10000);
  }
};
</script>