import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ListComponent } from '../person/list/list.component';
import { EditComponent } from '../person/edit/edit.component';
import { AuthGuard } from '../guards/auth.guard';
import { NewComponent } from '../person/new/new.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'persons', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'create-persons', component: NewComponent, canActivate: [AuthGuard] },
  { path: 'personas/editar/:id', component: EditComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
