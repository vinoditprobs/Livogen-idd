import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LeadsServiceService {

  private createUrl = 'http://livogenapi.madebysparkt.com/api/leads/create'; 
  private apiUrl = 'http://livogenapi.madebysparkt.com/api/leads'; 

  constructor(private http: HttpClient) { }

  createLead(formData: FormData): Observable<any> {
    return this.http.post(this.createUrl, formData);
  }


  getLeads(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
