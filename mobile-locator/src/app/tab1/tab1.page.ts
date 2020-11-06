import { Component } from "@angular/core";
import { Coords, History } from "../shared/coords";
import { GeolocationService } from "../services/geolocation.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  constructor(private location: GeolocationService) {}

  currentLocation: Coords;
  currentTime: string;
  storage = localStorage;
  locations: History[] = JSON.parse(this.storage.getItem("history")) || [];
  saveInterval: number = 60000;
  messageField: string = "";

  sendMessage() {
    this.saveHistory(this.messageField);
    this.messageField = "";
  }
  getTime() {
    let date = new Date();
    return date.toLocaleString();
  }

  saveHistory(newMessage?: string) {
    this.locations.unshift({
      location: this.currentLocation,
      time: this.getTime(),
      message: newMessage || "",
    });
    this.storage.setItem("history", JSON.stringify(this.locations));
  }

  updateCoords() {
    this.location.getPosition().then((res) => {
      this.currentLocation = res;
      this.currentTime = this.getTime();
      console.log(this.currentLocation);
      this.saveHistory();
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.updateCoords();
    }, 5000);

    setInterval(() => {
      this.updateCoords();
    }, this.saveInterval);
  }
}
