import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('currentUser');
    console.log("Login: "+token)
    if (token) {
      this.router.navigate(['/home']);
    }
  }

  
  login(name: string, password: string){
    const credentials = { name: name, password: password };

    this.customerService.login(credentials).subscribe({
      next: (userData) => {
        localStorage.setItem('currentUser', JSON.stringify(userData));  
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert('Credenciales incorrectas');
      }
    });
  }

}
