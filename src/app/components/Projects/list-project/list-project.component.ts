import {Component, OnInit} from '@angular/core';
import {Project} from "../../../entities/Project";
import {LanguageService} from "../../../services/language.service";
import {Event} from "../../../entities/Event";

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit{

  projectList: Project[] = []
  content: any
  filteredList: Project[] = []
  recentValue: any;
  olderValue = new Date().toISOString().substring(0, 10);
  constructor(private ls: LanguageService) {ls.getLanguage().subscribe(data => this.content=data)}
  ngOnInit(): void {
  }

  onSearchTextEntered(searchText: string) {
    if (searchText=='')
      this.filteredList = this.projectList
    else
      this.filteredList = this.projectList.filter(project => project.title?.toUpperCase().includes(searchText.toUpperCase()))
  }

  interval() {
    if (!this.olderValue && !this.recentValue)
      this.filteredList = this.projectList
    else {
      this.filteredList = this.projectList.filter(project => {
        return new Date(project.date!).toISOString().substring(0, 10) <= this.olderValue! &&
          new Date(project.date!).toISOString().substring(0, 10) >= this.recentValue!
      })
      console.log(this.filteredList)
    }
  }
}
