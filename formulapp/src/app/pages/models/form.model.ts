export interface Formulario {
  form_name: string;
  descripcion: string;
  preguntas: Array<Preguntas>;
  user_id: string;
}
export interface Respuestas {
  form_id: string;
  respuestas: Array<any>;
  user_id: string;
}
export interface Preguntas {
  texto: string;
  tipo: string;
  opciones: Array<any>;
}
