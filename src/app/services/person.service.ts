import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {Person} from "../entities/Person";
import {Autorisation} from "../entities/Autorisation";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  person = new BehaviorSubject<Person>(new Person());
  autorisations = new BehaviorSubject<any>(new Array<Autorisation>());

  constructor(private http: HttpClient, private router: Router) { }

  public add(person: Person)
  {
    this.http.get('http://127.0.0.1:8000/person/getByEmail/'+person.email).subscribe(
      (data: Person)=>
      {
        console.log(data)
        if(data)
          alert('this email is already in use !!')
        else
          this.http.post('http://localhost:8000/person/add', person).subscribe(()=>alert('your request have been submitted, please wait for further confirmation.'))
      }
    )
  }


  login(person: Person)
  {
    this.http.get('http://127.0.0.1:8000/person/getByEmail/'+person.email).subscribe(
      (data: Person)=>
      {
        if(data)
        {
          if(person.password == data.password && data.status) {
            this.router.navigate(['/account/profil'])
            this.person.next(data)
            this.http.get('http://localhost:8000/person/' + data.id + '/getAutorisations').subscribe(
              (auto) => this.autorisations.next(auto)
            )
          }
          else if (!data.status) alert("your request haven't been accepted yet !!")
          else alert('incorrect password')
        }
        else alert('incorrect !!')
    }
  )}

  update(person: Person) {console.log(person);this.http.put('http://127.0.0.1:8000/person/update', person).subscribe(() => alert('your information have been updated successfully !!'))}
}
