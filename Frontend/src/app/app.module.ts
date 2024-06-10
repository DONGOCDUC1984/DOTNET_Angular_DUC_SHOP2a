import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { UploadComponent } from './components/upload/upload.component';
import { CartComponent } from './components/cart/cart.component';
import { MyordersComponent } from './components/user/myorders/myorders.component';
import { AllordersComponent } from './components/admin/allorders/allorders.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeftOffcanvasComponent } from './components/left-offcanvas/left-offcanvas.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    CategoriesComponent,
    AddCategoryComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    ForbiddenComponent,
    UploadComponent,
    CartComponent,
    MyordersComponent,
    AllordersComponent,
    FooterComponent,
    LeftOffcanvasComponent,
    ContactComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    //SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
