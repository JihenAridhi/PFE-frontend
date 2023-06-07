import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Event} from "../entities/Event";
import {BehaviorSubject} from "rxjs";
import {News} from "../entities/News";
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class EventService
{
  event = new BehaviorSubject<Event>(new Event())
  constructor(private http: HttpClient) { }

  getAll()
  {return this.http.get<Event[]>('http://localhost:8000/event/getAll').toPromise()/*.subscribe(data => this.allEvents.next(data))*/}

  save(event: Event)
  {
    if(event.id)
      this.http.put('http://localhost:8000/event/update', event).subscribe(()=> alert('changes have been affected successfully !!'))
    else
      this.http.post('http://localhost:8000/event/add', event).subscribe(()=> alert('news have been posted successfully !! '))
  }

  get(id?: number){return this.http.get('http://localhost:8000/event/get/'+id).toPromise()/*.subscribe(
    (data: News) =>
      this.event.next(data)
  )*/}

  delete(id?: number) {
     this.http.delete('http://localhost:8000/event/delete/'+id).subscribe()
  }

  setPhoto(formData: FormData)
  {return this.http.post<string>('http://localhost:8000/photo/event/', formData).toPromise()}

  getPhoto(id: any)
  {return this.http.get<string>('http://localhost:8000/photo/event/get/'+id).toPromise()}

  /*setItem(key: string, value: any) {
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
  }*/
}
