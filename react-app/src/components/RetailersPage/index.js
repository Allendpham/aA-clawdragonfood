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

      // Geocode.fromLatLng(lat.toString(), lng.toString()).then(
      //   (response) => {
      //     const address = response.results[0].formatted_address;
      //     console.log(address);
      //     // valid = address;

      //       // console.log(addresses)
      //       // let toAdd = addresses.push(address);
      //       // setAddresses(toAdd);

      //     // let toAdd = addresses.push(address);
      //     // setAddresses(toAdd);
      //     // return address;
      //   },
      //   (error) => {
      //     // console.error(error);
      //     let newLat = randomNumber(lat, 0.00001);
      //     let newLng = randomNumber(lng, 0.00001);

      //     getAddress(newLat, newLng);
      //   }
      // );

      // return address;
  }

  //Generate Random Lat/Lng Number
  const randomNumber = (num, diff) => {
    let max = num + diff;
    let min = num - diff;

    let res = (Math.random() * (max - min)) + min
    return res;
  }

  //Seeding Example Locations for Example Purposes Only, No Real Locations
  const generateMarkers = (inLat, inLng) => {
    let res = [];
    for(let i = 1; i < 6; i++){
      let lat = randomNumber(inLat, 0.12);
      let lng = randomNumber(inLng, 0.12);

      // let address = getAddress(lat, lng);
      // console.log(address);
      // console.log("-----", addresses);
        // Geocode.fromLatLng(lat.toString(), lng.toString()).then(
        //   (response) => {
        //     const address = response.results[0].formatted_address;
        //     // console.log(address);
        //     // valid = address;
        //     console.log(address)
        //     if(address) valid = false;
        //   },
        //   (error) => {
        //     console.error(error);
        //     lat = randomNumber(inLat)
        //     lng = randomNumber(inLng)
        //     console.log("this is a bad one!")
        //   }
        // );

      // console.log(validAddress);

      const address = `${Math.floor(Math.random() * 1000)} Example Dr, Example, US 12345`

      res.push({
        id: i,
        lat,
        lng,
        address,
        name: `${i}`+ address,
        color: 'rgb(247,151,38)'
      })
    }

    setMarkers(res);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setAddresses([]);

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

  const markerClick = (markerId) => {
    const elements = document.querySelectorAll('.address')
    for(let i = 0; i < elements.length; i++){
      if(i === (markerId - 1)){
        elements[i].classList.add('selected');
      } else {
        elements[i].classList.remove('selected');
      }
    }
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
          <h1>Clawdragon in Stores</h1>
          <div className='retail-bottom-info'>
            <img src='https://i.imgur.com/NWpmsRL.jpg'/>

            <div className='retail-paragraphs'>
              <p>For when you're hankering for noodles and can’t wait for shipping, enter your zip code below to find your nearest retailer of Clawdragon Foods. We're across the map — you can likely find us at your local Costco, Whole Foods Market, Walmart, and more stores. Just keep in mind that not all products are available everywhere. That’s why we recommend keeping a healthy stash on hand at all times.</p>
              <p>The below list doesn’t reflect Costco because it’s too hard to keep track of which Costco stores have our products and which ones are out of stock. Yeah, they move that fast.</p>
              <p>Prefer to shop from your couch? We've got you. Order our instant pho bowls or instant miso ramen and get free shipping on orders $50+. Yum.</p>
              <p>Disclaimer: These locations are not real locations. Educational purposes only.</p>
            </div>
          </div>

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
                  <li key={marker.id} className='address' id={marker.id}>{marker.id}{marker.address}</li>
                ))}
              </ul>
              </span>


            <span style={{ height: '900px', width: '900px' }}>
                {isLoaded && currentPosition ?<GoogleMap
                  mapContainerStyle={containerStyle}
                  zoom={10}
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
                        onClick={() => markerClick(marker.id)}
                        />
                  ))}
                </GoogleMap>:null}
            </span>
          </div>

        </div>
      );
}

export default RetailersPage;
