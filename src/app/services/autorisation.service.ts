import {Injectable} from '@angular/core';
import {Person} from "../entities/Person";
import {Autorisation} from "../entities/Autorisation";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AutorisationService {

  autorisations = new BehaviorSubject<Array<number>>([])
  constructor(private http: HttpClient, private router: Router) { }

  getAllAutorisations() { return this.http.get<number[][]>('http://localhost:8000/autorisation/getAll').toPromise()
    //.subscribe(data => localStorage.setItem('allAutoList', JSON.stringify(data)))
     }

  getAutorisations(person: Person) { return this.http.get<Autorisation[]>('http://localhost:8000/person/' + person.id + '/getAutorisations').toPromise()
    /*.subscribe(auto =>
  {
    localStorage.setItem('autoList', JSON.stringify(auto.map(r=>r.id)))
    this.router.navigate(['/account/profil'])
  })*/}

  addAutorisation(idP: number|undefined, idA: number)
  {this.http.post('http://localhost:8000/person/'+idP+'/addAutorisation/'+idA, null).subscribe()}

  deletePerson(idP: number|undefined, idA: number)
  {this.http.delete('http://localhost:8000/person/'+idP+'/deleteAutorisation/'+idA).subscribe()}

/*  async getAutorisations(person: Person): Promise<number[]> {
    const response = await fetch('http://127.0.0.1:8000/person/' + person.id + '/getAutorisations', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok)
      throw new Error(`Error! status: ${response.status}`);
    return (await response.json()).map((r: Autorisation) => r.id)
  }*/


}
