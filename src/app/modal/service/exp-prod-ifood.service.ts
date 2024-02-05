import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoResponseApi } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/DTO/Produto';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ExpProdIFoodService {

  private readonly API: string = 'https://localhost:7108/ExpProdIFood';
    
  constructor(private http: HttpClient) {}

  
  getAll(): Observable<PoResponseApi>{
      return this.http.get<PoResponseApi>(this.API);
  }

  GetProdPorId(id: number): Observable<Produto>{
    const apiUrl = `${this.API}/${id}`;
    return this.http.get<Produto>(apiUrl);
  }

   SalvarProduto(produto: Produto): Observable<any>{
     return this.http.post<Produto>(this.API, produto, httpOptions)
   }

   AtualizarProduto(produto: Produto): Observable<any>{
    return this.http.put<Produto>(this.API, produto, httpOptions)
  }

}
