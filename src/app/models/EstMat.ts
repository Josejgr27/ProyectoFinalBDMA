import { Materia } from './Materia';
export class EstMat {
  id?: number;
  id_estudiante?: number;
  id_materia?: number;
  calificacion?: string;
  created_at?: string;
  updated_at?: string;
  materia?: any;

  name_mat?: string;

  /*   name_desc?: string; */

  constructor() {
    this.id = null;
    this.id_estudiante = null;
    this.id_materia = null;
    this.calificacion = null;
    this.name_mat = null;
  }
}
