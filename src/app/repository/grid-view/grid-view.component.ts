import { Component, Input, OnInit } from '@angular/core';
import { IRepository } from '../interfaces/repository.interface';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {
  @Input() repository!: IRepository[];
  constructor() { }

  ngOnInit(): void {
  }

}
