import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import { of, throwError } from 'rxjs'; // Necesario para simular respuestas del servicio

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  
  const customerServiceSpy = jasmine.createSpyObj('CustomerService', ['login']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: CustomerService, useValue: customerServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    routerSpy.navigate.calls.reset(); 
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should redirect to home if user is already logged in (ngOnInit)', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fake-token');
    
    fixture.detectChanges(); 

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should NOT redirect if user is not logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    
    fixture.detectChanges();

    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should login successfully, save to storage and navigate', () => {
    fixture.detectChanges();
    const mockUser = { name: 'Jesus', token: '123' };
    
    customerServiceSpy.login.and.returnValue(of(mockUser));
    
    spyOn(localStorage, 'setItem');

    component.login('Jesus', '123456');

    expect(customerServiceSpy.login).toHaveBeenCalledWith({ name: 'Jesus', password: '123456' });
    expect(localStorage.setItem).toHaveBeenCalledWith('currentUser', JSON.stringify(mockUser));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show alert on login error', () => {
    fixture.detectChanges();
    
    customerServiceSpy.login.and.returnValue(throwError(() => new Error('Error de servidor')));
    spyOn(window, 'alert');
    component.login('Jesus', 'bad-pass');

    expect(window.alert).toHaveBeenCalledWith('Credenciales incorrectas');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});