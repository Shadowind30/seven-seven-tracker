import { Injectable } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { CoordsInterface } from '../shared/coords';

@Injectable({
  providedIn: "root",
})
export class GeolocationService {
  constructor(private geolocation: Geolocation) {}

  getPosition() {
    let data: Promise<CoordsInterface> = this.geolocation
      .getCurrentPosition()
      .then((resp) => {
       return  {
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude,
        };
      })
      .catch((error) => {
        console.log("Error getting location", error);
        return {
          latitude: 0,
          longitude: 0,
        }
      });
      
      return data;
  }

  // let watch = this.geolocation.watchPosition();
  // watch.subscribe((data) => {
  //  // data can be a set of coordinates, or an error (if an error occurred).
  //  // data.coords.latitude
  //  // data.coords.longitude
  // });
}
