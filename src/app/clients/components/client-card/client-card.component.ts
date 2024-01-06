import { Component, Input, OnInit } from '@angular/core';
import { Client } from 'src/app/core/models/client.model';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss']
})
export class ClientCardComponent implements OnInit {
  @Input() client!: Client;

  constructor() { }

  ngOnInit(): void {

  }

}
