import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Partner } from 'src/app/entities/Partner';
import { PartnersService } from 'src/app/services/partners.service';

@Component({
  selector: 'app-view-partners',
  templateUrl: './view-partners.component.html',
  styleUrls: ['./view-partners.component.css']
})
export class ViewPartnersComponent implements OnInit
{
  partnersList: Array<Partner> = new Array<Partner>()
  url: string[] = [];

  constructor(private router: Router, private pr: PartnersService) {}
  async ngOnInit()
  {

    await this.pr.getAll().then(data =>
    {
      if (data)
        this.partnersList = data!

    })
  }

}
