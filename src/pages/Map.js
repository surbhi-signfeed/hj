import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import NavToAll from "../component/NavToAll";
import { LuPhone } from "react-icons/lu";
import { MdOutlineDirections } from "react-icons/md";
const locationsConfig = {
  Downtown: {
    center: { lat: 25.2048, lng: 55.2744 },
    zoom: 15,
    locations: [
      {
        lat: 25.1972,
        lng: 55.2744,
        text: "Burj Khalifa",
        image: "/img/jasbir-siingh-sachdeva.webp",
        contact: "+971 4 888 8888",
      },
      {
        lat: 25.1985,
        lng: 55.2796,
        text: "Dubai Mall",
        image: "/img/jasbir-siingh-sachdeva.webp",
        contact: "+971 4 362 7500",
      },
      {
        lat: 25.1934,
        lng: 55.2689,
        text: "Dubai Opera",
        image: "/img/jasbir-siingh-sachdeva.webp",
        contact: "+971 4 440 8888",
      },
      {
        lat: 25.1927,
        lng: 55.2799,
        text: "The Address Downtown Dubai",
        image: "/img/jasbir-siingh-sachdeva.webp",
        contact: "+971 4 436 8888",
      },
    ],
  },
  Marina: {
    center: { lat: 25.0773, lng: 55.1358 },
    zoom: 15,
    locations: [
      {
        lat: 25.0866,
        lng: 55.1467,
        text: "Cayan Tower",
        image: "/img/jasbir-siingh-sachdeva.webp",
        contact: "+971 4 504 8888",
      },
      {
        lat: 25.0895,
        lng: 55.1471,
        text: "Marina Torch",
        image: "/img/jasbir-siingh-sachdeva.webp",
        contact: "+971 4 427 8888",
      },
      {
        lat: 25.0898,
        lng: 55.1476,
        text: "Princess Tower",
        image: "/img/jasbir-siingh-sachdeva.webp",
        contact: "+971 4 369 8888",
      },
      {
        lat: 25.0743,
        lng: 55.1423,
        text: "Almas Tower",
        image: "/img/jasbir-siingh-sachdeva.webp",
        contact: "+971 4 365 8888",
      },
    ],
  },
  Palm_Jumeirah: {
    center: { lat: 25.112, lng: 55.139 },
    zoom: 15,
    locations: [
      {
        lat: 25.1304,
        lng: 55.1175,
        text: "Atlantis The Palm",
        image: "/img/jasbir-siingh-sachdeva.webp",
        contact: "+971 4 426 0000",
      },
      {
        lat: 25.1115,
        lng: 55.139,
        text: "The Palm Tower",
        image: "/img/jasbir-siingh-sachdeva.webp",
        contact: "+971 4 345 0000",
      },
      {
        lat: 25.1092,
        lng: 55.1386,
        text: "Dukes The Palm",
        image: "/img/jasbir-siingh-sachdeva.webp",
        contact: "+971 4 455 1000",
      },
      {
        lat: 25.1301,
        lng: 55.1564,
        text: "Waldorf Astoria Dubai Palm Jumeirah",
        image: "/img/jasbir-siingh-sachdeva.webp",
        contact: "+971 4 818 8888",
      },
    ],
  },
  Deira: {
    center: { lat: 25.2684, lng: 55.3093 },
    zoom: 15,
    locations: [
      {
        lat: 25.2644,
        lng: 55.316,
        text: "Deira Clocktower",
        image: "/img/deira-clocktower.jpg",
        contact: "+971 4 222 2222",
      },
      {
        lat: 25.2668,
        lng: 55.3165,
        text: "Al Ghurair Centre",
        image: "/img/al-ghurair-centre.jpg",
        contact: "+971 4 227 7777",
      },
      {
        lat: 25.2876,
        lng: 55.3134,
        text: "Hyatt Regency Dubai",
        image: "/img/hyatt-regency.jpg",
        contact: "+971 4 209 1234",
      },
      {
        lat: 25.253,
        lng: 55.3341,
        text: "Deira City Centre",
        image: "/img/deira-city-centre.jpg",
        contact: "+971 4 295 1010",
      },
    ],
  },
  Business_Bay: {
    center: { lat: 25.1847, lng: 55.2652 },
    zoom: 15,
    locations: [
      {
        lat: 25.1851,
        lng: 55.2587,
        text: "JW Marriott Marquis Dubai",
        image: "/img/jw-marriott-marquis.jpg",
        contact: "+971 4 414 0000",
      },
      {
        lat: 25.1864,
        lng: 55.2611,
        text: "The Oberoi Dubai",
        image: "/img/oberoi-dubai.jpg",
        contact: "+971 4 444 1444",
      },
      {
        lat: 25.1858,
        lng: 55.2617,
        text: "Paramount Hotel Dubai",
        image: "/img/paramount-hotel.jpg",
        contact: "+971 4 456 0000",
      },
      {
        lat: 25.1867,
        lng: 55.2609,
        text: "Bay Square",
        image: "/img/bay-square.jpg",
        contact: "+971 4 432 2222",
      },
    ],
  },
};

const SimpleMap = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [mapsInstance, setMapsInstance] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null); // Track clicked marker
  const [activeCountry, setActiveCountry] = useState(null);
  const [mapBounds, setMapBounds] = useState(null);

  useEffect(() => {
    fetch("/locationsConfig.json") // Adjust the path if necessary
      .then((response) => response.json())
      .then((data) => setLocationsConfig(data))
      .catch((error) => console.error("Error loading locationsConfig:", error));
  }, []);

  const phoneNumber = "1234567890"; // Replace with the actual number
  useEffect(() => {
    if (mapInstance && mapsInstance) {
      renderMarkers();
    }
  }, [activeCountry, mapInstance, mapsInstance]);

  useEffect(() => {
    if (mapInstance && mapsInstance) {
      renderDefaultMarkers();
      mapInstance.addListener("bounds_changed", () => {
        setMapBounds(mapInstance.getBounds());
      });
    }
  }, [mapInstance, mapsInstance]);
const [mapcard,setmapcard]=useState(false)
  const handleCountryClick = (country) => {
    setActiveCountry(country);
    mapInstance.setCenter(locationsConfig[country].center);
    mapInstance.setZoom(locationsConfig[country].zoom);
   
  };
function hidecard(){
  setmapcard(false)
}
  const renderMarkers = () => {
    if (!mapInstance || !mapsInstance || !activeCountry) return;

    const locations = locationsConfig[activeCountry].locations;

    locations.forEach(({ lat, lng, text, image }) => {
      const marker = new mapsInstance.Marker({
        position: { lat, lng },
        map: mapInstance,
        title: text,
        icon: {
          url: '../img/l.png', // Replace with the path to your logo image
          scaledSize: new mapsInstance.Size(50, 50), // Adjust the size as needed
          origin: new mapsInstance.Point(0, 0),
          anchor: new mapsInstance.Point(25, 25) // Adjust to position the icon correctly
        }
      });

      marker.addListener("mouseover", () => {
        setHoveredLocation(text);
      });

      marker.addListener("mouseout", () => {
        setHoveredLocation(null);
      });

      marker.addListener("click", () => {
        setClickedLocation({ lat, lng, text, image });
        setmapcard(true)
      });
    });
  };

  const renderDefaultMarkers = () => {
    if (!mapInstance || !mapsInstance) return;

    Object.keys(locationsConfig).forEach((country) => {
      const { center, locations } = locationsConfig[country];
      const marker = new mapsInstance.Marker({
        position: center,
        map: mapInstance,
        title: `${country} (${locations.length} properties)`,
      });

      marker.addListener("mouseover", () => {
        setHoveredLocation(`${country} (${locations.length} properties)`);
      });

      marker.addListener("mouseout", () => {
        setHoveredLocation(null);
      });

      marker.addListener("click", () => {
        setClickedLocation({
          lat: center.lat,
          lng: center.lng,
          
          text: `${country} (${locations.length} properties)`,
        });
      });
    });
  };

  const getPixelPosition = (lat, lng) => {
    if (!mapBounds || !mapInstance || !mapsInstance) return { x: 0, y: 0 };

    const scale = Math.pow(2, mapInstance.getZoom());
    const nw = mapBounds.getNorthEast();
    const se = mapBounds.getSouthWest();
    const worldCoordinateNW = mapInstance
      .getProjection()
      .fromLatLngToPoint(new mapsInstance.LatLng(nw.lat(), se.lng()));
    const worldCoordinate = mapInstance
      .getProjection()
      .fromLatLngToPoint(new mapsInstance.LatLng(lat, lng));
    const pixelOffset = new mapsInstance.Point(
      Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
      Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
    );

    return {
      x: pixelOffset.x,
      y: pixelOffset.y,
    };
  };

  const defaultProps = {
    center: { lat: 25.2048, lng: 55.2744 },
    zoom: 12,
  };

  return (
    <div >
      <div style={{ position: "absolute", width: "100%", zIndex: 1000 }}>
        <NavToAll />
      </div>
      <div
        style={{
          height: "100vh",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
     
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCXENRI6QU3NowjVqVzhP_2Tv6IyUXVjPc" }} // Replace with your Google Maps API key
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            setMapInstance(map);
            setMapsInstance(maps);
          }}
        />
        {mapcard && <>
        {clickedLocation && (
          <div
            style={{
              position: "absolute",
              top: "159px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "white",
              padding: "2px",
              borderRadius: "5px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
              zIndex: 1000,
            }}
            onClick={hidecard}
          >
            <div className="mapcard-container">
              <div className="mapcard-image">
                <img src={clickedLocation.image} alt="Card" />
              </div>
              <div className="mapcard-content">
                <h5 className="mapcard-title">{clickedLocation.text}</h5>
                <button className="mapcallback-button">Call Back </button>
                <span className="deg">
                  <MdOutlineDirections />
                  360 °{" "}
                </span>
                <p className="mapcard-description">
                  Let your lifestyle ascend at Altitude de GRISOGONO, Dubai’s
                  newest icon, where luxury soars and urban living goes above
                  and beyond.
                </p>
                <p
                  className="mapphone-number"
                  onClick={() => {
                    window.open(`tel:${phoneNumber}`, "_self");
                  }}
                >
                  <LuPhone /> +971 50 000 0000{" "}
                  <button className="mapknow-more-button">Know More</button>
                </p>
              </div>
              <div className="mapcard-arrow"></div>
            </div>
          </div>

          // {/* //   <h4>{clickedLocation.text}</h4>
          // //   <img src={clickedLocation.image} alt="Property" style={{ width: "100%" }} /> {/* Replace with actual property image URL */}
          // //  <hr/>
          // //   <button  onClick={() => { window.open(`tel:${phoneNumber}`, '_self'); }} className="call-now">Call Now</button> */}
        )}</>}
        {Object.keys(locationsConfig).map((country) => {
          const { lat, lng } = locationsConfig[country].center;
          const { x, y } = getPixelPosition(lat, lng);
          return (
            <button
              className="round-button"
              key={country}
              style={{
                position: "absolute",
                top: y,
                left: x,
                heigh:"50px",
                width:"50px",
                marginTop:"-20px",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                backgroundColor: "#052c65",
                padding: "10px",
                borderRadius: "50%",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                border: "2px solid white",
                color: "white",
                fontSize: "16px",
                zIndex: 999, // Ensure buttons are behind the navbar
              }}
              onClick={() => handleCountryClick(country)}
            >
              {locationsConfig[country].locations.length}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SimpleMap;
