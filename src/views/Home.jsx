import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';
import Map from '../components/Map';
import { DateTime } from "luxon";


const Home = () => {

  const [ipAddress, setIPAddress] = useState('');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [countryInfo, setCountryInfo] = useState({});
  const [localDate, setLocalDate] = useState('');
  const [localTime, setLocalTime] = useState('');


  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        const apiKey = import.meta.env.VITE_REACT_APP_IPIFY_API_KEY;
        const response = await axios.get(`https://geo.ipify.org/api/v1?apiKey=${apiKey}`);
        const data = response.data;
        setIPAddress(data.ip);
        setData(data.location)
        console.log(data)
        try {
          setLoading(true)

          //Country data
          const countryResponse = await axios.get(`https://restcountries.com/v3.1/alpha/${data.location.country}`);
          const country = countryResponse.data;
          setCountryInfo(country[0]);

          //Date data
          const localDateTime = DateTime.now().setZone(country.timezones);
          setLocalDate(localDateTime.toLocaleString(DateTime.DATE_SHORT));
          setLocalTime(localDateTime.toLocaleString(DateTime.TIME_SIMPLE));

        } catch (error) {
          console.error('Error fetching user country:', error);
        }finally{
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }finally {
        setLoading(false)
      }
    };

    fetchIPAddress();
  }, []);
  return (
    <>
      {loading ? <div>Loading</div> : (
        <>
          <h2>Your IP Address:</h2>
          <p>{ipAddress}</p>
          <Map data={data}  />
          {Object.keys(countryInfo).length > 0 ? (
            <>
              <h2>{countryInfo.name.common}</h2>
              <img src={countryInfo.flags.png} alt={countryInfo.flags.alt} />
            </>
          ) : null}

            <p>Local Date: {localDate}</p>
            <p>Local Time: {localTime}</p>

        </>
      )}
    </>
  )
}

export default Home