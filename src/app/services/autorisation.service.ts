import { Injectable } from '@angular/core';
import {Person} from "../entities/Person";
import {Autorisation} from "../entities/Autorisation";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AutorisationService {

  autorisations:  BehaviorSubject<Array<number>> = new BehaviorSubject<Array<number>>([])

  constructor(private http: HttpClient) { }

  getAutorisations(person: Person)
  {this.http.get<Array<Autorisation>>('http://localhost:8000/person/' + person.id + '/getAutorisations').subscribe(
    (auto: Autorisation[]) => this.autorisations.next(auto.map(r=>r.id)))}

  addAutorisation(idP: number, idA: number)
  {this.http.post('http://localhost:8000/person/'+idP+'/addAutorisation/'+idA, null).subscribe()}
}
