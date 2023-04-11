import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Person} from "../../../entities/Person";
import {PersonService} from "../../../services/person.service";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit{

  person: Person = new Person();

  constructor(private ps: PersonService) {}

   toggle() {
    let blur=document.getElementById('blur');
     let popup = document.getElementById('popup');
    if(blur!=null && popup!=null) {
      blur.classList.toggle('active');
      popup.classList.toggle('active');
    }
  }

  ngOnInit(): void {
    let p = localStorage.getItem('person')
    if (p)
      this.person = JSON.parse(p)
  }

  update(updateF: NgForm) {
    this.person.firstName = updateF.value.firstName
    this.person.lastName = updateF.value.lastName
    this.person.email = updateF.value.email
    this.person.interest = updateF.value.interest

    this.ps.update(this.person)
  }


  updatePass(updateP: NgForm) {
    if(updateP.value.newP !=updateP.value.confirmP)
      alert('please confirm your new password')
    else {
      this.person.password = updateP.value.newP
      this.ps.update(this.person)
    }
  }
}
