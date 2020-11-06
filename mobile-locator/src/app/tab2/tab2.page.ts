import { Component } from "@angular/core";
import { History } from "../shared/coords";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  constructor() {}
  storage = localStorage;
  locationHistory: History[] =
    JSON.parse(this.storage.getItem("history")) || [];

  refreshHistory() {
    this.locationHistory = JSON.parse(this.storage.getItem("history")) || [];
  }

  ngOnInit() {
    this.refreshHistory();
    setInterval(() => {
      this.refreshHistory();
    }, 60000);
  }
}
