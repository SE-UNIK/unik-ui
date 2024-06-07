import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  private baseUrl = 'http://192.168.0.230:8080/api/metadata';

  constructor(private http: HttpClient) { }

  getAllMetadata(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getMetadataById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createMetadata(metadata: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, metadata);
  }

  updateMetadata(id: string, metadata: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, metadata);
  }

  deleteMetadata(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

