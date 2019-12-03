import { Component, OnInit } from '@angular/core';
import { GitSearchService } from '../git-search.service'
import { GitSearch } from '../git-search'
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
  styleUrls: ['./git-search.component.css']
})
export class GitSearchComponent implements OnInit {

  searchResults: GitSearch;
  searchQuery: string;
  title: string;
  displayQuery: string;
  page = 1;
  constructor(
    private GitSearchService: GitSearchService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      this.searchQuery = params.get('query');
      this.displayQuery = params.get('query');
      this.page = parseInt(params.get('page'));
      return this.gitSearch();
    });
    this.route.data.subscribe( (result) => {
      this.title = result.title;
    })
  }

  gitSearch = () => {
    this.GitSearchService.gitSearch(this.searchQuery, this.page).then((response) => {
      this.searchResults=response;
    }, (error) => {
      alert("Error: " + error.statusText);
    })
  }
  
  sendQuery = () => {
    this.page = 1;
    this.searchResults= null;
    this.router.navigate(['/search/' + this.searchQuery + '/' + this.page]);
  }

  nextPage = () => {
    this.page += 1;
    this.router.navigate(['/search/' + this.searchQuery + '/' + this.page]);
  }

  previousPage = () => {
    this.page = (this.page === 1 ? 1 : this.page - 1);
    this.router.navigate(['/search/' + this.searchQuery + '/' + this.page]);
  }

}
