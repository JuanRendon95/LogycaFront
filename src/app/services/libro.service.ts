import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { libro } from '../Models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private urlApi = 'https://localhost:44327/api/libros';

  constructor(private httpClient: HttpClient) { }

  getLibros(): Observable<libro[]> {
    return this.httpClient.get<libro[]>(this.urlApi);
  }

  getLibro(idLibro: number): Observable<libro> {
    return this.httpClient.get<libro>(this.urlApi + idLibro);
  }

  saveLibro(libro: libro): Observable<string> {
    return this.httpClient.post<string>(this.urlApi, libro);
  }

  updateLibro(idLibro: number, libro: libro): Observable<string> {
    return this.httpClient.put<string>(this.urlApi + "/" + idLibro, libro);
  }

  deleteLibro(idLibro: number): Observable<string> {
    return this.httpClient.delete<string>(this.urlApi + "/" + idLibro);
  }
}
