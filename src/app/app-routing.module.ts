import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteThoughtComponent } from './components/thoughts/delete-thought/delete-thought.component';
import { EditThoughtComponent } from './components/thoughts/edit-thought/edit-thought.component';
import { ListThoughtsComponent } from './components/thoughts/list-thoughts/list-thoughts.component';
import { NewThoughtComponent } from './components/thoughts/new-thought/new-thought.component';

const routes: Routes = [
  {
    path: '',
    component: ListThoughtsComponent,
    pathMatch: 'full',
  },
  {
    path: 'newThought',
    component: NewThoughtComponent,
  },
  {
    path: 'listThoughts',
    component: ListThoughtsComponent,
  },
  {
    path: 'thoughts/deleteThought/:id',
    component: DeleteThoughtComponent,
  },
  {
    path: 'thoughts/editThought/:id',
    component: EditThoughtComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
