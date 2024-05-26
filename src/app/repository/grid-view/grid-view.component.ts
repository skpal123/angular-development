import { Component, Input } from '@angular/core';
import { IRepository } from '../interfaces/repository.interface';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent {
  @Input() repository!: IRepository[];

  trackByFn(index: number, item: IRepository) {
    return `${index}_${item.id}`;
 }
}
