import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let customerServiceSpy: jasmine.SpyObj<CustomerService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    customerServiceSpy = jasmine.createSpyObj('CustomerService', ['createCustomer']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        { provide: CustomerService, useValue: customerServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
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

    component.register();

    expect(window.alert).toHaveBeenCalledWith('Por favor, llena todos los campos obligatorios.');
    expect(customerServiceSpy.createCustomer).not.toHaveBeenCalled();
  });

  it('should show error message for invalid email format', () => {
    component.name = 'Jesus';
    component.password = '123456';
    component.email = 'correo-invalido'; 

    component.register();

    expect(component.errorMessage).toContain('El formato del correo es inválido');
    expect(customerServiceSpy.createCustomer).not.toHaveBeenCalled();
  });

  it('should register successfully and navigate to login', () => {
    spyOn(window, 'alert');
    
    component.id = 1;
    component.name = 'Jesus';
    component.email = 'jesus@test.com';
    component.password = 'password123';

    const mockResponse: any = { 
      id: 1, 
      name: 'Jesus', 
      email: 'jesus@test.com', 
      password: 'password123' 
    };

    customerServiceSpy.createCustomer.and.returnValue(of(mockResponse));

    component.register();

    expect(customerServiceSpy.createCustomer).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('¡Registro exitoso! Por favor inicia sesión.');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should handle 409 conflict error', () => {
    component.id = 1;
    component.name = 'Jesus';
    component.email = 'jesus@test.com';
    component.password = 'password123';

    const errorResponse = { status: 409, error: 'El correo ya existe' };
    customerServiceSpy.createCustomer.and.returnValue(throwError(() => errorResponse));

    component.register();

    expect(component.errorMessage).toContain('⛔ El correo ya existe');
  });

  it('should handle 400 bad request error', () => {
    component.id = 1;
    component.name = 'Jesus';
    component.email = 'jesus@test.com';
    component.password = 'password123';

    const errorResponse = { status: 400, error: 'Datos inválidos' };
    customerServiceSpy.createCustomer.and.returnValue(throwError(() => errorResponse));

    component.register();

    expect(component.errorMessage).toContain('⚠️ Datos inválidos');
  });

  it('should handle generic server error', () => {
    component.id = 1;
    component.name = 'Jesus';
    component.email = 'jesus@test.com';
    component.password = 'password123';

    const errorResponse = { status: 500, error: 'Internal Server Error' };
    customerServiceSpy.createCustomer.and.returnValue(throwError(() => errorResponse));

    component.register();

    expect(component.errorMessage).toBe('❌ Error de conexión con el servidor.');
  });
});