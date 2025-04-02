import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { createInfoWindow } from '../shared/utils/map-utils';
import { MapService } from './map.service';
import { environment } from '../../../environments/environment';

interface Marker {
  position: google.maps.LatLngLiteral;
  title: string;
  category: string;
  marker?: google.maps.Marker;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class MapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  map!: google.maps.Map;
  markers: Marker[] = [];
  searchText: string = '';
  selectedCategory: string = 'all';
  categories = ['all', 'hotel', 'restaurant', 'tourist spot', 'gym'];

  constructor(private mapService: MapService) {}

  async ngOnInit(): Promise<void> {
    await this.initMap();
  }


  // Default map calling
  async initMap(): Promise<void> {
    const defaultPosition = { lat: 53.77975540000001, lng: -7.3055309 };

    //@ts-ignore
    const { Map } = (await google.maps.importLibrary(
      'maps'
    )) as google.maps.MapsLibrary;

    this.map = new Map(this.mapContainer.nativeElement, {
      zoom: 8.5,
      center: defaultPosition,
      mapId: 'DEMO_MAP_ID',
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      keyboardShortcuts: false,
      fullscreenControl: false,
    });
  }

// Search location on the map
  async searchLocation(): Promise<void> {
    if (!this.searchText.trim()) return;
    const API_KEY = environment.GOOGLE_API_KEY;
    const API_URL = environment.GOOGLE_MAP_URL;
    try {
      const response = await fetch(
        `${API_URL}${encodeURIComponent(this.searchText)}&key=${API_KEY}`
      );
      const data = await response.json();
      console.log(data, 'lntlng');
      if (data.status !== 'OK' || data.results.length === 0) {
        alert('Location not found!');
        return;
      }
      const location = data.results[0].geometry.location;
      this.map.setCenter(location);
      this.map.setZoom(13);

      this.addMarkers(location);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  }


// Add makers to the location based on the LAT and LNG
  addMarkers(location: google.maps.LatLngLiteral): void {
    this.markers = [];

    this.mapService.getPlaces().forEach((place) => {
      const newPosition = {
        lat: location.lat + (place.position.lat - 53.7797554),
        lng: location.lng + (place.position.lng + 7.3055309),
      };

      const marker = new google.maps.Marker({
        position: newPosition,
        map: this.map,
        title: place.title,
        icon: place.icon,
      });

      const infoWindow = createInfoWindow(place);
      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });

      this.markers.push({ ...place, marker });
    });

    this.filterMarkers();
  }

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
// Filter Markers as per category
  filterMarkers(): void {
    this.markers.forEach((markerData) => {
      if (
        this.selectedCategory === 'all' ||
        markerData.category === this.selectedCategory
      ) {
        markerData.marker?.setMap(this.map);
      } else {
        markerData.marker?.setMap(null);
      }
    });
  }
}
