import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab1Page } from "./tab1.page";
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";
import { Tab1PageRoutingModule } from "./tab1-routing.module";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { GeolocationService } from "../services/geolocation.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { environment } from "src/environments/environment";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  declarations: [Tab1Page],
  providers: [Geolocation, GeolocationService],
})
export class Tab1PageModule {}
