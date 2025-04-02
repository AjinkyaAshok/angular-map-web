import { Place } from '../models/place.model';

export function createInfoWindow(place: Place): google.maps.InfoWindow {
  // InfoWindow Card
  const infoWindowContent = `
  <div class="flex flex-col gap-1 items-start w-min h-min px-3 py-2 bg-white/30  rounded-lg  ">
  <img src="${place.image}" alt="Image of ${place.title}" class="w-44 h-24 object-cover rounded-md shadow-md">
  <h3 class="text-base font-medium text-gray-900">${place.title}</h3>
  <p class="text-sm text-gray-700">${place.description}</p>
  <button 
  onclick="alert('Clicked on ${place.title}')"
  (click)="toggleSidebar()"
  class="bg-white/60 text-gray-900 font-semibold px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-100 hover:shadow-2xl transition-all duration-300  shadow-sm">
  See More
  </button>
  </div>
  `;
  return new google.maps.InfoWindow({ content: infoWindowContent });
}

export function clearMarkers(markers: google.maps.Marker[]): void {
  markers.forEach((marker) => marker.setMap(null));
}
