import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario';
import { Usuario, NuevoUsuario } from '../../models/usuario.interface';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-index',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './index.html',
  styleUrl: './index.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export default class IndexComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private fb = inject(FormBuilder);

  public usuarios = signal<Usuario[]>([]);
  public isLoading = signal<boolean>(true);
  public error = signal<string | null>(null);

  public usuarioForm!: FormGroup;
  public selectedUserId = signal<number | null>(null);

  ngOnInit(): void {
    this.initForm();
    this.cargarUsuarios();
  }

  private initForm(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numero: ['', Validators.required]
    });
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

  seleccionarUsuario(usuario: Usuario): void {
    this.usuarioForm.patchValue({
      nombre: usuario.nombre,
      email: usuario.email,
      numero: usuario.numero,
    });

    this.selectedUserId.set(usuario.id);
  }

  guardarUsuario(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    const userData: NuevoUsuario = this.usuarioForm.value;

    if (this.selectedUserId()) {
      this.usuarioService.updateUsuario(this.selectedUserId()!, userData).subscribe({
        next: (usuarioActualizado: any) => {
          console.log('Usuario actualizado', usuarioActualizado);

          this.usuarios.update(users =>
            users.map(u => (u.id === usuarioActualizado.id ? usuarioActualizado : u))
          );

          this.resetForm();
        },
        error: (err) => console.error('Error al actualizar', err)
      });
    } else {
      this.usuarioService.newUsuario(userData).subscribe({
        next: (nuevoUsuario: Usuario) => {
          console.log('Usuario creado', nuevoUsuario);
          this.usuarios.update(users => [...users, nuevoUsuario]);
          this.resetForm();
        },
        error: (err: any) => console.error('Error al crear', err)
      });
    }
    this.selectedUserId.set(null);

  }

  eliminarUsuario(id: number): void {
    if (!confirm(`¿Estás seguro de que quieres eliminar al usuario con ID ${id}?`)) {
      return;
    }
    this.usuarioService.deleteUsuario(id).subscribe({
      next: () => {
        console.log('Usuario eliminado', id);
        this.usuarios.update(users => users.filter(u => u.id !== id));
        this.resetForm();
      },
      error: (err: any) => console.error('Error al eliminar', err)
    });
  }

  resetForm(): void {
    this.usuarioForm.reset();
    this.selectedUserId.set(null);
  }

}
