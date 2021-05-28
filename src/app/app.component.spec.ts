import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToolbarModule } from 'primeng/toolbar';
import { AppComponent } from './app.component';
import * as MockSignalRClient from '../testing/mockSignalR.js';

describe('AppComponent', () => {
  beforeEach(async () => {    
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToolbarModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents()
    .then(() => {
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'grot-front'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('grot-front');
  });
});
