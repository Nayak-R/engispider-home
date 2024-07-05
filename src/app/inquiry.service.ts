import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private apiUrl = 'https://engispider.com/server/inquiry/';

  constructor(private http: HttpClient) { }

  createInquiry(inquiryData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}createInquiry`, inquiryData);
  }

  demoBooking(inquiryData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}demo-booking`, inquiryData);
  }
  
}