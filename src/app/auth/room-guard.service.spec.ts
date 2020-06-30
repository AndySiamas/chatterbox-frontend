import { TestBed } from '@angular/core/testing';

import { RoomGuardService } from './room-guard.service';

describe('RoomGuardService', () => {
  let service: RoomGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
