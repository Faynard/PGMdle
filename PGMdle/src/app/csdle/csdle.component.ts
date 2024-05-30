import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CsPlayers } from '../interfaces/CsPlayers.interface';

@Component({
  selector: 'app-csdle',
  templateUrl: './csdle.component.html',
  styleUrl: './csdle.component.scss'
})
export class CsdleComponent {
  liste: Array<CsPlayers> = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getPlayers().subscribe((players: CsPlayers[]) => {
      this.liste = players;
    });
  }
}
