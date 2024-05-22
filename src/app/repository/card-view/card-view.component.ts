import { Component, Input, OnInit } from '@angular/core';
import { IRepository } from '../interfaces/repository.interface';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {
  @Input() repository!: IRepository[];
  constructor() { }

  ngOnInit(): void {
  }

}
