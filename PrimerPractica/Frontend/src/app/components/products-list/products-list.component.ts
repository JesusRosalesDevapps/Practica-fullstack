import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { Products } from 'src/app/products';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

   products : Products [] = [];
    
    currentPage: number = 0;
    pageSize: number = 5; 
    totalPages: number = 0;
    isFirst: boolean = false;
    isLast: boolean = false;
  
    constructor (private productsService : ProductsService) { 
  
    }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this.productsService.getProductList(this.currentPage, this.pageSize).subscribe(
      (data: any) => {
        this.products = data.content;
        
        this.totalPages = data.totalPages;
        this.isFirst = data.first;
        this.isLast = data.last;
        
        console.log("Página actual:", this.currentPage);
        console.log("Datos recibidos:", this.products);
      },
      (error) => console.error(error)
    );
  }

  cambiarPagina(nuevaPagina: number): void {
    this.currentPage = nuevaPagina;
    this.listProducts(); 
  }

  deleteProduct(id: number){
    console.log(id);
    this.productsService.deleteProductById(id).subscribe(
      () => this.listProducts()
    );
  }

  toggleAvailable(product: Products, event: any): void {
    const isChecked = event.target.checked;
    const updatedProduct = { ...product, available: !product.available };
    this.productsService.updateProduct(updatedProduct).subscribe({
      next: () => {
        console.log(`Producto ${product.id} actualizado correctamente.`);
        this.listProducts(); // Recargamos la lista para ver si se reflejo el cambio
      },
      error: (err) => {
        console.error("Error al actualizar:", err);
        alert("No se pudo cambiar el estado del producto.");
        this.listProducts(); 
      }
    });
  }

  editProduct(product: Products) {
    this.productsService.updateProduct(product).subscribe({
      next: (datoActualizado) => {
        console.log('Producto modificado con éxito:', datoActualizado);
        alert('¡Producto actualizado!');
        this.listProducts(); 
      },
      error: (err) => {
        console.error('Error al modificar:', err);
        alert('Error: No se pudo modificar el producto.');
      }
    });
  }
  
}
