import { Injectable, Query } from '@angular/core';
import { GitSearch } from './git-search';
import { HttpClient } from '@angular/common/http';//HttpClient retorna RxJS Observables
//import 'rxjs/add/operator/toPromise'; Convierte los observables en promesas. Se escribe asi porque solo agrega un metodo


@Injectable({
  providedIn: 'root'
})
export class GitSearchService {

  cachedValues: Array<{
    [query: string]: GitSearch // Arreglo de clave, valor
  }> = [];

  constructor(private http: HttpClient) { //Este codigo reemplaza  this.http=http
   }

  gitSearch = (query: string, page: number): Promise<GitSearch> => {
    let promise = new Promise<GitSearch>((resolve,reject) => {//Se definen los parametros de la promesa con una funcion lambda
      if (this.cachedValues[query]){//Si ya existe una clave con ese nombre
        resolve(this.cachedValues[query])
      }
      else {
        this.http.get('https://api.github.com/search/repositories?q=' + query + '&page=' + page)
        .toPromise()
        .then((response) => {
          resolve(response as GitSearch);
        }, (error) => {
          reject(error);
        });
      }
    })
    return promise;
  }
}
