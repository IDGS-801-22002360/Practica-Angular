import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, NuevoUsuario } from '../models/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl = 'http://localhost:3000/users';
  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  newUsuario(NuevoUsuario: NuevoUsuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl, NuevoUsuario);
  }

  updateUsuario(id: number, cambios: Partial<NuevoUsuario>): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.baseUrl}/${id}`, cambios);
  }

  deleteUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
