import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
  standalone: false,

})
export class NewComponent {
  personData: any = {
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: '',
    hireDate: '',
    salary: null
  };
  showAlert = false;
  emailAlreadyExists = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(form: any): void {
    if (form.invalid) {
      this.showAlert = true;
      this.emailAlreadyExists = false;

      setTimeout(() => this.showAlert = false, 3000);
      return;
    }

    this.showAlert = false;
    this.emailAlreadyExists = false;

    this.authService.createPerson(this.personData).subscribe({
      next: () => {
        alert('Persona creada con éxito');
        this.router.navigate(['/persons']);
      },
      error: (err) => {
        console.error('Error al crear persona', err);

        if (err.error?.message === 'El correo ya está registrado.') {
          this.emailAlreadyExists = true;
          window.scrollTo({ top: 0, behavior: 'smooth' });

          return;
        }

        alert('Error al crear persona');
      }
    });
  }

}
