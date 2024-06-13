import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingApiService {
  private apiUrl = 'http://localhost:5028/api/HousingLocations';
  private subUrl = 'http://localhost:5028/api/ApplicationSubmissions';

  constructor(private http: HttpClient) {}

  getHousingLocations(): Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(this.apiUrl);
  }

  getHousingLocationById(id: number): Observable<HousingLocation> {
    return this.http.get<HousingLocation>(`${this.apiUrl}/${id}`);
  }

  submitApplication(firstName: string, lastName: string, email: string): Observable<any> {
    const application = { firstName, lastName, email };
    return this.http.post(this.subUrl, application);
  }
  
}
