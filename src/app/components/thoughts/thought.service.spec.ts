import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ThoughtService } from './thought.service';

const mockThoughts = [
  {
    conteudo: 'Eu consigo editar agora',
    autoria: 'Gabriel',
    modelo: 'modelo1',
    id: 1,
  },
  {
    conteudo: 'dfgssssssssssssssssssssssssssss',
    autoria: 'dfgggggggg',
    modelo: 'modelo1',
    id: 3,
  },
];

const mockThought = {
  conteudo: 'Eu consigo editar agora',
  autoria: 'Gabriel',
  modelo: 'modelo1',
  id: 1,
};

describe('ThoughtService', () => {
  let service: ThoughtService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router],
    });

    service = TestBed.inject(ThoughtService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list all thoughts from API', () => {
    service.listar().subscribe((thoughts) => {
      expect(thoughts).toEqual(mockThoughts);
    });

    const req = httpMock.expectOne(service['API']);
    expect(req.request.method).toBe('GET');
    req.flush(mockThoughts);
  });

  it('should create a new thought in API', () => {
    service.criar(mockThought).subscribe((thought) => {
      expect(thought.conteudo).toEqual(mockThought.conteudo);
    });

    const req = httpMock.expectOne(service['API']);
    expect(req.request.method).toBe('POST');
    req.flush(mockThought);
  });

  it('should update an existing thought in API', () => {
    service.editar(mockThought).subscribe((thought) => {
      expect(thought).toEqual(mockThought);
    });

    const req = httpMock.expectOne(`${service['API']}/${mockThought.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockThought);
  });

  it('should delete a thought from API by ID', () => {
    service.excluir(mockThought.id).subscribe((thought) => {
      expect(thought).toEqual(mockThought);
    });

    const req = httpMock.expectOne(`${service['API']}/${mockThought.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockThought);
  });

  it('should search for a thought in API by ID', () => {
    service.buscarPorId(mockThought.id).subscribe((thought) => {
      expect(thought).toEqual(mockThought);
    });

    const req = httpMock.expectOne(`${service['API']}/${mockThought.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockThought);
  });

  it('should navigate to the thoughts list page', () => {
    spyOn(router, 'navigate');
    service.cancelar();
    expect(router.navigate).toHaveBeenCalledWith(['/listThoughts']);
  });
});
