import { Observable } from 'rxjs';
import { ThoughtService } from './../thought.service';
import { Component, OnInit } from '@angular/core';
import { Ithought } from '../thought/thought.interface';

@Component({
  selector: 'app-list-thoughts',
  templateUrl: './list-thoughts.component.html',
  styleUrls: ['./list-thoughts.component.scss'],
})
export class ListThoughtsComponent implements OnInit {
  thoughts!: Array<Ithought>;
  isLoading = true;
  errorMessage = false;

  constructor(public service: ThoughtService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.service.listar().subscribe({
      next: (thoughtsData) => {
        this.thoughts = thoughtsData;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = true;
      },
    });
  }
}
