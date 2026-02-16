import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { ProductsService } from 'src/app/service/products.service';
import { of, throwError } from 'rxjs';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;

  const mockProduct: any = { 
    id: 1, 
    name: 'Test Product', 
    available: true, 
    price: 100,
    category: 'General', 
    stock: 10            
  };

  const mockResponse = {
    content: [mockProduct],
    totalPages: 5,
    first: true,
    last: false
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductsService', ['getProductList', 'deleteProductById', 'updateProduct']);

    await TestBed.configureTestingModule({
      declarations: [ ProductsListComponent ],
      providers: [
        { provide: ProductsService, useValue: spy }
      ]
    })
    .compileComponents();

    productsServiceSpy = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    productsServiceSpy.getProductList.and.returnValue(of(mockResponse));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should list products on init', () => {
    productsServiceSpy.getProductList.and.returnValue(of(mockResponse));
    fixture.detectChanges();

    expect(component.products.length).toBe(1);
    expect(component.totalPages).toBe(5);
    expect(component.isFirst).toBeTrue();
    expect(productsServiceSpy.getProductList).toHaveBeenCalledWith(0, 5);
  });

  it('should handle error when listing products', () => {
    spyOn(console, 'error');
    productsServiceSpy.getProductList.and.returnValue(throwError(() => new Error('Error fetching')));
    
    component.listProducts();

    expect(console.error).toHaveBeenCalled();
  });

  it('should change page and reload products', () => {
    productsServiceSpy.getProductList.and.returnValue(of(mockResponse));
    
    component.cambiarPagina(2);

    expect(component.currentPage).toBe(2);
    expect(productsServiceSpy.getProductList).toHaveBeenCalledWith(2, 5);
  });

  it('should delete product and reload list', () => {
    productsServiceSpy.deleteProductById.and.returnValue(of({}));
    productsServiceSpy.getProductList.and.returnValue(of(mockResponse));
    spyOn(component, 'listProducts').and.callThrough();

    component.deleteProduct(1);

    expect(productsServiceSpy.deleteProductById).toHaveBeenCalledWith(1);
    expect(component.listProducts).toHaveBeenCalled();
  });

  it('should toggle available status successfully', () => {
    const event = { target: { checked: false } };
    const expectedUpdate = { ...mockProduct, available: !mockProduct.available };
    
    productsServiceSpy.updateProduct.and.returnValue(of(expectedUpdate));
    productsServiceSpy.getProductList.and.returnValue(of(mockResponse));
    spyOn(component, 'listProducts').and.callThrough();

    component.toggleAvailable(mockProduct, event);

    expect(productsServiceSpy.updateProduct).toHaveBeenCalled();
    expect(component.listProducts).toHaveBeenCalled();
  });

  it('should handle error when toggling available status', () => {
    const event = { target: { checked: false } };
    spyOn(window, 'alert');
    spyOn(console, 'error');
    
    productsServiceSpy.updateProduct.and.returnValue(throwError(() => new Error('Update failed')));
    productsServiceSpy.getProductList.and.returnValue(of(mockResponse));
    spyOn(component, 'listProducts').and.callThrough();

    component.toggleAvailable(mockProduct, event);

    expect(console.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('No se pudo cambiar el estado del producto.');
    expect(component.listProducts).toHaveBeenCalled();
  });

  it('should edit product successfully', () => {
    spyOn(window, 'alert');
    productsServiceSpy.updateProduct.and.returnValue(of(mockProduct));
    productsServiceSpy.getProductList.and.returnValue(of(mockResponse));
    spyOn(component, 'listProducts').and.callThrough();

    component.editProduct(mockProduct);

    expect(window.alert).toHaveBeenCalledWith('¡Producto actualizado!');
    expect(component.listProducts).toHaveBeenCalled();
  });

  it('should handle error when editing product', () => {
    spyOn(window, 'alert');
    spyOn(console, 'error');
    productsServiceSpy.updateProduct.and.returnValue(throwError(() => new Error('Edit failed')));

    component.editProduct(mockProduct);

    expect(console.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Error: No se pudo modificar el producto.');
  });
});