import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CsdleComponent } from './csdle/csdle.component';
import { ApiService } from '../service/api.service';
import { AppRouteModule } from './app.routes';




@NgModule({
  declarations: [
    HomeComponent,
    CsdleComponent,
    ApiService
  ],
  imports: [
    CommonModule,
    AppRouteModule
  ]
})
export class AppModule { }
