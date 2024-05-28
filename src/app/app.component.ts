import Swal from 'sweetalert2';
import { Component } from '@angular/core';
/* import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'; */
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrosService } from './registros.service';
import { Beca } from './models/Beca';
import { Alumno } from './models/Alumno';
import { Materia } from './models/Materia';
import { DatePipe } from '@angular/common';
import { Requisto } from './models/Req';
import { BecReq } from './models/BecReq';
import { EstMat } from './models/EstMat';



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
  navRequisitosP = false;

  lEstudiantes = [];
  lBecas = [];
  lMaterias = [];
  lRequisitosP = [];
  lRequisitos = [];
  lCalificaciones = [];
  lBecasEst = [];

  Becca = new Beca();
  Alummno = new Alumno();
  Matteria = new Materia();
  Reqquisito = new Requisto();
  /* relaciones */
  BeccReqq = new BecReq();
  EsttMatt = new EstMat();

  todayDate = new Date();

  MateriaActiva = 0;
  BecaActiva = 0;
  EstudianteActivo = 0;



  constructor(private servProy: RegistrosService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    console.log('entro0');
    this.getAlumnos();
    this.getBecas();
    this.getMaterias();
    this.getRequisitosP();
  }

  clickNav(name) {

    var NavArray = ['Inicio', 'Becas', 'Alumnos', 'Materias', 'RequisitosP'];
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
    var var_busqueda = {};
    this.servProy.GetEstudiantes(var_busqueda).subscribe((resp: any) => {
      this.lEstudiantes = resp.response;
    });
  }

  getMaterias() {
    var var_busqueda = {};
    this.servProy.GetMaterias(var_busqueda).subscribe((resp: any) => {
      this.lMaterias = resp.response;
    });
  }

  getBecas() {
    var var_busqueda = {};
    this.servProy.GetBecas(var_busqueda).subscribe((resp: any) => {
      this.lBecas = resp.response;
    });
  }

  getRequisitos(id, id2) {
    var var_busqueda = {
      id: id2,
      id_beca: id
    };

    this.servProy.GetRequisitos(var_busqueda).subscribe((resp: any) => {
      if (id2) {
        this.BeccReqq = resp.response[0];
        console.log('resp.', this.BeccReqq);

      } else {
        this.lRequisitos = resp.response;
      }
    });
  }

  getRequisitosP() {
    var var_busqueda = {};

    this.servProy.GetRequisitosP(var_busqueda).subscribe((resp: any) => {
      console.log('resp.', resp.response);

      this.lRequisitosP = resp.response;
    });
  }

  getCalificaciones(est, mat, ida) {
    var var_busqueda = {
      id: ida || '',
      id_estudiante: est || '',
      id_materia: mat || '',
    };

    if (est) {
      this.EstudianteActivo = est;
    }
    this.servProy.GetCalificaciones(var_busqueda).subscribe((resp: any) => {
      if (ida) {
        this.EsttMatt = resp.response[0];
      } else {
        this.lCalificaciones = resp.response;
      }
    });
  }

  getBecasEST(est, bec) {
    var var_busqueda = {
      id_estudiante: est,
      id_beca: bec,
    };

    this.servProy.GetBecasEst(var_busqueda).subscribe((resp: any) => {
      this.lBecasEst = resp.response;
    });
  }


  clickVerRequisitos(id) {
    this.getRequisitos(id, '');
    $("#modalReq").modal('show');
  }

  clickVerRequisitosP(id) {
    this.getRequisitos(id, '');
    this.BecaActiva = id;
    $("#modalReq").modal('show');
  }

  clickVerCalificaciones(est, mat) {
    this.getCalificaciones(est, mat, '');
    $("#modalCalif").modal('show');
  }

  clickVerBecas(est, bec) {
    this.getBecasEST(est, bec);
    $("#modalBecas").modal('show');
  }

  clickVerAlumnos(est, mat) {
    this.getCalificaciones(est, mat, '');
    $("#modalAlum").modal('show');
  }

  // crear modificar beca
  addBeca() {
    this.Becca = new Beca()
    $("#modalNuevaBeca").modal('show');
  }

  editBeca(beca) {
    this.Becca = { ...beca };
    console.log('bec', this.Becca);

    $("#modalNuevaBeca").modal('show');
  }

  sendBeca() {
    if (!this.Becca.duracion || !this.Becca.monto || !this.Becca.tipo) {
      Swal.fire(
        "Atencion",
        `Favor de llenar todos los campos requeridos <i class="fa fa-asterisk" style="color:red"></i>`,
        "warning"
      );
    } else {
      Swal.fire({
        title: "¡Atención!",
        html: this.Becca.id ? `¿Estás seguro de modificar esta beca?` : `¿Estás seguro de crear una nueva beca?`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#0D6EFD",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
      }).then((result) => {
        if (result.value) {
          this.servProy.newBeca(this.Becca).subscribe((resp: any) => {
            if (resp.status == 200) {

              const index = this.lBecas.findIndex(beca => beca.id === resp.response.id);
              if (index !== -1) {
                this.lBecas[index] = resp.response;
              } else {
                this.lBecas.push(resp.response);
              }
              $("#modalNuevaBeca").modal('hide');

              Swal.fire(
                "Atencion",
                `Su beca ha sido registrada con exito`,
                "success"
              );
              this.Becca = new Beca();

            } else {
              Swal.fire(
                "Atencion",
                `Algo salio mal al registrar la beca`,
                "error"
              );
            }
          });
        }
      });
    }
  }

  DeleteBeca(item) {
    if (item.boolEst == 'SI') {
      Swal.fire(
        "¡Atencion!",
        `Imposible eliminar esta beca, activa en estudiante`,
        "warning"
      );
    } else {
      Swal.fire({
        title: "¡Atención!",
        html: `¿Estás seguro de eliminar la beca?`, // agregar tx
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#0D6EFD",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
      }).then((result) => {
        if (result.value) {
          this.servProy.deleteBeca(item.id).subscribe((resp: any) => {
            if (resp.status == 200) {
              const index = this.lBecas.findIndex(est => est.id === item.id);
              this.lBecas.splice(index, 1);

              Swal.fire(
                "Atencion",
                `Su beca ha sido eliminada con exito`,
                "success"
              );

            } else {
              Swal.fire(
                "Atencion",
                `Algo salio mal al eliminar la beca`,
                "error"
              );
            }
          });
        }
      });
    }

  }

  // crear modificar alumnos
  addAlummno() {
    this.Alummno = new Alumno()
    $("#modalNuevoAlumno").modal('show');
  }

  editAlummno(est) {
    this.Alummno = { ...est };
    $("#modalNuevoAlumno").modal('show');
  }

  sendAlumno() {
    if (!this.Alummno.nombre || !this.Alummno.apellidos || !this.Alummno.fech_nac || !this.Alummno.noControl || !this.Alummno.semestre || !this.Alummno.modalidad) {
      Swal.fire(
        "Atencion",
        `Favor de llenar todos los campos requeridos <i class="fa fa-asterisk" style="color:red"></i>`,
        "warning"
      );
    } else {
      Swal.fire({
        title: "¡Atención!",
        html: this.Alummno.id ? `¿Estás seguro de modificar este alumno?` : `¿Estás seguro de crear un nuevo alumno?`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#0D6EFD",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
      }).then((result) => {
        if (result.value) {
          this.servProy.newAlumno(this.Alummno).subscribe((resp: any) => {
            if (resp.status == 200) {
              const index = this.lEstudiantes.findIndex(estudiante => estudiante.id === resp.response.id);
              if (index !== -1) {
                this.lEstudiantes[index] = resp.response;
              } else {
                this.lEstudiantes.push(resp.response);
              }

              $("#modalNuevoAlumno").modal('hide');

              Swal.fire(
                "Atencion",
                `Su alumno ha sido registrada con exito`,
                "success"
              );
              this.Alummno = new Alumno();

            } else {
              Swal.fire(
                "Atencion",
                `Algo salio mal al registrar al alumno`,
                "error"
              );
            }
          });
        }

      });
    }
  }

  DeleteAlumno(id) {
    Swal.fire({
      title: "¡Atención!",
      html: `¿Estás seguro de eliminar al alumno?`, // agregar tx
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#0D6EFD",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.value) {
        this.servProy.deleteEstudiante(id).subscribe((resp: any) => {
          if (resp.status == 200) {
            const index = this.lEstudiantes.findIndex(est => est.id === id);
            this.lEstudiantes.splice(index, 1);

            Swal.fire(
              "Atencion",
              `Su alumno ha sido eliminada con exito`,
              "success"
            );
          } else {
            Swal.fire(
              "Atencion",
              `Algo salio mal al eliminar al alumno`,
              "error"
            );
          }
        });
      }
    });
  }

  // crear modificar MAteria
  addMateria() {
    this.Matteria = new Materia()
    $("#modalNuevaMateria").modal('show');
  }

  editMateria(mat) {
    this.Matteria = { ...mat };
    $("#modalNuevaMateria").modal('show');
  }

  sendMateria() {
    if (!this.Matteria.nombre || !this.Matteria.responsable || !this.Matteria.semestre || !this.Matteria.horario) {
      Swal.fire(
        "Atencion",
        `Favor de llenar todos los campos requeridos <i class="fa fa-asterisk" style="color:red"></i>`,
        "warning"
      );
    } else {
      Swal.fire({
        title: "¡Atención!",
        html: this.Matteria.id ? `¿Estás seguro de modificar este alumno?` : `¿Estás seguro de crear un nuevo alumno?`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#0D6EFD",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
      }).then((result) => {
        if (result.value) {
          this.servProy.newMateria(this.Matteria).subscribe((resp: any) => {
            if (resp.status == 200) {
              const index = this.lMaterias.findIndex(materia => materia.id === resp.response.id);
              if (index !== -1) {
                this.lMaterias[index] = resp.response;
              } else {
                this.lMaterias.push(resp.response);
              }
              $("#modalNuevaMateria").modal('hide');

              Swal.fire(
                "Atencion",
                `Su materia ha sido registrada con exito`,
                "success"
              );
              this.Matteria = new Materia();
            } else {
              Swal.fire(
                "Atencion",
                `Algo salio mal al registrar la materia`,
                "error"
              );
            }
          });
        }
      });
    }
  }

  // si tiene relacion no eliminar
  DeleteMateria(item) {
    if (item.boolEst && item.boolEst == 'SI') {
      Swal.fire(
        "¡Atencion!",
        `Imposible eliminar esta materia, activa en estudiante`,
        "warning"
      );
    } else {
      Swal.fire({
        title: "¡Atención!",
        html: `¿Estás seguro de eliminar la materia?`, // agregar tx
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#0D6EFD",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
      }).then((result) => {
        if (result.value) {
          this.servProy.deleteMateria(item.id).subscribe((resp: any) => {
            if (resp.status == 200) {
              const index = this.lMaterias.findIndex(materia => materia.id === item.id);
              this.lMaterias.splice(index, 1);

              Swal.fire(
                "Atencion",
                `Su materia ha sido eliminada con exito`,
                "success"
              );
            } else {
              Swal.fire(
                "Atencion",
                `Algo salio mal al eliminar la materia`,
                "error"
              );
            }
          });
        }
      });
    }

  }

  // crear modificar requisito
  addReqP() {
    this.Reqquisito = new Requisto()
    $("#modalNuevoReqP").modal('show');
  }

  editReqP(req) {
    this.Reqquisito = { ...req };
    $("#modalNuevoReqP").modal('show');
  }

  sendReqP() {
    if (!this.Reqquisito.requisito || !this.Reqquisito.descripcion || !this.Reqquisito.fecha_revision) {
      Swal.fire(
        "Atencion",
        `Favor de llenar todos los campos requeridos <i class="fa fa-asterisk" style="color:red"></i>`,
        "warning"
      );
    } else {
      Swal.fire({
        title: "¡Atención!",
        html: this.Reqquisito.id ? `¿Estás seguro de modificar este requisito?` : `¿Estás seguro de crear un nuevo requisito?`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#0D6EFD",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
      }).then((result) => {
        if (result.value) {
          this.servProy.newRequistoP(this.Reqquisito).subscribe((resp: any) => {
            if (resp.status == 200) {
              const index = this.lRequisitosP.findIndex(req => req.id === resp.response.id);
              if (index !== -1) {
                this.lRequisitosP[index] = resp.response;
              } else {
                this.lRequisitosP.push(resp.response);
              }
              $("#modalNuevoReqP").modal('hide');

              Swal.fire(
                "Atencion",
                `Su requisito ha sido registrada con exito`,
                "success"
              );
              this.Reqquisito = new Requisto();
            } else {
              Swal.fire(
                "Atencion",
                `Algo salio mal al registrar la materia`,
                "error"
              );
            }
          });
        }
      });
    }
  }

  // si tiene relacion no eliminar
  deleteReqP(item) {
    Swal.fire({
      title: "¡Atención!",
      html: `¿Estás seguro de eliminar el requisito?`, // agregar tx
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "#0D6EFD",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
    }).then((result) => {
      if (result.value) {
        this.servProy.deleteReq(item.id).subscribe((resp: any) => {
          if (resp.status == 200) {
            const index = this.lRequisitosP.findIndex(req => req.id === item.id);
            this.lRequisitosP.splice(index, 1);

            Swal.fire(
              "Atencion",
              `Su requisito ha sido eliminada con exito`,
              "success"
            );
          } else {
            Swal.fire(
              "Atencion",
              `Algo salio mal al eliminar el requisito`,
              "error"
            );
          }
        });
      }
    });
  }



  clickVerReqBec(id) {
    id && id != 0 ? this.getRequisitos('', id) : this.BeccReqq = new BecReq();;


    $("#modalNuevoRequisito").modal('show');
  }


  enviarBecReq() {
    if (!this.BeccReqq.puntaje) {
      Swal.fire(
        "Atencion",
        `Favor de llenar todos los campos requeridos <i class="fa fa-asterisk" style="color:red"></i>`,
        "warning"
      );
    } else {
      Swal.fire({
        title: "¡Atención!",
        html: this.BeccReqq.id ? `¿Estás seguro de modificar este requisito?` : `¿Estás seguro de crear un nuevo requisito?`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#0D6EFD",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
      }).then((result) => {
        if (result.value) {
          console.log('thisBeca', this.BecaActiva);

          console.log('respuesta a envar', this.BeccReqq);
          this.BeccReqq.id_beca = this.BecaActiva;
          this.servProy.newBecaRequisito(this.BeccReqq).subscribe((resp: any) => {
            if (resp.status == 200) {
              this.getRequisitos(this.BecaActiva, '');


              $("#modalNuevoRequisito").modal('hide');

              Swal.fire(
                "Atencion",
                `Su requisito ha sido registrada con exito`,
                "success"
              );
              this.BeccReqq = new BecReq();
            } else {
              Swal.fire(
                "Atencion",
                `Algo salio mal al registrar la materia`,
                "error"
              );
            }
          });
        }
      });
    }
  }

  selectBecReq(evento) {
    const index = this.lRequisitos.findIndex(req => req.id_requisito === evento.id);

    if (index == -1) {
      this.BeccReqq.id_requisito = evento.id;
      this.BeccReqq.name_desc = evento.descripcion;
    } else {
      this.BeccReqq = new BecReq();
      Swal.fire(
        "Atencion",
        `El requisito seleccionado, ya esta en la beca`,
        "error"
      );
    }
  }




  /* FUNCIONES ESTUDIANTES-MATERIAS */

  clickVerEstMat(id) {
    id && id != 0 ? this.getCalificaciones('', '', id) : this.EsttMatt = new EstMat();


    $("#modalNuevoEstMat").modal('show');
  }

  selectEstMat(evento) {
    const index = this.lCalificaciones.findIndex(req => req.id_materia === evento.id);

    if (index === -1) {

      this.EsttMatt.id_materia = evento.id;
      this.EsttMatt.name_mat = evento.nombre;
    } else {

      this.EsttMatt.id_materia = null;
      this.EsttMatt.calificacion = null;
      this.EsttMatt.id_estudiante = null;
      this.EsttMatt.id = null;
      // this.EsttMatt = new EstMat();
      console.log('this', this.EsttMatt);

      Swal.fire(
        "Atencion",
        `La materia seleccionada, ya esta en el estudiante`,
        "error"
      );
    }
  }

  enviarEstMat() {
    if (!this.EsttMatt.calificacion) {
      Swal.fire(
        "Atencion",
        `Favor de llenar todos los campos requeridos <i class="fa fa-asterisk" style="color:red"></i>`,
        "warning"
      );
    } else {
      Swal.fire({
        title: "¡Atención!",
        html: this.EsttMatt.id ? `¿Estás seguro de modificar esta calificación?` : `¿Estás seguro de crear una nueva calificación?`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonColor: "#0D6EFD",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
      }).then((result) => {
        if (result.value) {
          this.EsttMatt.id_estudiante = this.EstudianteActivo;
          console.log('estmatt', this.EsttMatt);
          this.servProy.newEstMateria(this.EsttMatt).subscribe((resp: any) => {
            if (resp.status == 200) {
              this.getCalificaciones(resp.response.id_estudiante, '', '');


              $("#modalNuevoEstMat").modal('hide');

              Swal.fire(
                "Atencion",
                `Su calificación ha sido registrada con exito`,
                "success"
              );
              this.EsttMatt = new EstMat();
            } else {
              Swal.fire(
                "Atencion",
                `Algo salio mal al registrar la materia`,
                "error"
              );
            }
          });
        }
      });
    }
  }


}




