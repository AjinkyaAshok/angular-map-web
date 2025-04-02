import { Injectable } from '@angular/core';
import { Place } from '../shared/models/place.model';
import { places } from '../shared/data/placesData';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor() {}

  getPlaces(): Place[] {
    return places;
  }

  async loadGoogleMaps(): Promise<typeof google.maps> {
    //@ts-ignore
    return await google.maps.importLibrary('maps');
  }
}
