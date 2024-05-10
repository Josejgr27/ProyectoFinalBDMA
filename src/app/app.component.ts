import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrosService } from './registros.service';

declare var $;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent {
  title = 'ProyectoFinalBecas';


  navInicio = true;
  navBecas = false;
  navAlumnos = false;
  navMaterias = false;

  lEstudiantes = [];
  lBecas = [];
  lMaterias = [];

  constructor(private servProy: RegistrosService,
    private modalService: NgbModal,
  ) { }

  clickNav(name) {

    var NavArray = ['Inicio', 'Becas', 'Alumnos', 'Materias'];
    NavArray.forEach(element => {
      if (name == element) {
        this['nav' + element] = true;
        element != 'Inicio' ? this['get' + element]() : '';
      } else {
        this['nav' + element] = false;
      }
    });
  }




  getAlumnos() {
    var var_busqueda = [];

    this.servProy.GetEstudiantes(var_busqueda).subscribe((resp: any) => {
      this.lEstudiantes = resp.response;
    });
  }

  getMaterias() {
    var var_busqueda = [];

    this.servProy.GetMaterias(var_busqueda).subscribe((resp: any) => {
      this.lMaterias = resp.response;

    });
  }

  getBecas() {
    var var_busqueda = [];
    console.log('entro');

    this.servProy.GetBecas(var_busqueda).subscribe((resp: any) => {
      console.log(resp);

      this.lBecas = resp.response;

    });
  }


  clickVerRequisitos() {
    $("#modalReq").modal('show');
  }

  clickVerCalificaciones() {
    $("#modalCalif").modal('show');
  }

  clickVerBecas() {
    $("#modalBecas").modal('show');
  }

  clickVerAlumnos() {
    $("#modalAlum").modal('show');
  }
}




