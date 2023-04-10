import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Event} from "../entities/Event";
import {BehaviorSubject} from "rxjs";
import {News} from "../entities/News";

@Injectable({
  providedIn: 'root'
})
export class EventService
{
  event = new BehaviorSubject<Event>(new Event())
  constructor(private http: HttpClient) { }

  getAll()
  {return this.http.get<Event[]>('http://localhost:8000/event/getAll')/*.subscribe(data => this.allEvents.next(data))*/}
  public add(event: Event) {console.log(event);this.http.post('http://127.0.0.1:8000/event/add', event).subscribe(()=>console.log('success'))}

  save(event: Event)
  {
    if(event.id)
      this.http.put('http://localhost:8000/event/update', event).subscribe(()=> alert('changes have been affected successfully !!'))
    else
      this.http.post('http://localhost:8000/event/add', event).subscribe(()=> alert('news have been posted successfully !! '))
  }

  get(id: number|undefined){this.http.get('http://localhost:8000/event/get/'+id).subscribe(
    (data: News) =>
      this.event.next(data)
  )}
}
