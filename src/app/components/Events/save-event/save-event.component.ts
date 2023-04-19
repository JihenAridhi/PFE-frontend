import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {EventService} from "../../../services/event.service";
import {Event} from "../../../entities/Event";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'save-add-event',
  templateUrl: './save-event.component.html',
  styleUrls: ['./save-event.component.css']
})
export class SaveEventComponent implements OnInit{

  event = new Event()
  constructor(private es: EventService, private router: Router) {}
  async addEvent(addF: NgForm)
  {
    let e = addF.value
    e.id = this.event.id
    this.es.save(e);
    await this.router.navigate(['account/edit-event'])
  }

  ngOnInit(): void
  {
    this.event = this.es.getItem('event')
    }

  async onFileSelected(files: any) {
    const file: File = files[0];
    const formData = new FormData();
    formData.append('file', file, this.event.id?.toString()+'.jpg');
    await this.es.setPhoto(formData).then()
  }
}
