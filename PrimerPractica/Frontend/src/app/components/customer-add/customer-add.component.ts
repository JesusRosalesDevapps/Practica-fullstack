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
  errorMessage: string = '';
  constructor(private customerService : CustomerService, private router: Router) { }

  ngOnInit(): void {
  }

  addCustomer(){
    let customer = new Customer(this.id, this.name, this.email, this.password);
    this.errorMessage = '';
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!this.name.trim() || !this.email.trim() || !this.password.trim()) {
      alert("Por favor, llena todos los campos obligatorios.");
      return; 
    }

    if (!emailPattern.test(this.email)) {
      this.errorMessage = "📧 El formato del correo es inválido.";
      return;
    }
    console.log(customer);
    this.customerService.createCustomer(customer).subscribe({
      next: (res) => {
        alert('¡Registro exitoso!'); 
      },
      error: (err) => {
        console.error(err);

        // MANEJO DE ERRORES
        if (err.status === 409) {
          this.errorMessage = `⛔ ${err.error}`; 
        } else if (err.status === 400) {
          this.errorMessage = `⚠️ ${err.error}`;
        } else {
          this.errorMessage = '❌ Error de conexión con el servidor.';
        }
      }
    });
  }
}
