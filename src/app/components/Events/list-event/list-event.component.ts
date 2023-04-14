import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../services/event.service";

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent implements OnInit{

  url = ''

  constructor(private es: EventService) {
  }
  ngOnInit(): void {

  }
}
