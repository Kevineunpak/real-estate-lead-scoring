import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadScoringService {
  private apiUrl = 'http://127.0.0.1:5001/predict';  // Flask backend URL

  constructor(private http: HttpClient) {}

  getLeadScore(emailText: string): Observable<{ lead_score: number }> {
    const payload = { message: emailText };  // Data format expected by Flask
    return this.http.post<{ lead_score: number }>(this.apiUrl, payload);
  }
}
