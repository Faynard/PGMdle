import { HttpClient } from "@angular/common/http";
import { CsPlayers } from "../../../shared/Players/CsPlayers.interface"
import { Observable } from "rxjs";

export class ConnectionService {
    title = 'csdleapp';
    readonly APIUrl="http://localhost:3000/api/csdleapp/";
  
    constructor(private http: HttpClient) {}
    
  
    getPlayers() : Observable<CsPlayers[]>{
      return this.http.get<CsPlayers[]>(this.APIUrl + 'GetPlayers');
    }
}