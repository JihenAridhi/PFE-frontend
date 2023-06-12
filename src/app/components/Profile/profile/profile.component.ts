import {Component, OnInit} from '@angular/core';
import {Person} from "../../../entities/Person";
import {PersonService} from "../../../services/person.service";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
  person: Person = new Person();
  url = ''
  cvExisits = false

  constructor(private ps: PersonService, private route: ActivatedRoute, private http: HttpClient) {}

  async ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (id)
      await this.ps.get(id).then(data => this.person = data!)
    else
      this.person = this.ps.getItem('person')
    this.http.get('http://localhost:4200/assets/CV/'+this.person.id+'.pdf', { responseType: 'blob' }).subscribe(data => {if (data) this.cvExisits = true})
  }
}
