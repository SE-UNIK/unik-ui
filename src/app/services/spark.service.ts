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
    let url = '';
    switch (algorithmName) {
      case 'wordcount':
        url = `${this.baseUrl}/submit/wordcount`;
        break;
      case 'kmeans':
        url = `${this.baseUrl}/submit/kmeans`;
        break;
      case 'tfidf':
        url = `${this.baseUrl}/submit/tfidf`;
        break;
      default:
        throw new Error('Invalid algorithm name');
    }
    return this.http.post(url, sparkModel);
  }

  downloadResults(): Observable<Blob> {
    const headers = new HttpHeaders({ 'Accept': 'application/octet-stream' });
    return this.http.get(`${this.baseUrl}/results`, { headers, responseType: 'blob' });
  }
}

