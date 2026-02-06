import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  id : number;
  name : string = '';
  email : string = '';
  password : string = '';

  constructor(private customerService : CustomerService, private router: Router) { }

  ngOnInit(): void {
  }

  addCustomer(){
    if (!this.name.trim() || !this.email.trim() || !this.password.trim()) {
      alert("Por favor, llena todos los campos obligatorios.");
      return; 
    }
    let customer = new Customer(this.id, this.name, this.email, this.password);
    console.log(customer);
    this.customerService.createCustomer(customer).subscribe(
      res => {
        console.log('Cliente creado:', res);
        alert('¡Registro exitoso!'); 
      }
    );
    
  }
}
