import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SparkService {
  private baseUrl = 'http://192.168.0.230:8080/spark';

  constructor(private http: HttpClient) { }

  submitSparkJob(sparkModel: any, algorithmName: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit`, sparkModel, { params: { algorithmName } });
  }

  downloadResults(): Observable<Blob> {
    const headers = new HttpHeaders({ 'Accept': 'application/octet-stream' });
    return this.http.get(`${this.baseUrl}/results`, { headers, responseType: 'blob' });
  }
}

