import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io as socktio } from 'socket.io-client';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private url = 'http://localhost:4444';
  private socket = socktio(this.url);
  private subjectMessages: Subject<Message> = new Subject<Message>();

  constructor() {
    this.socket.on('message', (msg: Message) => {
      this.subjectMessages.next(msg);
    });
  }

  send(msg: Message) {
    this.socket.emit('message', msg);
  }

  messages() {
    return this.subjectMessages.asObservable();
  }
}
