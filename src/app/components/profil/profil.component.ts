import {Component, OnInit} from '@angular/core';
import {PersonService} from "../../services/person.service";
import {Person} from "../../entities/Person";



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit{

  person: Person = new Person();

  constructor(private ps: PersonService) {}

  toggle(): void {
    const popup: HTMLElement | null = document.getElementById('popup');
    if (popup) {popup.classList.toggle('active');}
  }

  ngOnInit(): void {
    this.ps.person.asObservable().subscribe(data => this.person = data)
  }


}
