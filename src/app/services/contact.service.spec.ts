/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ContactService } from './contact.service';

describe('Service: Contact', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactService]
    });
  });

  it('should ...', inject([ContactService], (service: ContactService) => {
    expect(service).toBeTruthy();
  }));
});
