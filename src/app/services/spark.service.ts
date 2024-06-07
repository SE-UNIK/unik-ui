import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SparkService {
  private baseUrl = '/spark';

  constructor(private http: HttpClient) { }

  submitSparkJob(sparkModel: any, fileName: string, hdfsFilePath: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit`, { sparkModel, fileName, hdfsFilePath });
  }

  getAnalysisResults(): Observable<any> {
    return this.http.get(`${this.baseUrl}/results`);
  }
}

