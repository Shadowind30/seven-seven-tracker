import { Component, OnInit } from "@angular/core";
import { EmpleadosService } from "../../services/empleados.service";
import { EmpleadoModel } from "../../models/empleado.model";
import Swal from "sweetalert2";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-empleados",
  templateUrl: "./empleados.component.html",
  styleUrls: ["./empleados.component.css"],
})
export class EmpleadosComponent implements OnInit {
  constructor(
    private empleadosService: EmpleadosService,
    private router: Router
  ) {}

  empleados: EmpleadoModel[] = [];
  cargando = true;
  result: any;

  abrirHistorial(empleado: EmpleadoModel) {
    let navigationextras: NavigationExtras = {
      state: {
        empleado: empleado,
      },
    };

    this.router.navigate(["historial"], navigationextras);
  }

  async renderEmpleados() {
    this.empleados = await this.empleadosService.getEmpleados();
    this.cargando = false;
    console.log(this.cargando);
  }

  ngOnInit() {
    this.renderEmpleados();
    // this.cargando = true;
    // this.empleadosService.getEmpleados().subscribe((resp) => {
    //   this.empleados = resp;
    //   this.cargando = false;
    // });
  }

  borrarEmpleado(empleado: EmpleadoModel, i: number) {
    Swal.fire({
      title: "¿Está seguro?",
      text: `Está seguro que desea borrar a ${empleado.nombre}`,
      type: "question",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        this.empleados.splice(i, 1);
        this.empleadosService.borrarEmpleado(empleado.id).subscribe();
      }
    });
  }
}
