import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import ErrorDisplay from '../ErrorDisplay';
import Geocode from 'react-geocode';
import './index.css';

const RetailersPage = () => {
  const [currentPosition, setCurrentPosition] = useState({lat:30.267153,lng:-97.7430608})
  const [location, setLocation] = useState("");
  const [markers, setMarkers] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [errors, setErrors] = useState([]);

  //Geocode to get lat and lng from location
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API)
  Geocode.setLanguage("en");
  Geocode.setLocationType("ROOFTOP");

  //Reverse Geocode function
  const getAddress = async (lat, lng) => {

    for(let i = 0; i < 3; i++){
      Geocode.fromLatLng(lat.toFixed(5), lng.toFixed(5)).then(
        (response) => {
          const address = response.results[0].formatted_address;
          // console.log(address);
          // valid = address;
          return address;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  //Seeding Example Locations for Example Purposes Only, No Real Locations
  const generateMarkers = async (inLat, inLng) => {
    let maxLat = inLat + 0.05;
    let minLat = inLat - 0.05;

    let maxLng = inLng + 0.05;
    let minLng = inLng - 0.05;

    let res = [];
    let addressRes = []
    for(let i = 1; i < 6; i++){
      let lat = (Math.random() * (maxLat - minLat + 1)) + minLat;
      let lng = (Math.random() * (maxLng - minLng + 1)) + minLng;

      let validAddress = getAddress(lat, lng);

        // Geocode.fromLatLng(lat.toFixed(5), lng.toFixed(5)).then(
        //   (response) => {
        //     const address = response.results[0].formatted_address;
        //     // console.log(address);
        //     valid = address;
        //     console.log(valid)
        //   },
        //   (error) => {
        //     console.error(error);
        //   }
        // );

      console.log(validAddress);


      // Geocode.fromLatLng(lat.toFixed(5), lng.toFixed(5)).then(
      //   (response) => {
      //     const address = response.results[0].formatted_address;
      //     let city, state, country;
      //     for (let i = 0; i < response.results[0].address_components.length; i++) {
      //       for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
      //         switch (response.results[0].address_components[i].types[j]) {
      //           case "locality":
      //             city = response.results[0].address_components[i].long_name;
      //             break;
      //           case "administrative_area_level_1":
      //             state = response.results[0].address_components[i].long_name;
      //             break;
      //           case "country":
      //             country = response.results[0].address_components[i].long_name;
      //             break;
      //         }
      //       }
      //     }
      //     console.log(city, state, country);
      //     console.log(address);
      //   },
      //   (error) => {
      //     console.error(error);
      //   }
      // );


      res.push({
        id: i,
        lat,
        lng,
        name: 'Testing',
        color: 'rgb(247,151,38)'
      })
    }

    setMarkers(res);
  }

  let marker = {
    id: 1,
    lat: 30.1389,
    lng: -97.9065,
    color: 'rgb(247,151,38)'
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    Geocode.fromAddress(location).then(
      (response) => {
        const {lat, lng} = response.results[0].geometry.location
        generateMarkers(lat, lng);
        setCurrentPosition({lat, lng})
      },
      (error) => {
        setErrors(['Provided address is invalid.'])
      }
      );
  }


  const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API
    })

    const containerStyle = {
      width: '800px',
      height: '800px'
    };

    const [map, setMap] = useState(null)

    const onUnmount = useCallback(function callback(map) {
      setMap(null)
    }, [])


      return (
        <div className="map_page__container">

        <div className='retail-information'>
          <h1>Snapdragon in Stores</h1>
          <p>For when your hankering for noodles can’t wait for shipping, enter your zip code below to find your nearest retailer of Snapdragon Foods. We're across the map — you can likely find us at your local Costco, Whole Foods Market, Walmart, and more stores. Just keep in mind that not all products are available everywhere. That’s why we recommend keeping a healthy stash on hand at all times.</p>
          <p>The below list doesn’t reflect Costco because it’s too hard to keep track of which Costco stores have our products and which ones are out of stock. Yeah, they move that fast.</p>
          <p>Prefer to shop from your couch? We've got you. Order our instant pho bowls or instant miso ramen and get free shipping on orders $50+. Yum.</p>
          <p>Disclaimer: These locations are not real locations. Educational purposes only.</p>
        </div>

        <form id='google-map-form-input' onSubmit={handleSubmit}>

          <input
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='Please enter a location...'
          />

          <div>
            <ErrorDisplay id={'login-error-list'} errors={errors}/>
          </div>

          <button className='submit-location-button' type='submit'>Find Locations</button>
        </form>

          <div className='retailers-bottom-section'>
            <span className='locations-sidebar'>
              <ul>
                {markers.map((marker) => (
                  <li key={marker.id}>{marker.id}</li>
                ))}
              </ul>
              </span>


            <span style={{ height: '900px', width: '900px' }}>
                {isLoaded && currentPosition ?<GoogleMap
                  mapContainerStyle={containerStyle}
                  zoom={8}
                  center={currentPosition}
                  onUnmount={onUnmount}
                  >
                  {markers.map((marker) => (
                    <Marker key={marker.id}
                        position={{lat:marker.lat, lng:marker.lng}}
                        title={marker.name}
                        icon={{
                        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
                        fillColor: marker.color,
                        fillOpacity: 1,
                        scale: 1,
                        strokeColor: 'black',
                        strokeWeight: 2
                        }}
                        streetView={false}
                        onClick={() => console.log("I have been clicked!", marker.id)}
                        />
                  ))}
                </GoogleMap>:null}
            </span>
          </div>

        </div>
      );
}

export default RetailersPage;
