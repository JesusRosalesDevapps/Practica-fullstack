import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EjemploComponent } from './ejemplo/ejemplo.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


  const routes : Routes = [
    {path : '', component : CustomerListComponent}, //http:localhost:4200/
    {path : 'customers/add', component : CustomerAddComponent}, //http:localhost:4200/customers/add
    {path : 'customers/delete/:id', component : CustomerListComponent} //http:localhost:4200/customers/delete/1
  ];

@NgModule({
  declarations: [
    AppComponent,
    EjemploComponent,
    CustomerListComponent,
    CustomerAddComponent
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
