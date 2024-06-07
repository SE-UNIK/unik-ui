import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({

  providedIn: 'root'
})
export class SparkService {

  private baseUrl = 'http://192.168.0.230:8080/spark';

  constructor(private http: HttpClient) { }

  submitSparkJob(sparkModel: any, fileName: string, hdfsFilePath: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit`, { sparkModel, fileName, hdfsFilePath });
  }
  downloadResults(): Observable<Blob> {
    const headers = new HttpHeaders({ 'Accept': 'application/octet-stream' });
    return this.http.get(`${this.baseUrl}/results`, { headers, responseType: 'blob' });
  }
  // Add other Spark-related API interactions here
}

