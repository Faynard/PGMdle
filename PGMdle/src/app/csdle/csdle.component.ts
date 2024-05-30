import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CsPlayers } from '../interfaces/CsPlayers.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-csdle',
  templateUrl: './csdle.component.html',
  styleUrl: './csdle.component.scss'
})
export class CsdleComponent {
  liste: Array<CsPlayers> = [];
  filteredListe: Array<CsPlayers> = [];
  playerOfTheDay: CsPlayers | undefined;
  searchTerm: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    //donne la liste des joueurs
    this.apiService.getPlayers().subscribe((players: CsPlayers[]) => {
      this.liste = players;
      this.filteredListe = players;
    });
    //donne le joueur du jour
    this.apiService.getPlayerOfTheDay().subscribe((player: CsPlayers) => {
      this.playerOfTheDay = player;
    });
  }

  filterPlayers() {
    if (this.searchTerm) {
      this.filteredListe = this.liste.filter(player => 
        player.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredListe = this.liste;
    }
  }

  levenshteinDistance(a: string, b: string): number {
    const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

    for (let i = 0; i <= a.length; i++) {
      for (let j = 0; j <= b.length; j++) {
        if (i === 0) matrix[i][j] = j;
        else if (j === 0) matrix[i][j] = i;
        else {
          const cost = a[i - 1] === b[j - 1] ? 0 : 1;
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1, // deletion
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j - 1] + cost // substitution
          );
        }
      }
    }

    return matrix[a.length][b.length];
  }
}
