import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  standalone: false,
})
export class EditComponent implements OnInit {
  personId!: string;
  personData: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.personId = this.route.snapshot.paramMap.get('id') || '';
    this.authService.getPersonById(this.personId).subscribe({
      next: (data) => {
        if (data.hireDate) {
          data.hireDate = data.hireDate.split('T')[0];
        }
        this.personData = data;
      },
      error: (err) => console.error('Error fetching person', err)
    });
  }

  onSubmit(): void {
    this.authService.updatePerson(this.personId, this.personData).subscribe({
      next: () => {
        alert('Persona actualizada con éxito');
        this.router.navigate(['/persons']);
      },
      error: (err) => console.error('Error al actualizar', err)
    });
  }
}
