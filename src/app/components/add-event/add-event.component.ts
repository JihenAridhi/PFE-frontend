import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {EventService} from "../../services/event.service";
import {Event} from "../../entities/Event";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit{

  event = new Event()
  constructor(private es: EventService) {}
  addEvent(addF: NgForm)
  {
    let e = addF.value
    e.id = this.event.id
    this.es.save(e)
  }

  ngOnInit(): void
  {
    this.es.event.asObservable().subscribe(data => {
      this.event = data
      if (data.date)
        this.event.date = new Date(data.date)
      /*let date = document.getElementById('date') as HTMLInputElement
      if (this.event.date) {
        const isoDate = new Date(this.event.date.getTime() - (this.event.date.getTimezoneOffset() * 60000)).toISOString();
        date.defaultValue = isoDate.split('T')[0];
      }*/
      console.log(this.event)
    });
    }
}
