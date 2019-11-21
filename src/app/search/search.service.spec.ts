import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import { HttpClientModule } from '@angular/common/http';

describe('SearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: SearchService = TestBed.get(SearchService);
    expect(service).toBeTruthy();
  });

  it('should return not filtered items', (done) => {
    const service: SearchService = TestBed.get(SearchService);
    service.getResult().subscribe(result => {
      expect(result.every(mediaObject => {
        return typeof mediaObject.title === 'string' && typeof mediaObject.releaseDate === 'string' && typeof mediaObject.type === 'string';
      })).toBeTruthy();
      done();
    });
  });

  it('should return only videos', (done) => {
    const service: SearchService = TestBed.get(SearchService);
    service.configure({
      sortType: 'alphabetical',
      sortOrder: 'ascending',
      stringSearch: '',
      filterBy: 'video',
    });

    service.getResult().subscribe(result => {
      expect(result.every(mediaObject => mediaObject.type === 'video')).toBeTruthy();
      done();
    });
  });

  it('should return only documents', (done) => {
    const service: SearchService = TestBed.get(SearchService);
    service.configure({
      sortType: 'alphabetical',
      sortOrder: 'ascending',
      stringSearch: '',
      filterBy: 'document',
    });

    service.getResult().subscribe(result => {
      expect(result.every(mediaObject => mediaObject.type === 'document')).toBeTruthy();
      done();
    });
  });

  it('should return only images', (done) => {
    const service: SearchService = TestBed.get(SearchService);
    service.configure({
      sortType: 'alphabetical',
      sortOrder: 'ascending',
      stringSearch: '',
      filterBy: 'image',
    });

    service.getResult().subscribe(result => {
      expect(result.every(mediaObject => mediaObject.type === 'image')).toBeTruthy();
      done();
    });
  });

  it('should return only interactiveVideos', (done) => {
    const service: SearchService = TestBed.get(SearchService);
    service.configure({
      sortType: 'alphabetical',
      sortOrder: 'ascending',
      stringSearch: '',
      filterBy: 'interactiveVideo',
    });

    service.getResult().subscribe(result => {
      expect(result.every(mediaObject => mediaObject.type === 'interactiveVideo')).toBeTruthy();
      done();
    });
  });

  it('should return only mediaObject which contains test string in title', (done) => {
    const service: SearchService = TestBed.get(SearchService);
    service.configure({
      sortType: 'alphabetical',
      sortOrder: 'ascending',
      stringSearch: 'ON',
      filterBy: 'all',
    });

    service.getResult().subscribe(result => {
      expect(result.every(mediaObject => mediaObject.title.includes('ON'))).toBeTruthy();
      done();
    });
  });

  it('should return only mediaObjects sorted alphabetically (asc)', (done) => {
    const service: SearchService = TestBed.get(SearchService);
    service.configure({
      sortType: 'alphabetical',
      sortOrder: 'ascending',
      stringSearch: '',
      filterBy: 'all',
    });

    service.getResult().subscribe(result => {
      expect(result.every((mediaObject, index, arr) => {
        if (index === arr.length - 1) {
          return true;
        }

        return mediaObject.title.localeCompare(arr[index + 1].title) === -1;
      })).toBeTruthy();
      done();
    });
  });

  it('should return only mediaObjects sorted alphabetically (desc)', (done) => {
    const service: SearchService = TestBed.get(SearchService);
    service.configure({
      sortType: 'alphabetical',
      sortOrder: 'descending',
      stringSearch: '',
      filterBy: 'all',
    });

    service.getResult().subscribe(result => {
      expect(result.every((mediaObject, index, arr) => {
        if (index === arr.length - 1) {
          return true;
        }

        return mediaObject.title.localeCompare(arr[index + 1].title) === 1;
      })).toBeTruthy();
      done();
    });
  });

  it('should return only mediaObjects sorted by date (desc)', (done) => {
    const service: SearchService = TestBed.get(SearchService);
    service.configure({
      sortType: 'date',
      sortOrder: 'descending',
      stringSearch: '',
      filterBy: 'all',
    });

    service.getResult().subscribe(result => {
      expect(result.every((mediaObject, index, arr) => {
        if (index === arr.length - 1) {
          return true;
        }

        return new Date(mediaObject.releaseDate).getTime() - new Date(arr[index + 1].releaseDate).getTime()
          < new Date(mediaObject.releaseDate).getTime();
      })).toBeTruthy();
      done();
    });
  });

  it('should return only mediaObjects sorted by date (asc)', (done) => {
    const service: SearchService = TestBed.get(SearchService);
    service.configure({
      sortType: 'date',
      sortOrder: 'ascending',
      stringSearch: '',
      filterBy: 'all',
    });

    service.getResult().subscribe(result => {
      expect(result.every((mediaObject, index, arr) => {
        if (index === arr.length - 1) {
          return true;
        }

        return new Date(mediaObject.releaseDate).getTime() - new Date(arr[index + 1].releaseDate).getTime()
          < new Date(mediaObject.releaseDate).getTime();
      })).toBeTruthy();
      done();
    });
  });
});
