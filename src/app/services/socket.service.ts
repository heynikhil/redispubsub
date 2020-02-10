import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
declare const io: any;

@Injectable({
  providedIn: 'root'
})


export class SocketService {
  private socket;
  connected$ = new BehaviorSubject<boolean>(true);

  constructor() {
    this.socket = io(environment.baseUrl)
  }

  getConnection() {
    return this.socket;
  }

  listen(event: string): Observable<any> {
    return new Observable(observer => {

      this.socket.on(event, data => {

        console.group();
        console.log('----- SOCKET INBOUND -----');
        console.log('Action: ', event);
        console.log('Payload: ', data);
        console.groupEnd();

        observer.next(data);
      });
      // dispose of the event listener when unsubscribed
      return () => this.socket.off(event);
    });
  }

  disconnect() {
    this.socket.disconnect();
    this.connected$.next(false);
  }

  emit(event: string, data?: any) {

    console.group();
    console.log('----- SOCKET OUTGOING -----');
    console.log('Action: ', event);
    console.log('Payload: ', data);
    console.groupEnd();

    this.socket.emit(event, data);
  }
}
