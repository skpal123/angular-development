import { TestBed } from '@angular/core/testing';

import { RepositoryService } from './repository.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('RepositoryService', () => {
  let service: RepositoryService;
  let httpController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RepositoryService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getRepositories with default parameters', () => {
    const url = `${environment.serviceUrl}/search/repositories?q=Q`
    service.getRepositories().subscribe(res => {
      expect(res).toEqual({ id: 'test', items: [] });
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: url,
    });
    req.flush({ id: 'test', items: [] });
  });

  it('should call getRepositories with given parameters', () => {
    const url = `${environment.serviceUrl}/search/repositories?q=language:typescript&sort=asc&page=1&per_page=50`
    service.getRepositories({ sort: 'asc', page: 1, per_page: 50 }, 'typescript').subscribe(res => {
      expect(res).toEqual({ id: 'test', items: [] });
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: url,
    });
    req.flush({ id: 'test', items: [] });
  });
});
