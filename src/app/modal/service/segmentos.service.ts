import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoResponseApi } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { EndPoint } from '../EndPoint';

@Injectable({
    providedIn: 'root',
})

export class SegmentosService {

    
   private readonly API: string = 'https://localhost:7108/';
    
   constructor(private http: HttpClient) {}

   
   getAll(endPoint: EndPoint): Observable<PoResponseApi>{
       return this.http.get<PoResponseApi>(this.API + endPoint);
   }

}