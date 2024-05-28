import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private api: string = `${environment.apiBack}`;

  constructor(private http: HttpClient) {
  }


  GetBecas(obj): Observable<any> {
    return this.http.post(this.api + `/show_becas`, obj);
  }

  GetEstudiantes(obj): Observable<any> {
    return this.http.post(this.api + `/show_estudiantes`, obj);
  }

  GetMaterias(obj): Observable<any> {
    return this.http.post(this.api + `/show_materias`, obj);
  }

  GetRequisitos(obj): Observable<any> {
    return this.http.post(this.api + `/show_requisitos`, obj);
  }

  GetRequisitosP(obj): Observable<any> {
    return this.http.post(this.api + `/show_requisitosP`, obj);
  }

  GetCalificaciones(obj): Observable<any> {
    return this.http.post(this.api + `/show_calificaciones`, obj);
  }

  GetBecasEst(obj): Observable<any> {
    return this.http.post(this.api + `/show_becas_estudiantes`, obj);
  }

  newBeca(obj): Observable<any> {
    return this.http.post(this.api + `/new_beca`, obj);
  }

  newAlumno(obj): Observable<any> {
    return this.http.post(this.api + `/new_alumno`, obj);
  }

  newMateria(obj): Observable<any> {
    return this.http.post(this.api + `/new_materia`, obj);
  }

  newRequistoP(obj): Observable<any> {
    return this.http.post(this.api + `/new_requisito`, obj);
  }

  deleteMateria(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.post(this.api + '/delete_materia', params);
  }


  deleteEstudiante(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.post(this.api + `/delete_alumno`, params);
  }

  deleteBeca(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.post(this.api + `/delete_beca`, params);
  }

  deleteReq(id): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.post(this.api + `/delete_requisito`, params);
  }

  newBecaRequisito(obj): Observable<any> {
    return this.http.post(this.api + `/new_becas_requisitos`, obj);
  }

  newEstMateria(obj): Observable<any> {
    return this.http.post(this.api + `/new_estudiantes_materias`, obj);
  }

  newBecEstudiantes(obj): Observable<any> {
    return this.http.post(this.api + `/new_estudiantes_becas`, obj);
  }


}


