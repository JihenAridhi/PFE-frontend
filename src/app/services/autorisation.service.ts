import {Injectable} from '@angular/core';
import {Person} from "../entities/Person";
import {Autorisation} from "../entities/Autorisation";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AutorisationService {

  autorisations = new BehaviorSubject<Array<number>>([])
  constructor(private http: HttpClient, private router: Router) { }

  getAllAutorisations() { return this.http.get<number[][]>('http://localhost:8000/autorisation/getAll').toPromise()   }

  getAutorisations(person: Person) { return this.http.get<Autorisation[]>('http://localhost:8000/person/' + person.id + '/getAutorisations').toPromise()}

  addAutorisation(idP?: number, idA?: number)
  {this.http.post('http://localhost:8000/person/'+idP+'/addAutorisation/'+idA, null).subscribe()}

  deletePerson(idP?: number, idA?: number)
  {this.http.delete('http://localhost:8000/person/'+idP+'/deleteAutorisation/'+idA).subscribe()}

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
