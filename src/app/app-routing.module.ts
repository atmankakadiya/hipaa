import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsentsComponent } from './main/consents/consents.component';

const routes: Routes = [
  {
    path:'',
    component:ConsentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
