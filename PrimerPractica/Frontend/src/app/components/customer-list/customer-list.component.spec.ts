import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerListComponent } from './customer-list.component';
import { CustomerService } from 'src/app/service/customer.service';
import { of, throwError } from 'rxjs'; // Importante para simular observables

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let customerServiceSpy: jasmine.SpyObj<CustomerService>;

  const mockResponse = {
    content: [{ id: 1, name: 'Cliente Test' }],
    totalPages: 5,
    first: true,
    last: false,
    number: 0
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CustomerService', ['getCustomerList', 'deleteCustomerById']);

    await TestBed.configureTestingModule({
      declarations: [ CustomerListComponent ],
      providers: [
        { provide: CustomerService, useValue: spy }
      ]
    })
    .compileComponents();

    customerServiceSpy = TestBed.inject(CustomerService) as jasmine.SpyObj<CustomerService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    customerServiceSpy.getCustomerList.and.returnValue(of(mockResponse));
    fixture.detectChanges(); 
    expect(component).toBeTruthy();
  });

  it('should load customers on init', () => {
    customerServiceSpy.getCustomerList.and.returnValue(of(mockResponse));
    fixture.detectChanges(); 

    expect(component.customers.length).toBe(1);
    expect(component.totalPages).toBe(5);
    expect(component.isFirst).toBeTrue();
    expect(component.isLast).toBeFalse();
    expect(customerServiceSpy.getCustomerList).toHaveBeenCalledWith(0, 5);
  });

  it('should handle error when loading customers', () => {
    const errorResponse = new Error('Error de red');
    customerServiceSpy.getCustomerList.and.returnValue(throwError(() => errorResponse));
    
    spyOn(console, 'error');
    component.listCustomers();
    expect(console.error).toHaveBeenCalledWith(errorResponse);
  });

  it('should update current page and reload list', () => {
    customerServiceSpy.getCustomerList.and.returnValue(of(mockResponse));
    component.cambiarPagina(2);

    expect(component.currentPage).toBe(2);
    expect(customerServiceSpy.getCustomerList).toHaveBeenCalledWith(2, 5);
  });

  it('should delete customer and reload list', () => {
    customerServiceSpy.deleteCustomerById.and.returnValue(of({})); 
    customerServiceSpy.getCustomerList.and.returnValue(of(mockResponse));
    
    spyOn(component, 'listCustomers').and.callThrough();
    component.deleteCustomer(123);
    expect(customerServiceSpy.deleteCustomerById).toHaveBeenCalledWith(123);
    expect(component.listCustomers).toHaveBeenCalled();
  });
});