import React, { useState, useEffect } from 'react';

function Approaches() {
  const [previousApproaches, setPreviousApproaches] = useState([]);
  const [nextApproaches, setNextApproaches] = useState([]);

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
  )}

  return (
    <div>
        {selectedAsteroid && renderApproaches(getPreviousApproaches)}
        {selectedAsteroid && renderApproaches(getNextApproaches)}
      </div>
  )
        }

        export default Approaches;

