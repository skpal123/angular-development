import { Injectable } from '@angular/core';
import { DemoAppRestApiService } from '../core/services/demo-app-rest-api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IKeyValue } from '../core/interfaces/generic.interface';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService extends DemoAppRestApiService {

  protected override baseUrl = 'search'

  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  getRepositories(params = {}, language: string = ''): Observable<IKeyValue> {

    const url = language ? `q=language:${language}` : `q=Q`;
    return this.getItem(params, `repositories?${url}`)
  }
}
