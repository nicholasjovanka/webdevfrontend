import { Component, OnInit } from '@angular/core';
import {Gameinterface} from './gameinterface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  gameArray: Array<Gameinterface> = [
    {gameName: 'Test' , gameYear: 2005},
    {gameName: 'Test2' , gameYear: 2006},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
