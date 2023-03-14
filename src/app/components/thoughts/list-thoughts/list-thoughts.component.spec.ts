import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { throwError } from 'rxjs';

import { ListThoughtsComponent } from './list-thoughts.component';
import { ThoughtService } from '../thought.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ListThoughtsComponent', () => {
  let component: ListThoughtsComponent;
  let fixture: ComponentFixture<ListThoughtsComponent>;
  let thoughtService: ThoughtService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListThoughtsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [ThoughtService],
    }).compileComponents();

    thoughtService = TestBed.inject(ThoughtService);

    fixture = TestBed.createComponent(ListThoughtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set errorMessage to true on initialization if ThoughtService.list() call returns an error', () => {
    const errorMessage = 'Error retrieving thoughts!';
    spyOn(thoughtService, 'listar').and.returnValue(
      throwError(() => new Error(errorMessage))
    );

    component.listar();

    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBe(true);
  });
});
