import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EmpleadoModel } from "../models/empleado.model";
import { map, delay } from "rxjs/operators";
import firebase from "firebase";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class EmpleadosService {
  firebaseApp: any = firebase.initializeApp(environment.firebaseConfig);
  auth: any = this.firebaseApp.auth();
  db: any = this.firebaseApp.firestore();

  private url = "https://crud-f7f04.firebaseio.com/";

  constructor(private http: HttpClient) {}

  // crearEmpleado(empleado: EmpleadoModel) {
  //   return this.http.post(`${this.url}/empleados.json`, empleado).pipe(
  //     map((resp: any) => {
  //       empleado.id = resp.name;
  //       return empleado;
  //     })
  //   );
  // }

  crearEmpleado(empleado: EmpleadoModel) {
    this.auth
      .createUserWithEmailAndPassword(empleado.correo, empleado.password)
      .then((user) => {
        if (user) {
          console.log("Created User->", user);
          user.user.sendEmailVerification();
          console.log("Verification Email sent");
          this.updateName(empleado.nombre);
          this.guardarEmpleado(empleado);
        }
      });
  }

  guardarEmpleado(empleado: any) {
    this.db.collection(`users/${this.auth.currentUser.uid}/datos`).add({
      nombre: empleado.nombre,
      correo: empleado.correo,
    });
  }

  getEmpleados() {
    let empleados = [];
    console.info("Started");
    this.db
      .collection(`users`)
      .get()
      .then((snapshot) => {
        console.log("Got Snapshot");
        return snapshot.docs.forEach((doc) => {
          const empleado = doc.data();
          empleados.unshift(empleado);
        });
      });
    console.log("Finished, Array: ->", empleados);
    return empleados;
  }
  updateName(name: string) {
    this.auth.currentUser
      .updateProfile({
        displayName: name,
      })
      .then(() => console.log("Updated username"));
  }

  actualizarEmpleado(empleado: EmpleadoModel) {
    const empleadoTemp = {
      ...empleado,
    };

    delete empleadoTemp.id;

    return this.http.put(
      `${this.url}/empleados/${empleado.id}.json`,
      empleadoTemp
    );
  }

  borrarEmpleado(id: string) {
    return this.http.delete(`${this.url}/empleados/${id}.json`);
  }

  /*
  getEmpleado(id: string) {
    return this.http.get(`${this.url}/empleados/${id}.json`);
  }
  
  getEmpleados() {
    return this.http
      .get(`${this.url}/empleados.json`)
      .pipe(map(this.crearArreglo), delay(0));
  }

  private crearArreglo(empleadosObj: object) {
    const empleados: EmpleadoModel[] = [];

    Object.keys(empleadosObj).forEach((key) => {
      const empleado: EmpleadoModel = empleadosObj[key];
      empleado.id = key;

      empleados.push(empleado);
    });

    return empleados;
  }*/
}
