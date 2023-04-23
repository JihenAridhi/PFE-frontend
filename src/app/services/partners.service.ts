import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Partner} from "../entities/Partner";
import {News} from "../entities/News";

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  constructor(private http: HttpClient) { }

  getAll()
  {return this.http.get<Partner[]>('http://localhost:8000/partner/getAll').toPromise()}

  get(id: number) {return this.http.get('http://localhost:8000/partner/get/'+id).toPromise()}

  setPhoto(formData: FormData)
  {return this.http.post<string>('http://localhost:8000/photo/partner', formData).toPromise()}

  getPhoto(id?: number)
  {return this.http.get<string>('http://localhost:8000/photo/partner/get/'+id).toPromise()}

  save(partner: Partner)
  {
    if(!partner.id)
      this.http.post('http://localhost:8000/partner/add', partner).subscribe(()=> alert('news have been posted successfully !! '))
    else
      this.http.put('http://localhost:8000/partner/update', partner).subscribe(()=> alert('changes have been affected successfully !!'))
  }

  delete(id: number | undefined) {this.http.delete('http://localhost:8000/partner/delete/'+id)}
}
