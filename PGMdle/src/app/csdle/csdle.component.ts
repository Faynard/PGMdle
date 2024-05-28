import { Component, Input, OnInit } from '@angular/core';
import { CsPlayers } from '../shared/Players/cs-players';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-csdle',
  templateUrl: './csdle.component.html',
  styleUrl: './csdle.component.scss'
})
export class CsdleComponent implements OnInit {
  @Input() liste: Array<CsPlayers> = [];

  constructor(private apiService : ApiService){}

  ngOnInit() {
    this.apiService.getPlayers().subscribe((players: CsPlayers[]) => {
      this.liste = players;
    });
  }
}
