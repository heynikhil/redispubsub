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
  content: any = document.getElementById('content');
  messages = []
  constructor(public socket: SocketService, private _snackBar: MatSnackBar) {
  }
  ngOnInit() {

    this.socket.listen('resSubscribe').subscribe(response => {
      this.openSnackBar(response.message)
    })

    this.socket.listen('message').subscribe(message => {
      console.log("===",message)
      this.messages.push(message)
    })

    this.socket.listen("resUnsubscribe").subscribe(response=> {
      this.openSnackBar(response.message)
    })
  }

  sendSubscribtion() {
    this.socket.emit('reqSubscribe')
  }

  sendUnsubscribtion() {
    this.socket.emit('reqUnsubscribe')
  }

  openSnackBar(message: string) {
    this._snackBar.open(message,'close',{ 
      duration: 2000,  
      panelClass: ['green-snackbar']
    });
  }
}
