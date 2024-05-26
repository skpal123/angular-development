import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IRepository } from '../interfaces/repository.interface';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryComponent {
  @Input() public repository!: IRepository;
} 
