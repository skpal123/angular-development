import { Component, Input } from '@angular/core';
import { IRepository } from '../interfaces/repository.interface';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent {
  @Input() repository!: IRepository[];

  trackByFn(index: number, item: IRepository): string {
    return `${index}_${item.id}`;
 }
}
