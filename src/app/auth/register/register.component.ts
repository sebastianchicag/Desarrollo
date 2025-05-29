import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  formData = {
    name: '',
    email: '',
    password: '',
  };

  showPassword = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(form: NgForm) {
    this.errorMessage = '';
    this.successMessage = '';

    if (form.invalid) {
      this.errorMessage = 'Por favor completa todos los campos.';
      return;
    }

    // Validar formato de contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(this.formData.password)) {
      this.errorMessage = 'La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial.';
      return;
    }

    // Si todo es válido, continúa con el registro
    this.authService.register(this.formData).subscribe({
      next: (res) => {
        this.successMessage = '¡Registro exitoso!';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        if (err?.error?.message?.includes('duplicate') || err?.status === 409) {
          this.errorMessage = 'El correo ya está registrado.';
        } else {
          this.errorMessage = 'Ocurrió un error al registrarse. Intenta de nuevo.';
        }
      },
    });
  }

}
