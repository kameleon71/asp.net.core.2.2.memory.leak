import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { isArray, isObject } from 'lodash';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    let data: Form = new Form();
    data.Name = 'name';
    let input = new DynamicInput();
    input.Name = 'subname';
    data.Inputs = [input];
    http.post<Form>(baseUrl + 'api/SampleData/Insert', toFormData(data)).subscribe(
      result => {}, error => console.error(error));
  }
}

export class Form {
  Name: string;

  File?: File;

  Inputs: DynamicInput[];
}

export class DynamicInput {
  Name: string;

  File?: File;
}

export function toFormData(data: any) {
  let _formData = new FormData();

  for (let key of Object.keys(data)) {
    if (isArray(data[key])) {
      for (let i = 0; i < data[key].length; i++) {
        if (isObject(data[key][i])) {
          for (let subKey of Object.keys(data[key][i])) {
            if (data[key][i][subKey]) {
              _formData.append(`${key}[${i}].${subKey}`, data[key][i][subKey]);
            }
          }
        } else {
          if (data[key][i]) {
            _formData.append(`${key}[]`, data[key][i]);
          }
        }
      }
    } else {
      if (data[key]) {
        _formData.append(key, data[key]);
      }
    }
  }

  return _formData;
}
