import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario';
import { Usuario, NuevoUsuario } from '../../models/usuario.interface';

@Component({
  selector: 'app-index',
  imports: [CommonModule],
  templateUrl: './index.html',
  styleUrl: './index.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IndexComponent implements OnInit {
  private usuarioService = inject(UsuarioService);

  public usuarios = signal<Usuario[]>([]);
  public isLoading = signal<boolean>(false);
  public error = signal<string | null>(null);

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.usuarioService.getUsuarios().subscribe({
      next: (data: Usuario[]) => {
        this.usuarios.set(data);
        this.isLoading.set(false);
        console.log('Usuarios Cargados', data);
      },
      error: (err: any) => {
        this.error.set('Eror al cargar los usuarios.')
        this.isLoading.set(false);
      }
    });
  }
}
