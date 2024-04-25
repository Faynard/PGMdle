import { HttpClient } from "@angular/common/http";
import { CsPlayers } from "../../shared/Players/CsPlayers.interface"
import { Observable, map } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
    title = 'csdleapp';
    readonly APIUrl="http://localhost:3000/api/csdleapp/";
  
    constructor(private http: HttpClient) {}
    
  
    getPlayers() : Observable<CsPlayers[]>{
      return this.http.get<CsPlayers[]>(this.APIUrl + 'GetPlayers');
    }

    getPlayerOfTheDay(): Observable<CsPlayers> {
      return this.getPlayers().pipe(
        map(players => {
          const seed = this.generateDailySeed();
          const index = seed % players.length;
          return players[index];
        })
      );
    }
  
    private generateDailySeed(): number {
      const today = new Date();
      // Utilisez l'année, le mois et le jour pour créer un nombre unique pour chaque jour
      return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    }
}