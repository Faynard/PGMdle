import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppModule } from './app.module';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [AppModule]
})
export class AppComponent {
  title = 'csdleapp';
  readonly APIUrl="http://localhost:3000/api/csdleapp/";

  constructor(private http:HttpClient){}
  
  players:any=[];

  refreshPlayers(){
    this.http.get(this.APIUrl+'GetPlayers').subscribe(data=>{
      this.players=data;
    })
  }

  ngOnInit(){
    this.refreshPlayers
  }

  addPlayers(){
    var newPlayers=(<HTMLInputElement>document.getElementById("newPlayers")).value;
    var formData = new FormData();
    formData.append("newPlayers", newPlayers);
    this.http.post(this.APIUrl+'AddPlayers',formData).subscribe(data=>{
      alert(data);
      this.refreshPlayers();
    })
  }

  deletePlayers(id : number){
    
    this.http.delete(this.APIUrl+'DeletePlayers?id='+id).subscribe(data=>{
      alert(data);
      this.refreshPlayers();
    })
  }
}
