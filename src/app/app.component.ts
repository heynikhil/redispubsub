import { Component, OnInit } from '@angular/core';
import { SocketService } from './services/socket.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pubsubredis';
  messages = [];
  constructor(public socket: SocketService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.socket.listen('resSubscribe').subscribe(response => {
      this.openSnackBar(response.message);
    });

    this.socket.listen('message').subscribe(message => {
      this.messages.push(message);
    });

    this.socket.listen('resUnsubscribe').subscribe(response => {
      this.openSnackBar(response.message);
    });
  }

  sendSubscribtion(sName) {
    this.socket.emit('reqSubscribe', { sName });
  }

  sendUnsubscribtion(sName) {
    this.socket.emit('reqUnsubscribe', { sName });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'close', {
      duration: 2000,
      panelClass: ['green-snackbar']
    });
  }
}
