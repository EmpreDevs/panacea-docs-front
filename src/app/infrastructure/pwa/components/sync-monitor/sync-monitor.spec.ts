import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncMonitor } from './sync-monitor';

describe('SyncMonitor', () => {
  let component: SyncMonitor;
  let fixture: ComponentFixture<SyncMonitor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SyncMonitor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SyncMonitor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
