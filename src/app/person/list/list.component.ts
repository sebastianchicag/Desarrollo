  import { Component, OnInit } from '@angular/core';
  import { AuthService } from '../../auth/auth.service';
  import { Router } from '@angular/router';
  @Component({
    selector: 'app-list',
    standalone: false,
    templateUrl: './list.component.html',
    styleUrl: './list.component.css'
  })
  export class ListComponent implements OnInit {
    persons: any[] = [];
    sortField: string = '';
    sortDirection: 'asc' | 'desc' = 'asc';

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
      this.authService.getPersons(1, 1000).subscribe({
        next: (res) => this.persons = res.data,
        error: (err) => console.error(err)
      });
    }
    editPerson(id: string) {
      this.router.navigate(['/edit-person', id]);
    }

    sortBy(field: string) {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortField = field;
        this.sortDirection = 'asc';
      }

      this.persons.sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        return this.sortDirection === 'asc'
          ? aVal > bVal ? 1 : -1
          : aVal < bVal ? 1 : -1;
      });
    }


    deletePerson(id: string): void {
      const confirmDelete = window.confirm('¿Estás seguro que deseas eliminar esta persona? Esta acción no se puede deshacer.');

      if (confirmDelete) {
        this.authService.deletePerson(id).subscribe({
          next: () => {
            // Quitar del arreglo local sin necesidad de recargar
            this.persons = this.persons.filter(p => p._id !== id);
            alert('Persona eliminada correctamente');
          },
          error: err => {
            console.error('Error al eliminar', err);
            alert('Ocurrió un error al eliminar la persona');
          }
        });
      }
    }

  }
