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
    return this.http.post(this.api + `/show_becas`, { obj });
  }

  GetEstudiantes(obj): Observable<any> {
    return this.http.post(this.api + `/show_estudiantes`, { obj });
  }

  GetMaterias(obj): Observable<any> {
    return this.http.post(this.api + `/show_materias`, { obj });
  }
}


