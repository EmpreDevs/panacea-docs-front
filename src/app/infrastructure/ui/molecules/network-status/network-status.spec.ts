import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkStatus } from './network-status';

describe('NetworkStatus', () => {
  let component: NetworkStatus;
  let fixture: ComponentFixture<NetworkStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetworkStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
