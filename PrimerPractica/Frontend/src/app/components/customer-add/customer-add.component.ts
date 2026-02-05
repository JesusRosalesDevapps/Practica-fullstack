import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  id : String = '';
  name : String = '';
  email : String = '';
  constructor() { }

  ngOnInit(): void {
  }

}
