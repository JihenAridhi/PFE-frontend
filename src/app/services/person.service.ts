import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {Person} from "../entities/Person";
import {AutorisationService} from "./autorisation.service";
import {Autorisation} from "../entities/Autorisation";


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  isAuthenticated = false
  constructor(private http: HttpClient, private router: Router, private as: AutorisationService) { }

  public get(id: number)
  {this.http.get('http://localhost:8000/person/get/'+id).subscribe((data: Person)=> localStorage.setItem('person', JSON.stringify(data)))}

  public getAll()
  {this.http.get<Person[]>('http://localhost:8000/person/getAll').subscribe(data=> localStorage.setItem('personList', JSON.stringify(data)))}

  public add(person: Person)
  {
    this.http.get('http://127.0.0.1:8000/person/getByEmail/'+person.email).subscribe(
      (data: Person)=>
      {
        if(data)
          alert('this email is already in use !!')
        else
          this.http.post('http://localhost:8000/person/add', person).subscribe(()=>alert('your request have been submitted, please wait for further confirmation.'))
      }
    )
  }
/*
  async login(person: Person) {
    const response = await fetch('http://127.0.0.1:8000/person/getByEmail/' + person.email, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const data = (await response.json());
    if(data)
    {
      if(person.password == data.password && data.status) {
        //this.as.getAutorisations(data)//.subscribe(auto => localStorage.setItem('autoList', JSON.stringify(auto)))
        this.as.getAutorisations(data).then( auto => console.log(auto))
        //localStorage.setItem('autoList', JSON.stringify(auto))
        this.isAuthenticated = true
        localStorage.setItem('isAuthenticated', 'true')
        this.router.navigate(['/account/profil'])
      }
      else if (!data.status) alert("your request haven't been accepted yet !!")
      else alert('incorrect password')
    }
    else alert('incorrect !!')
  }*/


  async login(person: Person)
  {
    await this.http.get('http://127.0.0.1:8000/person/getByEmail/'+person.email).toPromise().then(
      async (data?: Person)=>
      {
        if(data)
        {
          if(person.password == data.password && data.status) {
            localStorage.setItem('isAuthenticated', 'true')
            localStorage.setItem('person', JSON.stringify(data))
            await this.as.getAutorisations(data).then((auto?: Autorisation[]) => localStorage.setItem('autoList', JSON.stringify(auto?.map(r=>r.id))))
          }
          else if (!data.status) alert("your request haven't been accepted yet !!")
          else alert('incorrect password')
        }
        else alert('incorrect !!')
      }
    )
    this.router.navigate(['/account/profile'])

    /*.subscribe(
      (data: Person)=>
      {
        if(data)
        {
          if(person.password == data.password && data.status) {
            localStorage.setItem('isAuthenticated', 'true')
            localStorage.setItem('person', JSON.stringify(data))
            this.as.getAutorisations(data)
          }
          else if (!data.status) alert("your request haven't been accepted yet !!")
          else alert('incorrect password')
        }
        else alert('incorrect !!')
      }
    )*/
  }

  getStatus(status: any)
  {
    if (!status)
      status=0
    return this.http.get<Array<Person>>('http://localhost:8000/person/getAll/status/'+status).toPromise()
    //.subscribe(data => localStorage.setItem('personList', JSON.stringify(data)))
  }

  accept(person: Person)
  {this.http.put('http://localhost:8000/person/accept/'+person.id, true).subscribe()}

  update(person: Person)
  {this.http.put('http://127.0.0.1:8000/person/update', person).subscribe(() => alert('your information have been updated successfully !!'))}

  delete(person: Person)
  {this.http.delete('http://localhost:8000/person/delete/'+person.id).subscribe()}

}
