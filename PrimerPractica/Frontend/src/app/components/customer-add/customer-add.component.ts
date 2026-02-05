import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  id : number;
  name : string = '';
  email : string = '';

  constructor(private customerService : CustomerService) { }

  ngOnInit(): void {
  }

  addCustomer(){
    let customer = new Customer(this.id, this.name, this.email);
    console.log(customer);
    this.customerService.createCustomer(customer).subscribe(
      res => console.log(res)
    );
  }
}
