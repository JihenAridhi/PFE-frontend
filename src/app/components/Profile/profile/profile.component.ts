import {Component, OnInit} from '@angular/core';
import {Person} from "../../../entities/Person";
import {PersonService} from "../../../services/person.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
  person: Person = new Person();
  url = ''

  constructor(private ps: PersonService, private route: ActivatedRoute) {}

  async ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (id)
      await this.ps.get(id).then(data => this.person = data!)
    else
      this.person = this.ps.getItem('person')
    await this.ps.getPhoto(this.person.id).then(data => this.url = data!)
    console.log(this.person)
  }
}
