import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bills-page',
  templateUrl: './bills-page.component.html',
  styleUrls: ['./bills-page.component.scss']
})
export class BillsPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
