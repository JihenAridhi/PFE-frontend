import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../services/event.service";
import {Event} from "../../../entities/Event";
import {Router} from "@angular/router";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent implements OnInit{

  eventList: Event[] = [];
  content: any;
  filteredList: Event[] = []
  recentValue: any;
  olderValue = new Date().toISOString().substring(0, 10);

  constructor(private es: EventService, private ls: LanguageService) {this.ls.getLanguage().subscribe(data => this.content = data)}
  async ngOnInit() {
    await this.es.getAll().then(async data =>
    {
      if (data)
        this.eventList = data
      this.filteredList = this.eventList
    })
  }

  onSearchTextEntered(searchText: string) {
    if (searchText=='')
      this.filteredList = this.eventList
    else
      this.filteredList = this.eventList.filter(event => event.title?.toUpperCase().includes(searchText.toUpperCase()))
  }

  interval() {
    if (!this.olderValue && !this.recentValue)
      this.filteredList = this.eventList
    else {
      this.filteredList = this.eventList.filter(event => {
        return new Date(event.date!).toISOString().substring(0, 10) <= this.olderValue! &&
          new Date(event.date!).toISOString().substring(0, 10) >= this.recentValue!
      })
      console.log(this.filteredList)
    }
  }
}
