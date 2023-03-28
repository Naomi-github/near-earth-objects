import React, { useState, useEffect } from 'react';


function AsteroidTracker() {
  const [asteroids, setAsteroids] = useState([]);
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);

  const getAsteroids = async (start_date, end_date) => {
    const api_key = process.env.REACT_APP_API_KEY;
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    setAsteroids(data.near_earth_objects);
    console.log(asteroids);
    console.log(asteroids[0]);
  };

  const handleAsteroidClick = (index) => {
    setSelectedAsteroid(asteroids[index]);
    getApproaches(asteroids[index]);
  };

  return (

    <div>
    <form onSubmit={(event) => {
      event.preventDefault();
      const form = new FormData(event.target);
      const start_date = form.get('start_date');
      const end_date = form.get('end_date');
      console.log('start date ' + start_date );
      console.log('end date ' + end_date );
      getAsteroids(start_date, end_date);
    }}>
      <div className="date_form">
        <input name="start_date" className="start_date" type="date" placeholder="start date" />
        <input name="end_date" className="end_date" type="date" placeholder="end date" />
        <button type="submit">Submit</button>
      </div>
    </form>
    {asteroids !== [] && (
  <div id="table-container">
      <thead>
        <tr>
          <th>Name</th>
          <th>Estimated Diameter</th>
          <th>Potentially Hazardous</th>
          <th>Sentry Object</th>
        </tr>
      </thead>
      <tbody>
        {asteroids[0].map((asteroid, index) => (
          <tr key={index} onClick={() => handleAsteroidClick(index)}>
            <td>{asteroid.name}</td>
            <td>{`${asteroid.estimated_diameter.kilometers.estimated_diameter_min} - ${asteroid.estimated_diameter.kilometers.estimated_diameter_max}`}</td>
            <td>{asteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</td>
            <td>{asteroid.is_sentry_object ? 'Yes' : 'No'}</td>
          </tr>
          ))}
      </tbody>
      </div>
      )}
  </div>
  )
}

export default AsteroidTracker;



