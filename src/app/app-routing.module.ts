import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { HousesComponent } from './houses/houses.component';
import { CharactersComponent } from './characters/characters.component';

const routes: Routes = [
  {path: '', component: LayoutComponent, children:[
    {path: '', component: HousesComponent},
    {path: 'houses', component: HousesComponent},
    {path: 'characters/:type/:house', component: CharactersComponent}         
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
