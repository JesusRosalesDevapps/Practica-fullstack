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
    let customer = new Customer(this.id, this.name, this.email, this.password);
    this.errorMessage = '';
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    //validar campos
    if (!this.name.trim() || !this.email.trim() || !this.password.trim()) {
      alert("Por favor, llena todos los campos obligatorios.");
      return; 
    }
    //validar formato de email
    if (!emailPattern.test(this.email)) {
      this.errorMessage = "📧 El formato del correo es inválido.";
      return;
    }
    
    this.customerService.createCustomer(customer).subscribe({
      next: (res) => {
        console.log('Cliente creado:', res);
        alert('¡Registro exitoso! Por favor inicia sesión.');
        
        this.router.navigate(['/login']); 
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