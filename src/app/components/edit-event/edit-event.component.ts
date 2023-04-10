import {Component, OnInit} from '@angular/core';
import {EventService} from "../../services/event.service";
import {Event} from "../../entities/Event";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit{

  allEvents: Event[] =  []

  constructor(private es: EventService, private router: Router) {}

  update(e: Event)
  {
    this.router.navigate(['/account/add-event'])
    this.es.get(e.id)
  }

  add() {
    this.es.event.next(new Event())
    this.router.navigate(['/account/add-event'])
  }

  ngOnInit(): void {this.es.getAll().subscribe(data => this.allEvents=data)}



}
