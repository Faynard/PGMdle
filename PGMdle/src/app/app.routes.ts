import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CsdleComponent } from './csdle/csdle.component';

export const routes: Routes = [
    {path: '', component:CsdleComponent},
    {path: 'csdle', component:CsdleComponent},
];
