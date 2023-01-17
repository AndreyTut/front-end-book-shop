import {Component} from '@angular/core';
import {Author} from "../model/Author";
import {HttpService} from "../service/http.service";

@Component({
  selector: 'app-authots',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {

  authors: Author[] = []
  httpService: HttpService;

  constructor(http: HttpService) {
    this.httpService = http;
    this.httpService.getAuthorList().subscribe(
      it => this.authors = it
    );
  }

}
