import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { MyordersComponent } from './components/user/myorders/myorders.component';
import { AllordersComponent } from './components/admin/allorders/allorders.component';
import { ContactComponent } from './components/contact/contact.component';
var routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
  },
  {
    path: 'update-category/:id',
    component: AddCategoryComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'myorders',
    component: MyordersComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    // My method is much shorter,simpler and
    // does not require the following line
    // data: { permittedRoles: ['Admin'] },
  },
  {
    path: 'allorders',
    component: AllordersComponent,
    canActivate: [AuthGuard],
    // My method is much shorter,simpler and
    // does not require the following line
    // data: { permittedRoles: ['Admin'] },
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
