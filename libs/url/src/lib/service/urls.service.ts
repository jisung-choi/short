import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotUsedUrl, UsedUrl } from '../model/url';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {
  apiURLUsed = environment.apiURL+'uu';
  apiURLnotUsed = environment.apiURL+'nuu';

  constructor(private http: HttpClient){}

  getOriginal(id: string): Observable<UsedUrl>{
    return this.http.get<UsedUrl>(`${this.apiURLUsed}/get/${id}`);
  }

  getNewId(): Observable<NotUsedUrl>{
    return this.http.get<NotUsedUrl>(`${this.apiURLnotUsed}/get`);
  }
  
  registerNewUrl(usedUrl: UsedUrl): Observable<UsedUrl>{
    return this.http.post<UsedUrl>(`${this.apiURLUsed}/register`, usedUrl);
  }
}
