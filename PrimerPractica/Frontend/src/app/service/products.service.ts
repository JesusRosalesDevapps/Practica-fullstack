import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Products } from '../products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private api : string = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  getProductList(page : number = 0, size : number = 5): Observable<any> {
      return this.http.get<any>(`${this.api}?page=${page}&size=${size}`);
    }
  
    createProduct(product: Products): Observable<Products> {
      return this.http.post<Products>(`${this.api}`, product);
    }
  
    deleteProductById(id: number): Observable<any> {
      return this.http.delete(this.api+'/'+id);
    }
  
    getProductById(id: number): Observable<Products> {
      return this.http.get<Products>(`${this.api}/${id}`);
    }
    updateProduct(product: Products): Observable<Products> {
      return this.http.put<Products>(`${this.api}/${product.id}`, product);
    }
    
}
