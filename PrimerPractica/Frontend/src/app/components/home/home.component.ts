import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginData = {
    name: '',
    password: ''
  };

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  login(name: string, password: string){
    this.loginData.name = name;
    this.loginData.password = password;
    if(this.loginData.name === 'Jesus' && this.loginData.password === 'Totonino'){
      this.router.navigate(['/customers']);
    } else {
      alert('Credenciales incorrectas');
    }
  }

}
