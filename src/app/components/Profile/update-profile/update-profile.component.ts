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
  url = '';
  showContent = true;

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
    this.person = this.ps.getItem('person')

    this.ps.getPhoto(this.person.id).then(data => {if (data) this.url = data})
  }

  update(updateF: NgForm) {
    this.person.firstName = updateF.value.firstName
    this.person.lastName = updateF.value.lastName
    this.person.email = updateF.value.email
    this.person.interest = updateF.value.interest

    this.ps.update(this.person)
    alert('your information have been updated successfully !!')
  }


  updatePass(updateP: NgForm) {
    if(updateP.value.newP !=updateP.value.confirmP)
      alert('please confirm your new password')
    else {
      this.person.password = updateP.value.newP
      this.ps.update(this.person)
      alert('your information have been updated successfully !!')
    }
  }

  onFileSelected(files: any): void {
    const file: File = files[0];
    const formData = new FormData();
    formData.append('file', file, this.person.id?.toString()+'.jpg');
    this.ps.setPhoto(formData).then(() => {
      this.ps.getPhoto(this.person.id)
      this.showContent = false;
      setTimeout(() => {
        this.showContent = true;
      }, 1000);
    })

  }



}
