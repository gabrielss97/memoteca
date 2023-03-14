import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ThoughtService } from '../thought.service';
import { Ithought } from '../thought/thought.interface';
import { NewThoughtComponent } from './new-thought.component';
import { ListThoughtsComponent } from '../list-thoughts/list-thoughts.component';

describe('NewThoughtComponent', () => {
  let component: NewThoughtComponent;
  let fixture: ComponentFixture<NewThoughtComponent>;
  let thoughtServiceSpy: jasmine.SpyObj<ThoughtService>;

  beforeEach(async () => {
    thoughtServiceSpy = jasmine.createSpyObj('ThoughtService', ['criar']);
    await TestBed.configureTestingModule({
      declarations: [NewThoughtComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'listThoughts', component: ListThoughtsComponent },
        ]),
      ],
      providers: [{ provide: ThoughtService, useValue: thoughtServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(NewThoughtComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ThoughtService.criar() when criarPensamento() is called', () => {
    const testThought: Ithought = {
      conteudo: 'Test content',
      autoria: 'Test author',
      modelo: 'Test model',
    };
    thoughtServiceSpy.criar.and.returnValue(of(testThought));
    component.pensamento = testThought;
    component.criarPensamento();
    expect(thoughtServiceSpy.criar).toHaveBeenCalledWith(testThought);
  });
});
