import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers : Customer [] = [];
  
  currentPage: number = 0;
  pageSize: number = 5; 
  totalPages: number = 0;
  isFirst: boolean = false;
  isLast: boolean = false;

  constructor (private customerService : CustomerService) { 

  }

   ngOnInit(): void {
    this.listCustomers();
  }

  listCustomers() {
    this.customerService.getCustomerList(this.currentPage, this.pageSize).subscribe(
      (data: any) => {
        this.customers = data.content;
        
        this.totalPages = data.totalPages;
        this.isFirst = data.first;
        this.isLast = data.last;
        
        console.log("Página actual:", this.currentPage);
        console.log("Datos recibidos:", this.customers);
      },
      (error) => console.error(error)
    );
  }

  cambiarPagina(nuevaPagina: number): void {
    this.currentPage = nuevaPagina;
    this.listCustomers(); 
  }

  deleteCustomer(id: number){
    console.log(id);
    this.customerService.deleteCustomerById(id).subscribe(
      () => this.listCustomers()
    );
  }
}
