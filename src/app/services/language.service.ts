import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private http: HttpClient) { }

  switchTo(language: string)
  {localStorage.setItem('language', language)}
  getLanguage()
  {
    let language=localStorage.getItem('language')
    if (!language)
      language = 'english'
    return this.http.get('/assets/languages/'+language+'.json')
  }
}
