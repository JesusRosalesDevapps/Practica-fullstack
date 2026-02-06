import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EjemploComponent } from './ejemplo/ejemplo.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductsAddComponent } from './components/products-add/products-add.component';


  const routes : Routes = [
    {path : '', redirectTo: '/login', pathMatch: 'full' }, //http:localhost:4200/
    {path : 'login', component : LoginComponent}, //http:localhost:4200/login
    {path : 'home', component : HomeComponent, canActivate: [AuthGuard]}, //http:localhost:4200/home
    
    {path : 'register', component : RegisterComponent}, //http:localhost:4200/register
    {path : 'customers', component : CustomerListComponent, canActivate: [AuthGuard]}, //http:localhost:4200/customers
    {path : 'customers/add', component : CustomerAddComponent, canActivate: [AuthGuard]}, //http:localhost:4200/customers/add
    {path : 'customers/delete/:id', component : CustomerListComponent, canActivate: [AuthGuard]}, //http:localhost:4200/customers/delete/1
    
    {path : 'products', component : ProductsListComponent, canActivate: [AuthGuard]}, //http:localhost:4200/products
    {path : 'products/add', component : ProductsAddComponent, canActivate: [AuthGuard]}, //http:localhost:4200/products/add
    {path : 'products/delete/:id', component : ProductsListComponent, canActivate: [AuthGuard]} //http:localhost:4200/products/delete/1

  ];

@NgModule({
  declarations: [
    AppComponent,
    EjemploComponent,
    CustomerListComponent,
    CustomerAddComponent,
    ProductsListComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
