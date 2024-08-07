import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MsTransaltorService {

  constructor(private http: HttpClient) {}

  translateText(text: string): Observable<any> {

    const url = 'http://livogenapi.madebysparkt.com/api/translate';
    const params = { text };
    return this.http.get(url, { params });
  }
  
}
