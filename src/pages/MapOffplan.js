import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Loader } from '@googlemaps/js-api-loader';

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '10px',
      borderRadius: '5px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
      fontSize: '14px',
      fontWeight: 'bold',
    }}
  >
    {text}
  </div>
);

const MyMap = () => {
  const apiKey = 'AIzaSyCXENRI6QU3NowjVqVzhP_2Tv6IyUXVjPc';

  const mapOptions = {
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'on' }],
      },
      {
        featureType: 'poi.business',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#f2f2f2' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#ffffff' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#a0c7ff' }],
      },
    ],
  };

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={{ lat: 25.2048, lng: 55.2744 }}
        defaultZoom={11}
        options={mapOptions}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="Your Property"
        />
      </GoogleMapReact>
    </div>
  );
};

export default MyMap;



// import React, { useState } from 'react';
// import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// // Custom styles for the map
// const mapStyles = [
//           {
//             "featureType": "all",
//             "elementType": "labels.text.fill",
//             "stylers": [
//               {
//                 "saturation": 36
//               },
//               {
//                 "color": "#000000"
//               },
//               {
//                 "lightness": 40
//               }
//             ]
//           },
//           {
//             "featureType": "all",
//             "elementType": "labels.text.stroke",
//             "stylers": [
//               {
//                 "visibility": "on"
//               },
//               {
//                 "color": "#000000"
//               },
//               {
//                 "lightness": 16
//               }
//             ]
//           },
//           {
//             "featureType": "all",
//             "elementType": "labels.icon",
//             "stylers": [
//               {
//                 "visibility": "off"
//               }
//             ]
//           },
//           {
//             "featureType": "administrative",
//             "elementType": "geometry.fill",
//             "stylers": [
//               {
//                 "color": "#000000"
//               },
//               {
//                 "lightness": 20
//               }
//             ]
//           },
//           {
//             "featureType": "administrative",
//             "elementType": "geometry.stroke",
//             "stylers": [
//               {
//                 "color": "#000000"
//               },
//               {
//                 "lightness": 17
//               },
//               {
//                 "weight": 1.2
//               }
//             ]
//           },
//           {
//             "featureType": "landscape",
//             "elementType": "geometry",
//             "stylers": [
//               {
//                 "color": "#000000"
//               },
//               {
//                 "lightness": 20
//               }
//             ]
//           },
//           {
//             "featureType": "poi",
//             "elementType": "geometry",
//             "stylers": [
//               {
//                 "color": "#000000"
//               },
//               {
//                 "lightness": 21
//               }
//             ]
//           },
//           {
//             "featureType": "road.highway",
//             "elementType": "geometry.fill",
//             "stylers": [
//               {
//                 "color": "#000000"
//               },
//               {
//                 "lightness": 17
//               }
//             ]
//           },
//           {
//             "featureType": "road.highway",
//             "elementType": "geometry.stroke",
//             "stylers": [
//               {
//                 "color": "#000000"
//               },
//               {
//                 "lightness": 29
//               },
//               {
//                 "weight": 0.2
//               }
//             ]
//           },
//           {
//             "featureType": "road.arterial",
//             "elementType": "geometry",
//             "stylers": [
//               {
//                 "color": "#000000"
//               },
//               {
//                 "lightness": 18
//               }
//             ]
//           },
//           {
//             "featureType": "road.local",
//             "elementType": "geometry",
//             "stylers": [
//               {
//                 "color": "#000000"
//               },
//               {
//                 "lightness": 16
//               }
//             ]
//           },
//           {
//             "featureType": "transit",
//             "elementType": "geometry",
//             "stylers": [
//               {
//                 "color": "#000000"
//               },
//               {
//                 "lightness": 19
//               }
//             ]
//           },
//           {
//             "featureType": "water",
//             "elementType": "geometry",
//             "stylers": [
//               {
//                 "color": "#000000"
//               },
//               {
//                 "lightness": 17
//               }
//             ]
//           }
//         ];
        

// const defaultCenter = {
//   lat: 40.7128, lng: -74.0060 // Example center: New York City
// };
// const location = {
//           name: "New York City",
//           position: { 
//             lat: 40.7128, 
//             lng: -74.0060 
//           }
//         };
        
// const locations = [
//   {
//     name: "New York City",
//     location: { 
//       lat: 40.7128, 
//       lng: -74.0060 
//     }
//   },
//   {
//     name: "Los Angeles",
//     location: { 
//       lat: 34.0522, 
//       lng: -118.2437 
//     }
//   },
//   {
//     name: "Chicago",
//     location: { 
//       lat: 41.8781, 
//       lng: -87.6298 
//     }
//   }
// ];

// const GoogleMapComponent = () => {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: 'AIzaSyCXENRI6QU3NowjVqVzhP_2Tv6IyUXVjPc'
//   });

//   const [selected, setSelected] = useState(null);

//   if (loadError) {
//     return <div>Error loading maps</div>;
//   }

//   if (!isLoaded) {
//     return <div>Loading Maps...</div>;
//   }

//   return (
//     <GoogleMap
//       mapContainerStyle={{ height: "750px", width: "100%" }}
//       zoom={5}
//       center={defaultCenter}
//       options={{ styles: mapStyles }}>
//             <Marker 
//         position={location.position} 
//         icon={{
//           url: "https://img.icons8.com/office/40/000000/home.png", // Custom home icon URL
//           scaledSize: new window.google.maps.Size(40, 40) // Adjust the size as needed
//         }}
//         onClick={() => setSelected(location)} 
//       />
//       {/* {locations.map((item, index) => (
//         <Marker 
//           key={index} 
//           position={item.location} 
//           icon={{
//             url: "https://img.icons8.com/office/40/000000/home.png", // Custom home icon URL
//             scaledSize: new window.google.maps.Size(40, 40) // Adjust the size as needed
//           }}
//           onClick={() => setSelected(item)} 
//         />
//       ))} */}
//       {selected && (
//         <InfoWindow
//           position={selected.location}
//           clickable={true}
//           onCloseClick={() => setSelected(null)}
//         >
//           <div>
//             <h2>{selected.name}</h2>
//           </div>
//         </InfoWindow>
//       )}
//     </GoogleMap>
//   );
// }

// export default GoogleMapComponent;
