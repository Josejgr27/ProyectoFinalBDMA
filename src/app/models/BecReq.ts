export class BecReq {
  id?: number;
  id_beca?: number;
  id_requisito?: number;
  puntaje?: string;
  created_at?: string;
  updated_at?: string;
  requisito?: any;

  name_desc?: string;

  constructor() {
    this.id = null;
    this.id_requisito = null;
    this.puntaje = null;
    this.requisito = null;
  }
}
