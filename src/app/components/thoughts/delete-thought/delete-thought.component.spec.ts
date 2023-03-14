import { of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThoughtService } from '../thought.service';
import { Ithought } from '../thought/thought.interface';
import { ListThoughtsComponent } from '../list-thoughts/list-thoughts.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const testThoughts: Ithought[] = [
  {
    id: 1,
    conteudo: 'Test content 1',
    autoria: 'Test author 1',
    modelo: 'Test model 1',
  },
  {
    id: 2,
    conteudo: 'Test content 2',
    autoria: 'Test author 2',
    modelo: 'Test model 2',
  },
  {
    id: 3,
    conteudo: 'Test content 3',
    autoria: 'Test author 3',
    modelo: 'Test model 3',
  },
];

describe('ListThoughtsComponent', () => {
  let component: ListThoughtsComponent;
  let fixture: ComponentFixture<ListThoughtsComponent>;
  let thoughtService: ThoughtService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListThoughtsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [ThoughtService],
    }).compileComponents();

    fixture = TestBed.createComponent(ListThoughtsComponent);
    component = fixture.componentInstance;
    thoughtService = TestBed.inject(ThoughtService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ThoughtService.list() on initialization and update thoughts property', () => {
    spyOn(thoughtService, 'listar').and.returnValue(of(testThoughts));
    component.ngOnInit();
    expect(thoughtService.listar).toHaveBeenCalled();
    expect(component.thoughts).toEqual(testThoughts);
  });

  it('should set isLoading to false on initialization after ThoughtService.list() call completes', () => {
    spyOn(thoughtService, 'listar').and.returnValue(of(testThoughts));
    component.ngOnInit();
    expect(component.isLoading).toBeFalse();
  });

  it('should set errorMessage to true on initialization if ThoughtService.list() call returns an error', () => {
    const errorMessage = 'Error retrieving thoughts!';
    spyOn(thoughtService, 'listar').and.callFake(() => {
      throw new Error(errorMessage);
    });
    component.ngOnInit();
    expect(component.errorMessage).toBeTrue();
  });
});
