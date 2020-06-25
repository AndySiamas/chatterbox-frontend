import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  public constructor(private authService: AuthService,
                     private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, 
                     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
                           .then((isAuthenticated: boolean) => {
                              if (isAuthenticated) {
                                return true;
                              } else {
                                this.router.navigate(['/login']);
                                return false;
                              }
                           });
  }
}
