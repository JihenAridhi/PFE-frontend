import { Component } from '@angular/core';

@Component({
  selector: 'app-update-profil',
  templateUrl: './update-profil.component.html',
  styleUrls: ['./update-profil.component.css']
})
export class UpdateProfilComponent {


   toggle() {
    let blur=document.getElementById('blur');
     let popup = document.getElementById('popup');
    if(blur!=null && popup!=null) {
      blur.classList.toggle('active');
      popup.classList.toggle('active');
    }
  }

}
