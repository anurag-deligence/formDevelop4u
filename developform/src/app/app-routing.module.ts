import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterProjectComponent } from './components/register-project/register-project.component';
import { GetListedComponent } from './components/get-listed/get-listed.component';

const routes: Routes = [
  { path: '', component: GetListedComponent },
  { path: 'registerproject/:id', component: RegisterProjectComponent },
  { path: 'registerproject', component: RegisterProjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
