import { Component, OnInit } from '@angular/core';
import { SocketService } from './services/socket.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  naruto = false;
  deku = false;
  demon = false;
  constructor(public socket: SocketService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.socket.listen('connect').subscribe(response => {
      console.log('CONNECTED');
    });

    this.socket.listen('resSubscribe').subscribe(response => {

      this.openSnackBar(response.message);
    });

    this.socket.listen('message').subscribe(message => {
      this.openSnackBar(message);
    });

    this.socket.listen('resUnsubscribe').subscribe(response => {
      this.openSnackBar(response.message);
    });
  }

  sendSubscribtion(sName) {
    this[sName] = true;
    this.socket.emit('reqSubscribe', { sName });
  }

  sendUnsubscribtion(sName) {
    this[sName] = false;
    this.socket.emit('reqUnsubscribe', { sName });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'close', {
      duration: 2000,
      panelClass: ['green-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
