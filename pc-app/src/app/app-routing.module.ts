import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EmpleadosComponent } from "./pages/empleados/empleados.component";
import { EmpleadoComponent } from "./pages/empleado/empleado.component";
import { HistoryComponent } from "./pages/history/history.component";

const routes: Routes = [
  { path: "empleados", component: EmpleadosComponent },
  { path: "empleado/:id", component: EmpleadoComponent },
  { path: "historial", component: HistoryComponent },
  { path: "**", pathMatch: "full", redirectTo: "empleados" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
