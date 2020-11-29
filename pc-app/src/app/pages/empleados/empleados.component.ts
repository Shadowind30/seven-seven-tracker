import { Component, OnInit } from "@angular/core";
import { EmpleadosService } from "../../services/empleados.service";
import { EmpleadoModel } from "../../models/empleado.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-empleados",
  templateUrl: "./empleados.component.html",
  styleUrls: ["./empleados.component.css"],
})
export class EmpleadosComponent implements OnInit {
  empleados: EmpleadoModel[] = [];
  cargando = false;

  constructor(private empleadosService: EmpleadosService) {}

  ngOnInit() {
    this.cargando = true;
    this.empleadosService.getEmpleados().subscribe((resp) => {
      this.empleados = resp;
      this.cargando = false;
    });
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
