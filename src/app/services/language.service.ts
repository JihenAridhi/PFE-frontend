import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  toFrench(){localStorage.setItem('language','french')}
  toEnglish(){localStorage.removeItem('language')}
  getLanguage()
  {
    let language='english'
    if (localStorage.getItem('language'))
      language='french'
    return this.http.get('/assets/languages/'+language+'.json')
  }
}
