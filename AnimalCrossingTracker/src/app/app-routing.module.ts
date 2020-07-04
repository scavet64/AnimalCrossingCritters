import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FishComponent } from './fish/fish.component';
import { BugsComponent } from './bugs/bugs.component';
import { DeepseaComponent } from './deepsea/deepsea.component';


const routes: Routes = [
  { path: 'fish', component: FishComponent },
  { path: 'deepsea', component: DeepseaComponent },
  { path: 'bugs', component: BugsComponent },
  { path: '',
    redirectTo: '/fish',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
