import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresas } from 'src/app/DTO/Empresas';
import { PoResponseApi } from '@po-ui/ng-components';
import { EndPoint } from "../EndPoint";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root',
})
export class EmpresasService {


   private readonly API: string = 'https://localhost:7108/';
    
     constructor(private http: HttpClient) {}

     
     getAll(endPoint: EndPoint): Observable<PoResponseApi>{
         return this.http.get<PoResponseApi>(this.API + endPoint);
     }


  // GetEmpresas(): Observable<PoResponseApi>{
  //   return this.http.get<PoResponseApi>(this.API);
  // }
  
   GetEmpresaPorId(id: number): Observable<Empresas>{
     const apiUrl = `${this.API}/${id}`;
     return this.http.get<Empresas>(apiUrl);
   }

  // SalvarEmpresas(empresas: Empresas): Observable<any>{
  //   return this.http.post<Empresas>(this.API, empresas, httpOptions)
  // }

  // AtualizarEmpresa(empresa: Empresas): Observable<any>{
  //   return this.http.put<Empresas>(this.API, empresa, httpOptions)
  // }

  segmentos: Array<any> = [
    { label: 'segmento 1', value: 'segmento 1' },
    { label: 'segmento 2', value: 'segmento 2' },
    { label: 'segmento 3', value: 'segmento 3' },
    { label: 'segmento 4', value: 'segmento 4' },
    { label: 'segmento 5', value: 'segmento 5' },
  ];

  categorias: Array<any> = [
    { label: 'categoria 1', value: 'categoria 1' },
    { label: 'categoria 2', value: 'categoria 2' },
    { label: 'categoria 3', value: 'categoria 3' },
  ];

  getSegmentos() {
    return this.segmentos;
  }
  getCategorias() {
    return this.categorias;
  }
}
