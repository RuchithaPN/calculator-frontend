import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { users } from '../Model/login';

@Injectable({
  providedIn: 'root'
})
export class Services {
  private apiUrl = 'http://localhost:3000'; // replace with your API endpoint
  SendEmail: any;

  constructor(private http: HttpClient) {}

  getRandom(): string {
    const number = Math.floor(Math.random() * 999999);
    return number.toString().padStart(6, '0');
  }

  sendEmail(user: users): Observable<boolean> {
    const fromEmail = 'benjiealcontin23@gmail.com';
    const password = 'fdjcwkzyozcoefcq';

    const emailData = {
      fromEmail: fromEmail,
      toEmail: user.email,
      subject: 'User Email Verification',
      message: `Registered successfully. Please verify your account using this code: ${user.code}`
    };

    return this.http.post<boolean>(`${this.apiUrl}/send-email`, emailData);
  }

  createUser(user: users): Observable<users> {
    return this.http.post<users>(`${this.apiUrl}/create-user`, user);
  }

  getUser(username: string): Observable<users> {
    return this.http.get<users>(`${this.apiUrl}/get-user/${username}`);
  }
}
