import { TestBed, inject } from '@angular/core/testing';

import { NwmAppService } from './nwm-app.service';

describe('NwmAppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NwmAppService]
    });
  });

  it('should be created', inject([NwmAppService], (service: NwmAppService) => {
    expect(service).toBeTruthy();
  }));
});
