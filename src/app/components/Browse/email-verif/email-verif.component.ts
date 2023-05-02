import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import * as CryptoJS from 'crypto-js';
import {Person} from "../../../entities/Person";

@Component({
  selector: 'app-email-verif',
  templateUrl: './email-verif.component.html',
  styleUrls: ['./email-verif.component.css']
})
export class EmailVerifComponent implements OnInit{
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  ngOnInit(): void {
    let urlVariable = this.route.snapshot.paramMap.get('person')
    let p = CryptoJS.AES.decrypt(JSON.stringify(urlVariable), 'key').toString()
    let person: Person = JSON.parse(p)
    console.log(person)
    //this.http.post('http://localhost:8000/person/add', person).subscribe()
  }
}
