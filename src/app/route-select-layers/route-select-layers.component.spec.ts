import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteSelectLayersComponent } from './route-select-layers.component';

describe('RouteSelectLayersComponent', () => {
  let component: RouteSelectLayersComponent;
  let fixture: ComponentFixture<RouteSelectLayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RouteSelectLayersComponent],
      imports: [
        MatCheckboxModule,
        MatSidenavModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteSelectLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
