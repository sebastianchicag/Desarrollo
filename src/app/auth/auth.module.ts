import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
@NgModule({
  declarations: [RegisterComponent, LoginComponent, DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgApexchartsModule
  ]
})
export class AuthModule { }
