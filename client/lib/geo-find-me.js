export default function geoFindMe() {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const KEY = 'AIzaSyDmADdAoHWHYXYsnAe1YAVaPgnlR6Fohow';
    let address = '';
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${KEY}`
    )
      .then(res => res.json())
      .then(result => {
        address = result.results[4].formatted_address;
        return address;
      });
  });
}
