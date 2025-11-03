export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  numero: number;
  estatus: number;
}

export type NuevoUsuario = Omit<Usuario, 'id'>;
