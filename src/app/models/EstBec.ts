
export class EstBec {
  id?: number;
  id_beca?: number;
  id_estudiante?: number;
  fecha_inicio?: string;
  created_at?: string;
  updated_at?: string;
  status?: number;
  beca?: any;

  name_mat?: string;

  /*   name_desc?: string; */

  constructor() {
    this.id = null;
    this.id_estudiante = null;
    this.id_beca = null;
    this.fecha_inicio = null;
    this.name_mat = null;
  }
}
