import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 25.0866,
  lng: 55.1467
};

const MapComponent = () => {
  console.log('Rendering MapComponent...');
  
  return (
    <LoadScript googleMapsApiKey="AIzaSyCXENRI6QU3NowjVqVzhP_2Tv6IyUXVjPc">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={(map) => {
          console.log('Map loaded:', map);
        }}
      >
        <Marker position={center} onLoad={(marker) => console.log('Marker loaded:', marker)} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
