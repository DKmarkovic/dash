import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { AuthModel } from "./auth-model";
import { Observable, Subject } from 'rxjs';
@Injectable()
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";
  private token: string | null = null;
  private authenticatedSub = new Subject<boolean>();
  private isAuthenticated = false;
  private logoutTimer: any;
  private tokenTimer: any; // Use any or specify a more appropriate type
  
  constructor(private http: HttpClient,
              private _router: Router) { }


  getIsAuthenticated(){
                return this.isAuthenticated;
            }
  registerUser(user : any) {
    return this.http.post<any>(this._registerUrl, user)
  }

  getAuthenticatedSub(){
    return this.authenticatedSub.asObservable();
}

loginUser(username: string, password: string) {
    const authData = { username: username, password: password };

    this.http.post<{ token: string; expiresIn: number }>(this._loginUrl, authData)
      .subscribe(
        (res) => {
          this.token = res.token;
          if (this.token) {
            this.authenticatedSub.next(true);
            this.isAuthenticated = true;
            this._router.navigate(['/']);

            // Clear existing logout timer if there is one
            if (this.logoutTimer) {
              clearTimeout(this.logoutTimer);
            }

            // Set a new logout timer based on expiresIn
            this.logoutTimer(res.expiresIn);

            // Calculate the expiration time
            const now = new Date();
            const expiresInDuration = res.expiresIn * 1000; // Convert seconds to milliseconds
            const expiresDate = new Date(now.getTime() + expiresInDuration);

            // Store login details
            this.storeLoginDetails(this.token, expiresDate);
          }
        },
        (error) => {
          // Handle authentication errors here
          console.error('Authentication failed', error);
          this.isAuthenticated = false;
          this.authenticatedSub.next(false);
        }
      );
  }
  
  
  
  

    // Add a method to log the user out
    logoutUser() {
        this.token = null;
        this.isAuthenticated = false;
        clearTimeout(this.tokenTimer);
        this.clearLoginDetails();
        this.authenticatedSub.next(false);
        this._router.navigate(['/login']); // Redirect to the login page or another appropriate route
      }
    
      // Add a method to automatically log out the user when the token expires
      private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
          this.logoutUser();
        }, duration);
      }
    

  storeLoginDetails(token: string, expirationDate: Date){
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expirationDate.toISOString());
}
  getToken() {
    return this.token;
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }

  clearLoginDetails(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
}

  getLocalStorageData(){
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');

    if(!token || !expiresIn){
        return;
    }
    return {
        'token': token,
        'expiresIn': new Date(expiresIn)
    }
}
authenticateFromLocalStorage(){
    const localStorageData = this.getLocalStorageData();
    if(localStorageData){
        const now = new Date();
        const expiresIn = localStorageData.expiresIn.getTime() - now.getTime();

        if(expiresIn > 0){
            this.token = localStorageData.token;
            this.isAuthenticated = true;
            this.authenticatedSub.next(true);
            this.logoutTimer.setTimeout(expiresIn / 1000);
        }
    }
}

}