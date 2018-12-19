import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { IUser } from './../../shared/models/user';

const API_URL = "http://localhost:8080/welison/university/angular2/welison-estudos/api/get-users.php";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  private users$ = new BehaviorSubject<IUser[]>(null);

  constructor(private http: HttpClient) { }

  ngOnInit() {
    
    this.http.get(API_URL)
      //.pipe(map(data => { console.log(data) }))
      .subscribe(
        data => {
          console.log(data);
          let new_data = data as IUser[];
          this.users$.next(new_data);
        },
        err => {
          console.log(err);
          this.users$.next(null);
        }
      );
  }

}
