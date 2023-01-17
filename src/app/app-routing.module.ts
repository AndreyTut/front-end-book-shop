import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorsComponent} from "./authors/authors.component";
import {BooksComponent} from "./books/books.component";
import {AllBooksComponent} from "./all-books/all-books.component";

const routes: Routes = [
  {path: '', component: AuthorsComponent},
  {path: 'authors', component: AuthorsComponent},
  {path: 'author/:id/books', component: BooksComponent},
  {path: 'books', component: AllBooksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
