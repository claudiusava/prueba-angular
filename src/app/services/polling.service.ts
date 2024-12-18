import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollingService {
  private apiUrl = '/api/csrng/csrng.php?min=1&max=100';

  constructor(private http: HttpClient) { }

  getRandomNumbers(): Observable<{ random: number }[]> {
    return this.http.get<{ random: number }[]>(this.apiUrl);
  }
}
