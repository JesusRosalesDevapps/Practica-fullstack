import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('currentUser');
    console.log("AuthGuard: "+token)
    // Revisamos si el usuario está logueado
    if (token) {
      // Si existe, dejamos pasar
      return true;
    } else {
      // Si no existe, lo mandamos de regreso al Login
      this.router.navigate(['/login']); 
      return false;
    }
  }
}
