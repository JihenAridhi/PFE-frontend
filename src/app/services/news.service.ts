import { Injectable } from '@angular/core';
import {News} from "../entities/News";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news = new BehaviorSubject<News>(new News())
  constructor(private http: HttpClient, private router: Router) {}

  getAll(){return this.http.get<News[]>('http://localhost:8000/news/getAll').toPromise()}

  get(id?: number){return this.http.get('http://localhost:8000/news/get/'+id).toPromise()}

  save(news: News)
  {
    if(!news.id)
      this.http.post('http://localhost:8000/news/add', news).subscribe(()=> alert('news have been posted successfully !! '))
    else
      this.http.put('http://localhost:8000/news/update', news).subscribe(()=> alert('changes have been affected successfully !!'))
  }

  delete(id?: number) { this.http.delete('http://localhost:8000/news/delete/'+id).subscribe()}

  setPhoto(formData: FormData)
  {return this.http.post<string>('http://localhost:8000/photo/news', formData).toPromise()}

  getPhoto(id: any)
  {return this.http.get<string>('http://localhost:8000/photo/news/get/'+id).toPromise()}

  setItem(key: string, value: any) {
    const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), 'key').toString();
    localStorage.setItem(key, encryptedValue);
  }

  getItem(key: string): any {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {
      const decryptedValue = CryptoJS.AES.decrypt(encryptedValue, 'key').toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedValue);
    }
    return null;
  }
}
