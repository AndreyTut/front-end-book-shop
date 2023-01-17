import {Component, OnInit} from '@angular/core';
import {HttpService} from "../service/http.service";
import {ActivatedRoute} from "@angular/router";
import {Book} from "../model/Book";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  authorId: '' = '';
  author: string | undefined;
  books: Book[] = [];
  isAddShown: boolean = false;

  constructor(private httpService: HttpService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.authorId = params['id']);
    this.fetchBooks();
  }

  readBook(book: Book) {
    book.read = !book.read;
    this.httpService.updateBook(book);
  }

  private fetchBooks() {
    this.httpService.getBooksForAuthor(+this.authorId)
      .subscribe(it => {
          let result: Book[];
          result = it.sort((a, b) => {
            if (a.name > b.name) {
              return 1
            }
            return -1
          });
          if (result.length > 0) {
            this.author = result[0].authorName;
          } else {
            this.httpService.getAuthor(+this.authorId)
              .subscribe(it => this.author = it.name)
          }
          this.books = result;
        }
      );
  }

  addBook(bookName: string) {
    this.httpService.postNewBook({name: bookName, authorId: +this.authorId, read: false})
      .subscribe(() => this.fetchBooks());
    this.isAddShown = false;
  }

  deleteBook(id: number | undefined) {
    if (id != undefined) {
      this.httpService.deleteBook(id)
        .subscribe(() => this.fetchBooks());
    }
  }
}
