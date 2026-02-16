import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsAddComponent } from './products-add.component';
import { ProductsService } from 'src/app/service/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('ProductsAddComponent', () => {
  let component: ProductsAddComponent;
  let fixture: ComponentFixture<ProductsAddComponent>;

  let productsServiceSpy: jasmine.SpyObj<ProductsService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let routeMock: any;

  const mockProductResponse = {
    id: 1,
    name: 'Laptop Gamer',
    category: 'Electronica',
    price: 1500,
    stock: 10,
    available: true
  };

  beforeEach(async () => {
    productsServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getProductById',
      'createProduct',
      'updateProduct'
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    routeMock = {
      snapshot: {
        params: {}
      }
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ProductsAddComponent],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: routeMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsAddComponent);
    component = fixture.componentInstance;
    spyOn(window, 'alert');
  });

  it('debe iniciar en modo CREACIÓN si no hay ID', () => {
    routeMock.snapshot.params = {};
    fixture.detectChanges();
    expect(component.isEditMode).toBeFalse();
  });

  it('debe iniciar en modo EDICIÓN y cargar datos si hay ID', () => {
    routeMock.snapshot.params = { id: 10 };
    productsServiceSpy.getProductById.and.returnValue(of(mockProductResponse as any));

    fixture.detectChanges();

    expect(component.isEditMode).toBeTrue();
    expect(component.name).toBe('Laptop Gamer');
    expect(productsServiceSpy.getProductById).toHaveBeenCalledWith(10);
  });

  it('debe manejar error al cargar producto', () => {
    routeMock.snapshot.params = { id: 99 };
    productsServiceSpy.getProductById.and.returnValue(
      throwError(() => new Error('Error'))
    );

    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/products']);
  });

  describe('addProduct()', () => {
    beforeEach(() => {
      component.name = 'Silla';
      component.category = 'Muebles';
      component.price = 100;
      component.stock = 5;
      component.available = true;
    });

    it('debe mostrar alerta si faltan campos', () => {
      component.name = '';
      component.addProduct();

      expect(window.alert).toHaveBeenCalled();
    });

    it('debe actualizar producto exitosamente', () => {
      component.isEditMode = true;
      component.id = 5;
      productsServiceSpy.updateProduct.and.returnValue(of({} as any));

      component.addProduct();

      expect(productsServiceSpy.updateProduct).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalled();
    });

    it('debe manejar error al actualizar', () => {
      component.isEditMode = true;
      component.id = 5;
      productsServiceSpy.updateProduct.and.returnValue(
        throwError(() => new Error('Falló'))
      );

      component.addProduct();

      expect(component.errorMessage).toContain('Error');
    });

    it('debe crear producto exitosamente', () => {
      component.isEditMode = false;
      productsServiceSpy.createProduct.and.returnValue(of({} as any));

      component.addProduct();

      expect(productsServiceSpy.createProduct).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalled();
    });

    it('debe manejar error 409', () => {
      component.isEditMode = false;
      const error409 = { status: 409, error: 'Ya existe' };
      productsServiceSpy.createProduct.and.returnValue(
        throwError(() => error409)
      );

      component.addProduct();

      expect(component.errorMessage).toContain('Error');
    });


    it('debe manejar error 400', () => {
      component.isEditMode = false;
      const error400 = { status: 400, error: 'Datos malos' };
      productsServiceSpy.createProduct.and.returnValue(
        throwError(() => error400)
      );

      component.addProduct();

      expect(component.errorMessage).toContain('Error');
    });


    it('debe manejar error sin status', () => {
      const errorSinStatus = {};
      productsServiceSpy.createProduct.and.returnValue(
        throwError(() => errorSinStatus)
      );

      component.addProduct();

      expect(component.errorMessage)
        .toBe('Error de conexión con el servidor.');
    });

  });
});
