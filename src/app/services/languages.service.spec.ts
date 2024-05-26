import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LanguagesService } from './languages.service';
import { environment } from 'src/environments/environment';

describe('LanguagesService', () => {
  let service: LanguagesService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LanguagesService);
    httpController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getLanguages', () => {
    const url = `${environment.serviceUrl}/languages`
    service.getLanguages().subscribe(res => {
      expect(res).toEqual([]);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: url,
    });
    req.flush([]);
  });
});
