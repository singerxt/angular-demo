import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const apiPath = 'http://www.mocky.io/v2/5dd5635a3300007b00f380f1';

export type MediaType = 'all' | 'video' | 'interactiveVideo' | 'audio' | 'image' | 'document';
export type SortType = 'alphabetical' | 'date';
export type SortOrder = 'ascending' | 'descending';
type StringSearch = string;

export interface MediaObject {
  type: string;
  title: string;
  releaseDate: string;
}

interface SearchConfig {
  sortType: SortType;
  sortOrder: SortOrder;
  stringSearch: StringSearch;
  filterBy: MediaType;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private config: SearchConfig = {
    sortType: 'alphabetical',
    sortOrder: 'ascending',
    stringSearch: '',
    filterBy: 'all',
  };

  constructor(
    private http: HttpClient,
  ) {
  }

  configure(config: SearchConfig): void {
    this.config = config;
  }

  fetchMedias(): Observable<HttpResponse<Array<MediaObject>>> {
    return this.http.get<Array<MediaObject>>(apiPath, {
      observe: 'response',
    });
  }

  getResult() {
    const { sortType, stringSearch, filterBy, sortOrder } = this.config;

    return this.fetchMedias().pipe(
      map(response => response.body.filter(mediaObject => {
        const isSearchMatch = stringSearch && mediaObject.title.toLowerCase().includes(stringSearch.toLowerCase()) || stringSearch === '';
        const isTypeMatch = filterBy && mediaObject.type === filterBy || filterBy === 'all';
        return isSearchMatch && isTypeMatch;
      }).sort((a, b) => {
        if (sortType === 'date') {
          const aDate = new Date(a.releaseDate).getTime();
          const bDate = new Date(b.releaseDate).getTime();
          return sortOrder === 'ascending' ? aDate - bDate : bDate - aDate;
        }

        return sortOrder === 'ascending' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
      })),
    );
  }
}
