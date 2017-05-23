import { async, getTestBed, TestBed } from '@angular/core/testing';

import {
    BaseRequestOptions,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';

import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let backend: MockBackend;
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  describe('#login', () => {
    it('')
  });
});
