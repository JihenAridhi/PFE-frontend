import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Feedback} from "../entities/Feedback";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  add(feedback: Feedback){this.http.post('http://localhost:8000/feedback/add', feedback).subscribe(()=>alert('your message have been submitted successfully, thank you for your feedback'))}

  getAll(){return this.http.get<Feedback[]>('http://localhost:8000/feedback/getAll').toPromise()}
}
