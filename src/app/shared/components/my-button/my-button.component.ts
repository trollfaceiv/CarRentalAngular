import { Component, Input, OnInit } from '@angular/core';
import { MyButtonConfig } from './my-button.config';

@Component({
  selector: 'app-my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.css']
})
export class MyButtonComponent implements OnInit{

  ngOnInit(): void {
  }

  @Input() buttonConfig!: MyButtonConfig;
}
