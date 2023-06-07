import {Injectable} from '@angular/core';
import {Person} from "../entities/Person";
import {Autorisation} from "../entities/Autorisation";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Theme} from "../entities/Theme";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient, private router: Router) { }

  getAllThemes() { return this.http.get<Theme[]>('http://localhost:8000/theme/getAll').toPromise()   }
}
