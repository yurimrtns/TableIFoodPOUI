// import { HttpClient } from "@angular/common/http";
// import { PoResponseApi } from "@po-ui/ng-components";
// import { Observable } from "rxjs";
// import { EndPoint } from "./EndPoint";


// export abstract class CRUD {

//     private readonly API: string = 'https://localhost:7108/';
    
//     constructor(private http: HttpClient) {}

//     getAll(): Observable<PoResponseApi>{
//         return this.http.get<PoResponseApi>(this.API + this.getEndPoint());
//     }
    
//     abstract getEndPoint():string;
// }