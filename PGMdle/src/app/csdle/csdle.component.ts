import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CsPlayers } from '../interfaces/CsPlayers.interface';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-csdle',
  templateUrl: './csdle.component.html',
  styleUrls: ['./csdle.component.scss']
})
export class CsdleComponent implements OnInit {
  liste: CsPlayers[] = [];
  filteredListe: Observable<CsPlayers[]>;
  playerOfTheDay: CsPlayers | undefined;
  searchTerm = new FormControl('');

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Donne la liste des joueurs
    this.apiService.getPlayers().subscribe((players: CsPlayers[]) => {
      this.liste = players;
    });

    // Donne le joueur du jour
    this.apiService.getPlayerOfTheDay().subscribe((player: CsPlayers) => {
      this.playerOfTheDay = player;
    });

    // Configure le filtrage de l'autocomplétion
    this.filteredListe = this.searchTerm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value|undefined))
    );
  }

  private _filter(value: string): CsPlayers[] {
    const filterValue = value.toLowerCase();
    return this.liste.filter(player => player.name.toLowerCase().includes(filterValue));
  }

  selectPlayer(player: CsPlayers) {
    this.searchTerm.setValue(player.name.toString());
  }
}
