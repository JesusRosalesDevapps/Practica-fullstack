import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private api : string = 'http://localhost:8080/api/customers';
  constructor(private http : HttpClient) { }

  getCustomerList(page : number = 0, size : number = 5): Observable<any> {
    return this.http.get<any>(`${this.api}?page=${page}&size=${size}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.api}`, customer);
  }

  deleteCustomerById(id: number): Observable<any> {
    return this.http.delete(this.api+'/'+id);
  }

  getCustomerByName(name: string): Observable<Customer []> {
    return this.http.get<Customer []>(this.api+'/name/'+name);
  }

  login(customer : any) : Observable<any> {
    return this.http.post(this.api+'/login', customer);
  }
}
