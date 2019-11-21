import { Component, OnInit } from '@angular/core';
import { SearchService, MediaType, SortType, MediaObject, SortOrder } from './search.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {
  mediaTypes: Array<MediaType> = ['all', 'video', 'interactiveVideo', 'audio', 'image', 'document'];
  sortTypes: Array<SortType> = ['alphabetical', 'date'];
  sortOrders: Array<SortOrder> = ['ascending', 'descending'];
  data: Array<MediaObject> = [];
  searchConfigFormGroup: FormGroup;

  constructor(
    private searchService: SearchService,
    private formBuilder: FormBuilder
  ) {
  }

  onConfigFormChange(form) {
    this.searchService.configure(form);
    this.searchService.getResult().subscribe(result => {
      this.data = result;
    });
  }

  initForm() {
    const defaultFormValues = {
      stringSearch: '',
      sortType: 'alphabetical',
      sortOrder: 'ascending',
      filterBy: 'all',
    };

    this.searchConfigFormGroup = this.formBuilder.group(defaultFormValues);

    this.searchConfigFormGroup
      .valueChanges
      .subscribe(this.onConfigFormChange.bind(this));

    this.onConfigFormChange(defaultFormValues);
  }

  ngOnInit() {
    this.initForm();
  }
}
