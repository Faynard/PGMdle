import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http'; 
import { ConnectionService } from '../service/connection.service'
import { CsPlayers } from '../../../shared/Players/CsPlayers.interface';
import { error } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true, 
  imports: [
    CommonModule, 
    HttpClientModule, 
  ]
})
export class AppComponent {
  players: CsPlayers[] = []

  constructor(private connectionService: ConnectionService) {}
  
  ngOnInit() {
    this.loadPlayers(); 
  }

  loadPlayers():void{
    this.connectionService.getPlayers().subscribe({
      next: data => {
        this.players = data
      }
    })
  }

  // addPlayers() {
  //   var newPlayer = (<HTMLInputElement>document.getElementById("newPlayer")).value;
  //   var formData = new FormData();
  //   formData.append("newPlayer", newPlayer); 
  //   this.http.post(this.APIUrl + 'AddPlayers', formData).subscribe(data => {
  //     alert(data);
  //     this.refreshPlayers();
  //   });
  // }

  // deletePlayers(id: number) {
  //   console.log(id)
  //   this.http.delete(this.APIUrl + 'DeletePlayers?id=' + id).subscribe(data => {
  //     alert(data);
  //     this.refreshPlayers();
  //   });
  // }
}