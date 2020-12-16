import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { Log } from '../models/Log';

@Injectable()
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({
    id: null,
    text: null,
    date: null
  });
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    this.logs = [];
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  clearState() {
    this.stateSource.next(true);
  }

  getLogs(): Observable<Log[]> {
    if (!localStorage.getItem('logs')) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs.sort((a, b) => b.date - a.date));
  }

  addLog(log: Log) {
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    const index = this.logs.findIndex((l) => l.id === log.id);
    this.logs.splice(index, 1);
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    const index = this.logs.findIndex((l) => l.id === log.id);
    this.logs.splice(index, 1);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }
}
