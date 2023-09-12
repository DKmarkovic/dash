import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  constructor(private http: HttpClient) {} // Inject the HttpClient here

  getUserRoles(): Observable<string[]> {
    // Make an API request to fetch user roles from your server
    // You can return an Observable<string[]> from here
    // Example API request using HttpClient:
    return this.http.get<string[]>('/user-roles');
  }
}
