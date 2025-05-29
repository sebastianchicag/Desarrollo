import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:3000/api/v1/auth';
  private personsUrl = 'http://localhost:3000/api/v1/persons';

  constructor(private http: HttpClient) { }

  // === Auth ===
  register(userData: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, userData);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, credentials);
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('access_token') || '';
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    };
  }

  // === Persons CRUD ===
  getPersons(page: number = 1, limit: number = 1000): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get(this.personsUrl, {
      ...this.getAuthHeaders(),
      params
    });
  }

  deletePerson(id: string): Observable<any> {
    return this.http.delete(`${this.personsUrl}/${id}`, this.getAuthHeaders());
  }

  updatePerson(id: string, data: any): Observable<any> {
    return this.http.put(`${this.personsUrl}/${id}`, data, this.getAuthHeaders());
  }

  // === Dashboard Stats ===
  getStatsByDepartment(): Observable<any> {
    return this.http.get(`${this.personsUrl}/stats/by-department`, this.getAuthHeaders());
  }

  getStatsByHireDate(): Observable<any> {
    return this.http.get(`${this.personsUrl}/stats/by-month`, this.getAuthHeaders());
  }

  createPerson(data: any): Observable<any> {
    return this.http.post(this.personsUrl, data, this.getAuthHeaders());
  }

  getPersonById(id: string): Observable<any> {
    return this.http.get(`${this.personsUrl}/${id}`, this.getAuthHeaders());
  }

}
