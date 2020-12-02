import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"],
})
export class HistoryComponent implements OnInit {
  empleado: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      console.log(
        "Extras -> ",
        this.router.getCurrentNavigation().extras.state
      );
      if (this.router.getCurrentNavigation().extras.state) {
        this.empleado = this.router.getCurrentNavigation().extras.state.empleado;
        console.log("Empleado -> ", this.empleado);
      }
    });
  }

  ngOnInit() {}
}
