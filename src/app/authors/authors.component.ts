import {Component} from '@angular/core';
import {Author} from "../model/Author";
import {HttpService} from "../service/http.service";
import {delay, timeInterval} from "rxjs";

@Component({
  selector: 'app-authots',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {

  authors: Author[] = []
  httpService: HttpService;
  isAddShown: boolean = false;

  constructor(http: HttpService) {
    this.httpService = http;
    this.fetchAuthors();
  }

  private fetchAuthors() {
    this.httpService.getAuthorList()
      .subscribe(
        it => {
          this.authors = it;
        }
      );
  }

  addAuthor(author: string) {
    this.httpService.createAuthor({name: author}).subscribe(() => this.fetchAuthors());
    this.isAddShown = false;
  }

  showNewAuthorInput() {
    this.isAddShown = !this.isAddShown;
  }

  deleteAuthor(id: number | undefined) {
    if (id != undefined) {
      this.httpService.deleteAuthor(id).subscribe(() => this.fetchAuthors());
    }
  }
}
