import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";

import { EmpleadoModel } from "../../models/empleado.model";
import { EmpleadosService } from "../../services/empleados.service";

import Swal from "sweetalert2";

@Component({
  selector: "app-empleado",
  templateUrl: "./empleado.component.html",
  styleUrls: ["./empleado.component.css"],
})
export class EmpleadoComponent implements OnInit {
  campoNombre: string = "";
  campoCorreo: string = "";
  campoPassword: string = "";

  constructor(
    private empleadosService: EmpleadosService,
    private route: ActivatedRoute
  ) {}

  agregarEmpleado() {
    this.empleadosService.crearEmpleado({
      nombre: this.campoNombre,
      correo: this.campoCorreo,
      password: this.campoPassword,
    });
  }

  ngOnInit() {
  
    //   const id = this.route.snapshot.paramMap.get("id");
    //   if (id !== "nuevo") {
    //     this.empleadosService.getEmpleado(id).subscribe((resp: EmpleadoModel) => {
    //       this.empleado = resp;
    //       this.empleado.id = id;
    //     });
    //   }
    // }
    // guardar(form: NgForm) {
    //   if (form.invalid) {
    //     console.log("Formulario no válido");
    //     return;
    //   }
    //   Swal.fire({
    //     title: "Espere",
    //     text: "Guardando información",
    //     type: "info",
    //     allowOutsideClick: false,
    //   });
    //   Swal.showLoading();
    //   let peticion: Observable<any>;
    //   if (this.empleado.id) {
    //     peticion = this.empleadosService.actualizarEmpleado(this.empleado);
    //   } else {
    //     peticion = this.empleadosService.crearEmpleado(this.empleado);
    //   }
    //   peticion.subscribe((resp) => {
    //     Swal.fire({
    //       title: this.empleado.nombre,
    //       text: "Se actualizó correctamente",
    //       type: "success",
    //     });
    //   });
  }
}
