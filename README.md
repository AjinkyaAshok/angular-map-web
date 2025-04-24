## Development server

To start a local development server, run:

```bash
ng serve
```
or 

```bash
npm start
```

# Description
Second Trip App uses Google Maps javascript API to locate the searched location on the globe using longitude and latitude, where it also use AdvanceMarkerLib to place markers on the map.

### Loading Phase (Home)
Here the user will see a default location which is set to Ireland.
A serach bar with input a field and Button, and Category Dropdown Menu allows user to interact with the map.

### Searched Location
when user search a location, the map updates to display the selected area, with scattred markers on the map (data from /shared/data/placesData.ts) where each marker suggest popular places around the location, each describes a title, description and a photo of the place,

### Category Selection
User can filter the Places from the category dropwown menu, where each category selected will hide the other places on the map, showing only relevant locations on the map
Categories = ['all', 'hotel', 'restaurant', 'tourist spot', 'gym']

### Responsive Features (Used Tailwind CSS v4)
On large and medium screens, the search bar remains fixed at the top center.
On small screens, the search bar is toggleable to save space.

## Github Link
https://github.com/AjinkyaAshok/angular-map-web

## Deployed Using Vercel
Live - [https://angular-map-web.vercel.app/](https://second-map-web.vercel.app/)

