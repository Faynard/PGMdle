import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CsPlayers } from '../../shared/Players/cs-players';


@Component({
  selector: 'app-csdle',
  templateUrl: './csdle.component.html',
  styleUrl: './csdle.component.scss'
})
export class CsdleComponent implements OnInit {
  @Input() liste: Array<CsPlayers> = [];

  constructor(private apiService : ApiService){}

  ngOnInit() {
    var listJoueur = this.apiService.getPlayers
  }
}
