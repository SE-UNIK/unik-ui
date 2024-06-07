import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  private baseUrl = '/api/metadata';

  constructor(private http: HttpClient) { }

  getAllFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getFileById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}

