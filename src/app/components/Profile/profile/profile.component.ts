import {Component, OnInit} from '@angular/core';
import {Person} from "../../../entities/Person";
import {PersonService} from "../../../services/person.service";




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{

  person: Person = new Person();
  url = ''

  constructor(private ps: PersonService) {}

  toggle(): void {
    const popup: HTMLElement | null = document.getElementById('popup');
    if (popup) {popup.classList.toggle('active');}
  }

  ngOnInit(): void {
    /*let p = localStorage.getItem('person')
    if (p)
      this.person = JSON.parse(p)*/
    this.person = this.ps.getItem('person')
    this.ps.getPhoto(this.person.id).then(data => {
      if (data)
        this.url = data
    })
  }


}
