import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'employee', loadChildren: () => import('./components/employee/employee.module').then(emp => emp.EmployeeModule) },
  { path: 'department', loadChildren: () => import('./components/department/department.module').then(dept => dept.DepartmentModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
