import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CsdleComponent } from './csdle/csdle.component';
import { ApiService } from './service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CsdleComponent,
    ApiService
  ],
  imports: [
    CommonModule,
    
    HttpClientModule
  ],
  providers:[
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
