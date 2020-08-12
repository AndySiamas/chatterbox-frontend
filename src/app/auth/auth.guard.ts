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

  public async canActivate(route: ActivatedRouteSnapshot, 
                           state: RouterStateSnapshot): Promise<boolean> {
    this.authService.setUsernameAndTokenFromCookies();
    let isAuthenticated: boolean = await this.authService.isAuthenticated();
    if (isAuthenticated) {
      this.authService.emitAuthorizedEvent();
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
