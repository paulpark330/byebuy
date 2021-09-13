export default function geoFindMe() {
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const KEY = 'AIzaSyDmADdAoHWHYXYsnAe1YAVaPgnlR6Fohow';
    fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${KEY}`
    )
      .then(res => res.json())
      .then(result => {
        const address = result.results[4].formatted_address;
        // eslint-disable-next-line no-console
        console.log(address);
      });
  });
}
