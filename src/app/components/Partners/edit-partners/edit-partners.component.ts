import {Component, OnInit} from '@angular/core';
import {Partner} from "../../../entities/Partner";
import {PartnersService} from "../../../services/partners.service";

@Component({
  selector: 'app-edit-partners',
  templateUrl: './edit-partners.component.html',
  styleUrls: ['./edit-partners.component.css']
})
export class EditPartnersComponent implements OnInit{
  partnerList: Partner[] = []

  constructor(private ps: PartnersService) {
  }
  async ngOnInit(){
    await this.ps.getAll().then(data => this.partnerList=data!)
  }

  delete(p: Partner) {
    let result = confirm('are you sure ?')
    if (result) {
      this.ps.delete(p.id)
      this.partnerList = this.partnerList.filter(i => i !== p)
    }
  }
}
