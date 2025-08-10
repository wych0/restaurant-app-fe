import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  private apiKey = environment.mapApiKey;

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: this.apiKey,
    });

    loader.load().then(async () => {
      const map = new google.maps.Map(document.getElementById('map')!, {
        center: { lat: 50.87897, lng: 20.640198 },
        zoom: 18,
        styles: [
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'poi',
            elementType: 'labels.text',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
          {
            featureType: 'road.local',
            elementType: 'labels',
            stylers: [
              {
                visibility: 'off',
              },
            ],
          },
        ],
      });

      new google.maps.Marker({
        position: { lat: 50.87897, lng: 20.640198 },
        map: map,
        title: 'Restaurant',
      });
    });
  }
}
