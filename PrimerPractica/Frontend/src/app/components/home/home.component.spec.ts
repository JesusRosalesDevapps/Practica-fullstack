import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit no debe lanzar errores', () => {
    expect(() => component.ngOnInit()).not.toThrow();
  });

  it('logout debe eliminar currentUser del localStorage y navegar a /login', () => {
    spyOn(localStorage, 'removeItem');

    component.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('currentUser');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
