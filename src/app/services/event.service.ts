import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Event} from "../entities/Event";

@Injectable({
  providedIn: 'root'
})
export class EventService
{
  constructor(private http: HttpClient) { }

  public add(event: Event) {console.log(event);this.http.post('http://127.0.0.1:8000/api/events', event).subscribe(()=>console.log('success'))}
}
