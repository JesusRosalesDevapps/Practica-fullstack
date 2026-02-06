import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  id: number; 
  name: string = '';
  email: string = '';
  password: string = '';
  
  errorMessage: string = '';

  constructor(
    private customerService: CustomerService,
    private router: Router 
  ) { }

  ngOnInit(): void {
  }

  register() {
    this.errorMessage = '';

    //validar campos
    if (!this.name.trim() || !this.email.trim() || !this.password.trim()) {
      alert("Por favor, llena todos los campos obligatorios.");
      return; 
    }

    let customer = new Customer(this.id, this.name, this.email, this.password);
    
    this.customerService.createCustomer(customer).subscribe(
      res => {
        console.log('Cliente creado:', res);
        alert('¡Registro exitoso! Por favor inicia sesión.');
        
        this.router.navigate(['/login']); 
      }
    );
  }
}