import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: boolean = true;

  public constructor() {}

  public isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.isLoggedIn) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    })
  } 

}
