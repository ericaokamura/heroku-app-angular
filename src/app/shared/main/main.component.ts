import { Component } from '@angular/core';
import { hotels } from '../../services/hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  hotelList = hotels;

  constructor(private router: Router) {}

  seeDetails(hotelId: number) {
    this.router.navigate(['/hotel', hotelId]).then(r => r);
  }
}
