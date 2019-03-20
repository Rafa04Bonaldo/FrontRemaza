import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from "rxjs/operators";
import { ClienteSerializer } from './SerializerEndereco';
import { environment } from '../../../environments/environment';
import { Cliente } from '../endereco';

@Injectable({
  providedIn: 'root'
})
export class GenericServiceService {

  private url= environment.urlApi;
  private endpoint = environment.endpoint;
  private serializer = new ClienteSerializer(); 

  constructor(private http: HttpClient) { }

  create (item): Observable<any> {
    console.log(item);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<any>(`${this.url}/${this.endpoint}`, JSON.stringify(item), httpOptions).pipe(
      tap((item) => console.log(`added cliente`)),
      catchError(this.handleError<any>('addCliente'))
    );
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

   
}
