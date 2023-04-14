import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Person} from "../entities/Person";
import {AutorisationService} from "./autorisation.service";
import {Autorisation} from "../entities/Autorisation";
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  constructor(private http: HttpClient, private router: Router, private as: AutorisationService) { }

  public get(id: number)
  {this.http.get('http://localhost:8000/person/get/'+id).subscribe((data: Person)=> localStorage.setItem('person', JSON.stringify(data)))}

  public getAll()
  {return this.http.get<Person[]>('http://localhost:8000/person/getAll').toPromise()/*.subscribe(data=> localStorage.setItem('personList', JSON.stringify(data)))*/}

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

  async login(person: Person)
  {
    await this.http.get('http://127.0.0.1:8000/person/getByEmail/'+person.email).toPromise().then(
      async (data?: Person)=>
      {
        if(data)
        {
          if(person.password == data.password && data.status) {
            this.setItem('person', data)
            await this.as.getAutorisations(data).then(
              (auto?: Autorisation[]) => {
                this.as.setItem('autoList', auto?.map(r => r.id))
              }
            )
            await this.router.navigate(['/account/profile'])
          }
          else if (!data.status) alert("your request haven't been accepted yet !!")
          else alert('incorrect password')
        }
        else alert('incorrect !!')
      }
    )
  }

  getStatus(status: any)
  {
    if (!status)
      status=0
    return this.http.get<Array<Person>>('http://localhost:8000/person/getAll/status/'+status).toPromise()
  }

  accept(person: Person)
  {this.http.put('http://localhost:8000/person/accept/'+person.id, true).subscribe()}

  update(person: Person)
  {this.http.put('http://127.0.0.1:8000/person/update', person).subscribe()}

  delete(person: Person)
  {this.http.delete('http://localhost:8000/person/delete/'+person.id).subscribe()}

  setPhoto(formData: FormData)
  {return this.http.post<string>('http://localhost:8000/photo/user', formData).toPromise()}

  getPhoto(id: any)
  {return this.http.get<string>('http://localhost:8000/photo/user/get/'+id).toPromise()}

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
