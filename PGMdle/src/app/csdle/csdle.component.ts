// csdle.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { CsPlayers } from '../interfaces/CsPlayers.interface';

@Component({
  selector: 'app-csdle',
  templateUrl: './csdle.component.html',
  styleUrls: ['./csdle.component.scss']
})
export class CsdleComponent implements OnInit {
  liste: CsPlayers[] = [];
  filteredListe: Observable<CsPlayers[]> = of([]);
  playerOfTheDay: CsPlayers | undefined;
  searchTerm = new FormControl('');

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Donne la liste des joueurs
    this.apiService.getPlayers().subscribe((players: CsPlayers[]) => {
      this.liste = players;
      this.filteredListe = this.searchTerm.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      );
    });

    // Donne le joueur du jour
    this.apiService.getPlayerOfTheDay().subscribe((player: CsPlayers) => {
      this.playerOfTheDay = player;
    });
  }

  private _filter(value: string): CsPlayers[] {
    console.log(value)
    const filterValue = value.toLowerCase();
    return this.liste.filter(player => player.name.toLowerCase().includes(filterValue));
  }

  selectPlayer(playerName: string) {
    
    this.searchTerm.setValue(playerName);
  }
}
