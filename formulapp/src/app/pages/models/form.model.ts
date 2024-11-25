export interface Formulario {
  form_name: string;
  descripcion: string;
  preguntas: Array<Preguntas>;
  compartidoCon?: string[];
  user_id: string;
  cantitad_respuestas: number;
}
export interface Respuestas {
  form_id: string;
  respuestas: Array<any>;
  user_id: string;
  username: string;
}
export interface Preguntas {
  texto: string;
  tipo: string;
  opciones: Array<any>;
}
