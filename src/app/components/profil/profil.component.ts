import { Component } from '@angular/core';



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent {



  toggle(): void {

    const popup: HTMLElement | null = document.getElementById('popup');
    if (popup) {popup.classList.toggle('active');}
  }




}
