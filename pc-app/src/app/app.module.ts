import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { EmpleadoComponent } from "./pages/empleado/empleado.component";
import { EmpleadosComponent } from "./pages/empleados/empleados.component";
import { HistoryComponent } from './pages/history/history.component';

@NgModule({
  declarations: [AppComponent, EmpleadoComponent, EmpleadosComponent, HistoryComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
