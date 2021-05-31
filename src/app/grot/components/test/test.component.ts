import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as signalR from "@microsoft/signalr";

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  public forecast: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/weatherforecast`).subscribe(result => {
      this.forecast = result;
    });

    // const connection = new signalR.HubConnectionBuilder()
    //   .configureLogging(signalR.LogLevel.Trace)
    //   .withUrl(`/hub`)
    //   .build();
    
    // connection.on('receive', (message: string) => {   
    //   console.info(`Message from signalR: ${message}`)    
    // });

    // connection.start().then(() => {
    //   console.info("SignalR connected");
    // }).catch((error) => {
    //   console.error(error)
    // })
  }
}
