import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Ithought } from './thought/thought.interface';

@Injectable({
  providedIn: 'root',
})
export class ThoughtService {
  // Define a URL base para acessar a API REST
  private readonly API = 'http://localhost:3000/thoughts';

  constructor(private http: HttpClient, private router: Router) {}

  // Lista todos os "thoughts" da API
  listar(): Observable<Ithought[]> {
    return this.http.get<Ithought[]>(this.API).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(() => 'Error retrieving thoughts!');
      })
    );
  }

  // Cria um novo "thought" na API
  criar(thought: Ithought): Observable<Ithought> {
    return this.http.post<Ithought>(this.API, thought).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(() => 'Error creating thought!');
      })
    );
  }

  // Atualiza um "thought" existente na API
  editar(thought: Ithought): Observable<Ithought> {
    return this.http.put<Ithought>(`${this.API}/${thought.id}`, thought).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(() => 'Error updating thought!');
      })
    );
  }

  // Exclui um "thought" da API pelo seu ID
  excluir(id: number): Observable<Ithought> {
    return this.http.delete<Ithought>(`${this.API}/${id}`).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(() => 'Error deleting thought!');
      })
    );
  }

  // Busca um "thought" na API pelo seu ID
  buscarPorId(id: number): Observable<Ithought> {
    return this.http.get<Ithought>(`${this.API}/${id}`).pipe(
      catchError((error: any) => {
        console.error(error);
        return throwError(() => 'Error retrieving thought!');
      })
    );
  }

  // Navega para a página de listagem de "thoughts"
  cancelar() {
    this.router.navigate(['/listThoughts']);
  }
}
