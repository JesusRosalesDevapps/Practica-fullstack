import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/products';
import { ProductsService } from 'src/app/service/products.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-add',
  templateUrl: './products-add.component.html',
  styleUrls: ['./products-add.component.css']
})
export class ProductsAddComponent implements OnInit {

  id : number;
  name : string = '';
  category : string = '';
  price : number;
  stock : number
  available : boolean;
  isEditMode: boolean = false;
  
  errorMessage: string = '';

  constructor(private productsService: ProductsService, 
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.id = id;

      this.productsService.getProductById(id).subscribe({
      next: (data) => {
          this.name = data.name;
          this.category = data.category;
          this.price = data.price;
          this.stock = data.stock;
          this.available = data.available;
        },
        error: (err) => {
          console.error("Error al cargar producto:", err);
          alert("No se pudo cargar la información del producto.");
          this.router.navigate(['/products']);
        }
      });
    } else {
      this.isEditMode = false;
    }
  }
  
  addProduct(){
    let product = new Products(undefined, this.name, this.category, this.price, this.stock, this.available);
    this.errorMessage = '';  
    const productData = new Products(this.id, this.name, this.category, this.price, this.stock, this.available);
    if (!this.name.trim() || !this.category.trim() || this.price == null || this.stock == null) {
      alert("Por favor, llena todos los campos obligatorios.");
      return; 
    }
      
    if (this.isEditMode) {
      this.productsService.updateProduct(productData).subscribe({
      next: () => {
        alert('¡Producto actualizado con éxito!');
          this.router.navigate(['/products']);
      },
      error: (err) => this.errorMessage = "Error al actualizar"
      });
    } 
    else {
        this.productsService.createProduct(product).subscribe({
          next: (res) => {
            alert('¡Producto agregado exitosamente!'); 
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
}
