import {Component, OnInit} from '@angular/core';
import {Event} from "../../../entities/Event";
import {EventService} from "../../../services/event.service";
import {ActivatedRoute} from "@angular/router";
import {LanguageService} from "../../../services/language.service";

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit{
  event = new Event()
  url = ''
  content: any
  constructor(private es: EventService, private route: ActivatedRoute, private ls: LanguageService) {this.ls.getLanguage().subscribe(data => this.content=data)}
  async ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    await this.es.get(id).then(data => this.event=data!)
    //await this.es.getPhoto(this.event.id).then(data => this.url=data!)
  }

}
