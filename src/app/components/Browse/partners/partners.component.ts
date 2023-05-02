import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Partner } from 'src/app/entities/Partner';
import { PartnersService } from 'src/app/services/partners.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit
{
  partnersList: Array<Partner> = new Array<Partner>()
  url: string[] = [];

  constructor(private router: Router, private pr: PartnersService) {}
  ngOnInit(): void
  {

    this.pr.getAll().then(data =>
    {
      if (data)
        this.partnersList = data!
        for (let i = 0; i<this.partnersList.length; i++)
        this.pr.getPhoto(this.partnersList[i].id).then(data => {if (data) this.url[i] = data})
      
    })
  }  

}
