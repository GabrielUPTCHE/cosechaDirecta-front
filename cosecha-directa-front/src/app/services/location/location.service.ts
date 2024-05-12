import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  url: string = `${environment.SERVER_URL}location`;

  constructor(private httpClient: HttpClient) { }

  getDepartments(): Observable<Location[]>{
    return this.httpClient.get<Location[]>(`${this.url}/get-all-departments`)
  }


  getCitiesByDepartment(department:string): Observable<Location[]>{
    return this.httpClient.get<Location[]>(`${this.url}/get-cities/${department}`)
  }

}
