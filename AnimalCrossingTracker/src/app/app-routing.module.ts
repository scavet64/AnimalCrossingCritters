import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FishComponent } from './fish/fish.component';
import { BugsComponent } from './bugs/bugs.component';


const routes: Routes = [
  { path: 'fish', component: FishComponent },
  { path: 'bugs', component: BugsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
