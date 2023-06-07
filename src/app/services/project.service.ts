import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private http: HttpClient) { }

  delete(id: number | undefined) {
    this.http.delete('http://localhost:8000/project/delete/'+id).subscribe()
  }
}
