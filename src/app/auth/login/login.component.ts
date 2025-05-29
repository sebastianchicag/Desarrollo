import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // Almacena los datos del formulario de inicio de sesión
  formData = {
    email: '',
    password: '',
  };

  // Controla la visibilidad de la contraseña y los mensajes de error o éxito
  showPassword = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  //Svg que muestra y oculta la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  //Gestiona el login: valida el formulario, autentica al usuario y redirige o muestra error.
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Por favor, complete los campos vacíos';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.authService.login(this.formData).subscribe({
      next: (response) => {
        const userName = response.user.name;

        // Guardamos los datos en localStorage
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user_name', userName);
        localStorage.setItem('user_email', response.user.email);

        // Mostramos el mensaje de bienvenida
        this.successMessage = `Bienvenido, ${userName}`;

        // Esperamos 2 segundos antes de redirigir
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (err) => {
        const backendMsg = err.error.message;

        if (backendMsg === 'Invalid credentials') {
          this.errorMessage = 'Correo o contraseña incorrectos';
        } else {
          this.errorMessage = backendMsg || 'Error al iniciar sesión';
        }
      }
    });
  }

}
