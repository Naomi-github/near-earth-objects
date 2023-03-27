import React, { useState, useEffect } from 'react';


function AsteroidTracker() {
  const [asteroids, setAsteroids] = useState([]);
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);
  const [previousApproaches, setPreviousApproaches] = useState([]);
  const [nextApproaches, setNextApproaches] = useState([]);

  const getAsteroids = async (start_date, end_date) => {
    const api_key = 'zMYbT3RBTqfKdaagLaxqhQNZLpkK5XSZhhkv1fcg';
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

  const getApproaches = async (asteroid) => {
    const api_key = 'zMYbT3RBTqfKdaagLaxqhQNZLpkK5XSZhhkv1fcg';
    const url = `https://api.nasa.gov/neo/rest/v1/neo/${asteroid.id}/?api_key=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    setPreviousApproaches(data.close_approach_data.slice(0, 5).reverse());
    setNextApproaches(data.close_approach_data.slice(0, 5));
  };


  const getPreviousApproaches = () => {
    setPreviousApproaches(previousApproaches.slice(0, 5).reverse());
    setNextApproaches([previousApproaches[0], ...nextApproaches.slice(0, 4)]);
    setPreviousApproaches(previousApproaches.slice(1));
  };

  const getNextApproaches = () => {
    setNextApproaches(nextApproaches.slice(1));
    setPreviousApproaches([...previousApproaches.slice(0, 4), nextApproaches[0]]);
    setNextApproaches(nextApproaches.slice(1).concat([previousApproaches[4]]));
  };

  const renderApproaches = (approaches) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Relative Velocity</th>
            <th>Miss Distance</th>
          </tr>
        </thead>
        <tbody>
          {approaches.map((approach, index) => (
            <tr key={index}>
              <td>{approach.close_approach_date}</td>
              <td>{approach.relative_velocity.kilometers_per_hour}</td>
              <td>{approach.miss_distance.kilometers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
      /* Add form to input start and end dates */
      /* Use getAsteroids function to retrieve data when form is submitted */
      /* Display asteroid data in table */
      /* Add functionality to select or click on an object and show the next 5 and previous 5 approaches */
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
      <div>
        {selectedAsteroid && renderApproaches(getPreviousApproaches)}
        {selectedAsteroid && renderApproaches(getNextApproaches)}
      </div>
    {/* Add table to display next and previous 5 approaches */}
  </div>
  )
}


export default AsteroidTracker;



