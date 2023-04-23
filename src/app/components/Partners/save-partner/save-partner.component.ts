import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Partner} from "../../../entities/Partner";
import {ActivatedRoute} from "@angular/router";
import {PartnersService} from "../../../services/partners.service";

@Component({
  selector: 'app-save-partner',
  templateUrl: './save-partner.component.html',
  styleUrls: ['./save-partner.component.css']
})
export class SavePartnerComponent implements OnInit{

  partner: Partner = new Partner()
  constructor(private ps: PartnersService,private route: ActivatedRoute) {
  }

  add(addF: NgForm) {
    console.log(addF.value)
    this.ps.save(addF.value)
  }

  async onFileSelected(files: any) {
    const file: File = files[0];
    const formData = new FormData();
    formData.append('file', file, this.partner.id?.toString()+'.jpg');
    await this.ps.setPhoto(formData).then()
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (id)
      this.ps.get(id).then(data => this.partner = data!)
  }
}
