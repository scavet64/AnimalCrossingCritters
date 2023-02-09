import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FishComponent } from './fish/fish.component';
import { BugsComponent } from './bugs/bugs.component';
import { DeepseaComponent } from './deepsea/deepsea.component';


const routes: Routes = [
  { path: 'fish', component: FishComponent },
  { path: 'sea', component: DeepseaComponent },
  { path: 'insects', component: BugsComponent },
  {
    path: 'bugs',
    redirectTo: '/insects',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/fish',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
