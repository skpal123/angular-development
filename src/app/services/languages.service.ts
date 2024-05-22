import { Injectable } from '@angular/core';
import { DemoAppRestApiService } from '../core/services/demo-app-rest-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IKeyValue } from '../core/interfaces/generic.interface';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService extends DemoAppRestApiService {

  protected override baseUrl = 'languages'

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  getLanguages(params = {}): Observable<IKeyValue[]> {
    return this.getItem(params, '')
  }
}
