import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerAddComponent } from './customer-add.component';
import { CustomerService } from 'src/app/service/customer.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('CustomerAddComponent', () => {
  let component: CustomerAddComponent;
  let fixture: ComponentFixture<CustomerAddComponent>;
  let customerServiceSpy: jasmine.SpyObj<CustomerService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    customerServiceSpy = jasmine.createSpyObj('CustomerService', ['createCustomer']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ CustomerAddComponent ],
      providers: [
        { provide: CustomerService, useValue: customerServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should alert if fields are empty', () => {
    spyOn(window, 'alert');
    component.name = '';
    component.email = '';
    component.password = '';

    component.addCustomer();

    expect(window.alert).toHaveBeenCalledWith('Por favor, llena todos los campos obligatorios.');
    expect(customerServiceSpy.createCustomer).not.toHaveBeenCalled();
  });

  it('should show error message for invalid email format', () => {
    component.name = 'Test User';
    component.password = '123456';
    component.email = 'correo-invalido'; 

    component.addCustomer();

    expect(component.errorMessage).toContain('El formato del correo es inválido');
    expect(customerServiceSpy.createCustomer).not.toHaveBeenCalled();
  });

  it('should add customer successfully', () => {
    spyOn(window, 'alert');
    
    component.id = 1;
    component.name = 'Test User';
    component.email = 'test@test.com';
    component.password = 'password123';

    const mockResponse: any = { 
      id: 1, 
      name: 'Test User', 
      email: 'test@test.com', 
      password: 'password123' 
    };

    customerServiceSpy.createCustomer.and.returnValue(of(mockResponse));

    component.addCustomer();

    expect(customerServiceSpy.createCustomer).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('¡Registro exitoso!');
  });

  it('should handle 409 conflict error', () => {
    component.id = 1;
    component.name = 'Test User';
    component.email = 'test@test.com';
    component.password = 'password123';

    const errorResponse = { status: 409, error: 'El correo ya existe' };
    customerServiceSpy.createCustomer.and.returnValue(throwError(() => errorResponse));

    component.addCustomer();

    expect(component.errorMessage).toContain('⛔ El correo ya existe');
  });

  it('should handle 400 bad request error', () => {
    component.id = 1;
    component.name = 'Test User';
    component.email = 'test@test.com';
    component.password = 'password123';

    const errorResponse = { status: 400, error: 'Datos inválidos' };
    customerServiceSpy.createCustomer.and.returnValue(throwError(() => errorResponse));

    component.addCustomer();

    expect(component.errorMessage).toContain('⚠️ Datos inválidos');
  });

  it('should handle generic server error', () => {
    component.id = 1;
    component.name = 'Test User';
    component.email = 'test@test.com';
    component.password = 'password123';

    const errorResponse = { status: 500, error: 'Internal Server Error' };
    customerServiceSpy.createCustomer.and.returnValue(throwError(() => errorResponse));

    component.addCustomer();

    expect(component.errorMessage).toBe('❌ Error de conexión con el servidor.');
  });
});