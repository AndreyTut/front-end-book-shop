import {Component} from '@angular/core';
import {HttpService} from "../service/http.service";
import {Book} from "../model/Book";

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})
export class AllBooksComponent {

  books: Book[] = [];

  constructor(private httpService: HttpService) {
    this.fetchBooks();
  }

  private fetchBooks() {
    this.httpService.getBookList().subscribe(it => {
      this.books = it.sort((a, b) => {
        if (a.name > b.name) {
          return 1
        }
        return -1
      });
    });
  }

  read(book: Book) {
    book.read = !book.read;
    this.httpService.updateBook(book);
  }

  deleteBook(id: number | undefined) {
    if (id != undefined) {
      this.httpService.deleteBook(id)
        .subscribe(() => this.fetchBooks());
    }
  }
}
