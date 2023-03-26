import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [
    // LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:"",component:LoginComponent}
    ]),
  ]
})
export class LoginModule { }
