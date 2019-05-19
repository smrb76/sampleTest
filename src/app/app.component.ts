import { Component, OnInit } from '@angular/core';
import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private registerService: RegisterService) { }
  title = 'sample';
  ngOnInit(): void {
    this.registerService.authAutoUser();
  }
}
