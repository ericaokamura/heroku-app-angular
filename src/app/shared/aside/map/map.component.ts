import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    const storedLocation = localStorage.getItem('userLocation');
    if (storedLocation) {
      const { latitude, longitude } = JSON.parse(storedLocation);
      const mapElement = document.getElementById('map');
      mapElement?.setAttribute(
        'src',
        `https://www.google.com/maps/embed/v1/place?key=AIzaSyC7K0CfjjrLQ6kocgQ7pGT0S0DvLIdAM2I&zoom=15&q=${latitude},${longitude}`
      );
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const mapElement = document.getElementById('map');
          mapElement?.setAttribute(
            'src',
            `https://www.google.com/maps/embed/v1/place?key=AIzaSyC7K0CfjjrLQ6kocgQ7pGT0S0DvLIdAM2I&zoom=15&q=${latitude},${longitude}`
          );
          localStorage.setItem('userLocation', JSON.stringify({ latitude, longitude }));
        },
        error => {
          console.log(error);
          const defaultLatitude = 37.7749;
          const defaultLongitude = -122.4194;
          const mapElement = document.getElementById('map');
          mapElement?.setAttribute(
            'src',
            `https://www.google.com/maps/embed/v1/place?key=AIzaSyC7K0CfjjrLQ6kocgQ7pGT0S0DvLIdAM2I&zoom=15&q=${defaultLatitude},${defaultLongitude}`
          );
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
}
