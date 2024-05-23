import { RouterModule, Routes } from '@angular/router';
import { CsdleComponent } from './csdle/csdle.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: 'csdle', component: CsdleComponent}];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouteModule{}