import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AppComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule {

}
