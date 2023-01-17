import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../model/Book";
import {Observable} from "rxjs";
import {Author} from "../model/Author";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  http: HttpClient;
  baseUrl: string = 'http://ec2-44-212-55-62.compute-1.amazonaws.com:8085'
  // baseUrl: string = 'http://localhost:8085'

  constructor(httpClient: HttpClient) {
    this.http = httpClient
  }

  getBookList(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + '/book')
  }

  getAuthorList(): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl + '/author')
  }

  postNewBook(book: Book) {
    return this.http.post(this.baseUrl + '/book', book);
  }

  createAuthor(author: Author): Observable<any> {
    return this.http.post(this.baseUrl + '/author', author);
  }

  getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(this.baseUrl + '/author/' + id);
  }

  updateBook(book: Book): void {
    this.http.put(this.baseUrl + '/book', book).subscribe();
  }

  getBooksForAuthor(authorId: number): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + '/author/' + authorId + '/book')
  }

  deleteAuthor(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/author/' + id);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/book/' + id);
  }
}
